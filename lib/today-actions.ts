import type { ILead } from '@/models/Lead';

export interface TodayAction {
  leadId: string;
  name: string;
  phone: string;
  actionType: string;
  category: string;
  priority: string;
  followUpDate: Date;
  status: string;
  label: string;
}

/**
 * Builds today's prioritized actions from leads — same rules as GET /api/dashboard.
 */
export function buildTodayActionsFromLeads(leads: ILead[]): TodayAction[] {
  const actions: TodayAction[] = [];

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

    if (!category || !priority) continue;

    let actionType = lead.preferredAction;
    if (!actionType) {
      switch (lead.status) {
        case 'NEW':
          actionType = 'CALL';
          break;
        case 'CONTACTED':
          actionType = 'MESSAGE';
          break;
        case 'INTERESTED':
          actionType = 'CALL';
          break;
        case 'NEGOTIATION':
          actionType = 'CLOSE';
          break;
        default:
          actionType = 'CALL';
      }
    }

    let icon = '';
    if (category === 'OVERDUE') icon = '🔴';
    else if (category === 'HOT') icon = '🔥';
    else if (category === 'TODAY') icon = '🟡';

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

  actions.sort((a, b) => {
    const order: Record<string, number> = { OVERDUE: 1, HOT: 2, TODAY: 3 };
    if (order[a.category] !== order[b.category]) {
      return order[a.category] - order[b.category];
    }
    return new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime();
  });

  return actions;
}
