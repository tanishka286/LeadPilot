import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import UserStats from '@/models/UserStats';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';
import { buildTodayActionsFromLeads } from '@/lib/today-actions';

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = authResult;

    await connectToDatabase();

    // 1. Reset logic for UserStats
    let stats = await UserStats.findOne({ userId });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!stats) {
      stats = await UserStats.create({ userId, lastActiveDate: new Date(), completedTasksToday: 0, streak: 0 });
    } else {
      const lastActiveDate = new Date(stats.lastActiveDate);
      lastActiveDate.setHours(0, 0, 0, 0);
      
      // If last active was before today, reset today's internal counter (Part 5 constraints)
      if (lastActiveDate.getTime() < today.getTime()) {
        stats.completedTasksToday = 0;
        await stats.save();
      }
    }

    // 2. Action generation logic (shared with daily reminder cron)
    const leads = await Lead.find({ userId });
    const actions = buildTodayActionsFromLeads(leads);

    const user = await User.findById(userId);

    // 4. Return combined payload
    return NextResponse.json({
      userName: user ? user.name : 'User',
      actions,
      stats: {
        completedTasksToday: stats.completedTasksToday,
        streak: stats.streak
      }
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: true, message: 'Internal server error' }, { status: 500 });
  }
}
