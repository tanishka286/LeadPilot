import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
import Lead from '@/models/Lead';
import User from '@/models/User';
import { sendEmail } from '@/lib/email';
import { buildTodayActionsFromLeads, type TodayAction } from '@/lib/today-actions';

function formatDisplayName(name: string): string {
  const trimmed = name?.trim() ?? '';
  if (!trimmed) return trimmed;
  return trimmed
    .split(/\s+/)
    .map((word) =>
      word
        .split('-')
        .map((part) =>
          part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part
        )
        .join('-')
    )
    .join(' ');
}

function formatReminderLine(action: TodayAction): string {
  const emoji =
    action.category === 'OVERDUE'
      ? '🔴'
      : action.category === 'HOT'
        ? '🔥'
        : action.category === 'TODAY'
          ? '🟡'
          : '';
  const displayName = formatDisplayName(action.name);
  const t = action.actionType?.toUpperCase() ?? '';
  if (t === 'CLOSE') return `${emoji} Close ${displayName}`;
  if (t === 'MESSAGE') return `${emoji} Message ${displayName}`;
  return `${emoji} Call ${displayName}`;
}

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: true, message: 'RESEND_API_KEY is not defined' },
        { status: 500 }
      );
    }
    if (!process.env.EMAIL_FROM) {
      return NextResponse.json(
        { error: true, message: 'EMAIL_FROM is not defined' },
        { status: 500 }
      );
    }

    await connectToDatabase();

    const users = await User.find({});

    for (const user of users) {
      const userId = user._id.toString();
      const leads = await Lead.find({ userId });
      const actions = buildTodayActionsFromLeads(leads);

      if (actions.length === 0) continue;

      const lines = actions.map(formatReminderLine);
      const body = [
        'Hi,',
        '',
        'Here are your tasks for today:',
        '',
        ...lines,
        '',
        'Complete these to keep your streak going 🔥',
        '',
        'Open LeadPilot and take action.',
        '',
        '— LeadPilot',
      ].join('\n');

      try {
        await sendEmail(user.email, 'Your Tasks for Today – LeadPilot', body);
      } catch (err) {
        console.error('Daily reminder email failed:', user.email, err);
      }
    }

    return NextResponse.json({ message: 'Emails sent' });
  } catch (error) {
    console.error('Daily reminder cron error:', error);
    return NextResponse.json({ error: true, message: 'Internal server error' }, { status: 500 });
  }
}
