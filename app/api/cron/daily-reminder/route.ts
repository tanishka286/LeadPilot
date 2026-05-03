import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
import Lead from '@/models/Lead';
import User from '@/models/User';
import { sendEmail } from '@/lib/email';
import { buildTodayActionsFromLeads, type TodayAction } from '@/lib/today-actions';

function formatReminderLine(action: TodayAction): string {
  const emoji =
    action.category === 'OVERDUE'
      ? '🔴'
      : action.category === 'HOT'
        ? '🔥'
        : action.category === 'TODAY'
          ? '🟡'
          : '';
  const t = action.actionType?.toUpperCase() ?? '';
  if (t === 'CLOSE') return `${emoji} Close ${action.name} deal`;
  if (t === 'MESSAGE') return `${emoji} Message ${action.name}`;
  return `${emoji} Call ${action.name}`;
}

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      return NextResponse.json(
        { error: true, message: 'Email environment variables are not configured' },
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
        `You have ${actions.length} tasks today:`,
        '',
        ...lines,
        '',
        'Open LeadPilot to complete them.',
      ].join('\n');

      try {
        await sendEmail(user.email, 'Your LeadPilot Tasks for Today', body);
      } catch (err) {
        console.error(`Daily reminder failed for user ${userId}:`, err);
      }
    }

    return NextResponse.json({ message: 'Emails sent' });
  } catch (error) {
    console.error('Daily reminder cron error:', error);
    return NextResponse.json({ error: true, message: 'Internal server error' }, { status: 500 });
  }
}
