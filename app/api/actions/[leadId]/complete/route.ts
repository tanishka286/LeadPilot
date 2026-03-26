import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import UserStats from '@/models/UserStats';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { leadId: string } }) {
  try {
    const authResult = await verifyAuth(req);
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = authResult;
    const leadId = params.leadId;

    const body = await req.json().catch(() => ({}));
    const { followUpDate } = body;

    await connectToDatabase();

    const lead = await Lead.findOne({ _id: leadId, userId });
    if (!lead) {
      return NextResponse.json({ error: true, message: 'Lead not found' }, { status: 404 });
    }

    // Complete Action Modifications
    lead.lastContacted = new Date();
    if (followUpDate) {
      lead.followUpDate = new Date(followUpDate);
    }
    lead.updatedAt = new Date();
    await lead.save();

    // Stats and Streak Modifications
    let stats = await UserStats.findOne({ userId });
    if (!stats) {
      stats = await UserStats.create({ userId, completedTasksToday: 1, streak: 1, lastActiveDate: new Date() });
    } else {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const lastActive = new Date(stats.lastActiveDate);
      const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());

      const diffTime = today.getTime() - lastActiveDay.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Task completed today already; increment mapping task counts exclusively
        stats.completedTasksToday += 1;
        stats.lastActiveDate = now;
      } else if (diffDays === 1) {
        // Completed task strictly mapping sequentially to Yesterday
        stats.streak += 1;
        stats.completedTasksToday = 1;
        stats.lastActiveDate = now;
      } else {
        // Streak is dead (Older than Yesterday)
        stats.streak = 1;
        stats.completedTasksToday = 1;
        stats.lastActiveDate = now;
      }

      await stats.save();
    }

    return NextResponse.json({ message: 'Action completed' }, { status: 200 });

  } catch (error) {
    console.error('Complete Action Error:', error);
    return NextResponse.json({ error: true, message: 'Internal server error' }, { status: 500 });
  }
}
