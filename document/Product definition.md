LeadPilot – Product Definition Document (Agent-Ready)
1. Product Overview

Product Name: LeadPilot
Type: SaaS Web Application
Category: CRM (Action-Based CRM)

Definition:

LeadPilot is a minimal, action-focused CRM designed to help users consistently follow up with leads and close deals by telling them exactly what actions to take daily.

Unlike traditional CRMs that focus on storing data, LeadPilot focuses on:

✅ Daily execution
✅ Follow-up consistency
✅ Action prioritization

2. Product Vision

LeadPilot is not just a CRM.

It is a Daily Sales Execution System that ensures:

Users never forget follow-ups
Users always know what to do next
Users build a habit of daily sales activity

Core Idea:

“Tell the user what to do today in under 30 seconds.”

3. Problem Statement
3.1 User Problems

Small businesses and freelancers:

Forget to follow up with leads
Manage leads using:
WhatsApp chats
Excel sheets
Memory
Lose deals due to poor tracking
3.2 Market Problems

Existing CRM tools:

Too complex (HubSpot, Salesforce)
Too feature-heavy
Not focused on daily execution
Require training and setup
4. Solution

LeadPilot solves these problems by:

4.1 Core Approach
Minimal UI
Action-first design
Daily task generation
4.2 Key Capabilities
Store and manage leads
Track deal stages
Set follow-up dates
Generate daily action list
Notify users about required actions
5. Core Feature (MOST IMPORTANT)
🧠 Daily Action Dashboard (Primary Engine)

This is the heart of LeadPilot.

❌ Traditional Approach:
“Show today’s follow-ups”
✅ LeadPilot Approach:

“Tell the user EXACTLY what to do today in 30 seconds”

💡 Output Example:
Call Rahul (Overdue 🔴)
Message Priya (Today 🟡)
Close Amit deal (Hot Lead 🔥)
5.1 Action Classification Logic

Each lead is converted into an action item:

Condition	Type	Priority
Follow-up date < today	Overdue	🔴 High
Follow-up date = today	Today	🟡 Medium
Status = Interested/Negotiation	Hot Lead	🔥 High
5.2 Sorting Priority

Actions must be ordered:

Overdue 🔴
Hot Leads 🔥
Today 🟡
5.3 Output Requirement

System must generate:

Clear action (Call / Message / Follow-up)
Lead name
Priority indicator
Minimal text (scan in <30 sec)
6. Habit Formation System (Retention Engine)

LeadPilot must create a daily usage habit.

6.1 Habit Loop
User opens app (morning)
Sees clear task list
Completes actions
Feels progress
Returns next day
6.2 Gamification Layer

System must track:

Daily completed actions count
Streak (number of consecutive days active)
6.3 Example Feedback
“You completed 5 follow-ups today ✅”
“3-day streak 🔥”
7. Target Users
7.1 Primary Users
Freelancers
Small business owners
Sales representatives
7.2 Secondary Users
Small agencies
Early-stage startups
8. Product Principles

LeadPilot must follow these principles:

8.1 Simplicity First
No complex workflows
Minimal input fields
Fast interactions
8.2 Action Over Data
Focus on “what to do next”
Not just storing information
8.3 Speed
User should understand dashboard in <30 seconds
8.4 Mobile-First Thinking
Designed for quick daily check-ins
Optimized for small screens
9. Notification Strategy (MVP vs Future)
9.1 MVP Notification System (Phase 1)

Due to external API constraints:

Use:

In-app notifications
Email reminders
9.2 WhatsApp Integration (Future Phase)

Will use:

WhatsApp Business API
or Twilio
⚠️ Constraints:
Approval required
Template-based messaging
Cost per message
Limited flexibility
9.3 Strategy
Build core product WITHOUT dependency on WhatsApp
Add WhatsApp after product validation
10. User Journey (High-Level)
User signs up
Adds lead
Sets follow-up date
System stores data
System generates daily actions
User receives reminder
User completes tasks
User updates lead
Cycle repeats daily
11. Success Metrics
11.1 Engagement Metrics
Daily Active Users (DAU)
Number of daily logins
11.2 Behavior Metrics
Number of follow-ups completed
Number of leads added
11.3 Outcome Metrics
Increase in deal closures
Reduction in missed follow-ups
12. Key Differentiation
Feature	Traditional CRM	LeadPilot
Complexity	High	Low
Focus	Data storage	Action
Learning curve	High	Minimal
Daily usage	Low	High
Reminder system	Weak	Strong
13. Product Scope (MVP Boundary)
Included:
Lead management
Follow-up tracking
Daily action dashboard
Notifications (in-app/email)
Excluded:
Advanced automation
AI recommendations
Multi-user collaboration
Deep analytics
🎯 Final Definition

LeadPilot is a daily action system disguised as a CRM.

Its primary job is:

To ensure users always know what to do next — and actually do it.