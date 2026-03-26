import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import UserStats from '@/models/UserStats';
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth';

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

    // 2. Action generation logic
    const leads = await Lead.find({ userId });
    const actions = [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const lead of leads) {
      if (lead.status === 'CLOSED') continue;

      let category = null;
      let priority = null;
      
      const followUpDate = new Date(lead.followUpDate);
      followUpDate.setHours(0, 0, 0, 0);

      const isStatusHot = lead.status === 'INTERESTED' || lead.status === 'NEGOTIATION';
      const isOverdue = followUpDate.getTime() < todayStart.getTime();
      const isToday = followUpDate.getTime() === todayStart.getTime();

      if (isOverdue) {
        category = 'OVERDUE';
        priority = 'HIGH';
      } else if (isStatusHot) {
        category = 'HOT';
        priority = 'HIGH';
      } else if (isToday) {
        category = 'TODAY';
        priority = 'MEDIUM';
      }

      // Do not include if condition fails
      if (!category) continue;

      // Determine action string prioritizing preferredAction
      let actionType = lead.preferredAction;
      if (!actionType) {
        switch (lead.status) {
          case 'NEW': actionType = 'CALL'; break;
          case 'CONTACTED': actionType = 'MESSAGE'; break;
          case 'INTERESTED': actionType = 'CALL'; break;
          case 'NEGOTIATION': actionType = 'CLOSE'; break;
          default: actionType = 'CALL';
        }
      }

      // Extract formatting icon matching category string mapping
      let icon = '';
      if (category === 'OVERDUE') icon = '🔴';
      else if (category === 'HOT') icon = '🔥';
      else if (category === 'TODAY') icon = '🟡';

      // Establish verbal syntax logic
      let verb = '';
      if (actionType === 'CALL') verb = 'Call';
      else if (actionType === 'MESSAGE') verb = 'Message';
      else if (actionType === 'CLOSE') verb = 'Close deal with';

      const label = `${verb} ${lead.name} (${category === 'OVERDUE' ? 'Overdue' : category === 'HOT' ? 'Hot Lead' : 'Today'} ${icon})`;

      actions.push({
        leadId: lead._id.toString(),
        name: lead.name,
        phone: lead.phone,
        actionType,
        category,
        priority,
        followUpDate: lead.followUpDate,
        status: lead.status,
        label,
      });
    }

    // 3. Sort internally prioritized properly
    actions.sort((a, b) => {
      const order: any = { 'OVERDUE': 1, 'HOT': 2, 'TODAY': 3 };
      if (order[a.category] !== order[b.category]) {
        return order[a.category] - order[b.category];
      }
      return new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime();
    });

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
