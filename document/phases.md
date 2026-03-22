Phase 1 – Project Setup + Authentication (Days 1–4)
Goal:

User can sign up and log in.

Tasks:

Day 1:

Setup MongoDB
Setup Mongoose
Setup environment variables
Create User model

Day 2:

Signup API
Password hashing (bcrypt)
Signup UI

Day 3:

Login API
JWT authentication
Login UI

Day 4:

Protect routes (middleware)
Redirect if not logged in
Output:
User can create account
User can log in
User stays logged in
Phase 2 – Lead Management (Days 5–10)
Goal:

User can add, edit, delete, view leads.

Database: Lead Model

Fields:

name
phone
status
followUpDate
notes
leadSource
lastContacted
preferredAction
userId
Pages to Build:
Page	Purpose
/dashboard	Will show actions later
/leads	All leads list
/leads/new	Add lead
/leads/[id]	Edit lead
Output:
Leads stored in DB
Leads visible in UI
Leads editable
Leads deletable
Phase 3 – Action Engine (CORE LOGIC) (Days 11–15)

This is the brain of LeadPilot.

You need to write logic:

For each lead:

if followUpDate < today → Overdue
else if status = INTERESTED or NEGOTIATION → Hot
else if followUpDate == today → Today
else → No action

Priority sorting:

Overdue → Hot → Today

Action type:

NEW → Call
CONTACTED → Message
INTERESTED → Call
NEGOTIATION → Close
Build API:
GET /api/actions/today

Returns:

[
  { leadId, name, actionType, priority, label }
]
Output:

System can generate daily action list.

This is the most important milestone.

Phase 4 – Dashboard UI (Days 16–19)
Dashboard should show:
Good morning, {Name}

Today's Actions
🔴 Call Rahul
🔥 Close Amit deal
🟡 Message Priya

Completed today: 2
Streak: 3 days
Features:
Action list
Priority colors
Mark as Done button

Now LeadPilot starts looking like a real product.

Phase 5 – Task Completion + Streak System (Days 20–24)

When user clicks Mark as Done:

Update lastContacted
Ask next follow-up:
Tomorrow
3 days
Next week
Custom
Habit System:

Create collection:

UserStats:
- userId
- completedTasksToday
- lastActiveDate
- streak

Streak logic:

If completedTasksToday >= 1 → streak++
Else → streak = 0
Phase 6 – Email Notification (Days 25–27)

Simple email at 9 AM:

You have 5 follow-ups today:
- Call Rahul
- Message Priya

Use:

Nodemailer
Gmail SMTP (for MVP)

Cron job runs every morning → sends email.

Phase 7 – Polish + Deploy (Days 28–30)
Fix UI
Mobile responsive
Add loading states
Deploy:
Vercel (frontend + backend)
MongoDB Atlas (database)

Now you have a live SaaS MVP.

Your Weekly Schedule (Important)

Since you have 1.5 hr/day, do this:

Day	Task
Mon	Backend
Tue	Frontend
Wed	Backend
Thu	Frontend
Fri	Backend
Sat	Frontend
Sun	Review + Fix

This prevents burnout.

MOST IMPORTANT RULE FOR YOU

While building, always ask:

“Does this help the user know what to do today?”

If not → Don’t build it now.

Final Build Order (Write This Somewhere)
1. Auth
2. Add Lead
3. Leads List
4. Action Engine
5. Dashboard
6. Mark as Done
7. Streak
8. Email
9. Deploy

Follow this order strictly, and you will finish LeadPilot instead of leaving it half-built like most projects.