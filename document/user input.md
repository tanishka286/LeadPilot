LeadPilot – User Input & Interaction Document (Agent-Ready)
1. Purpose of Document

This document defines:

All user inputs
Input formats
Validation rules
User actions
System responses

👉 This serves as a source of truth for frontend, backend, and AI agents

2. User Authentication
2.1 User Signup
Inputs:
Field	Type	Required	Validation
Name	String	Yes	Min 2 chars
Email	String	Yes	Valid email format
Password	String	Yes	Min 6 chars
Action Flow:
User submits signup form
System validates inputs
System creates user record
User is logged in
Output:
{
  "userId": "string",
  "name": "string",
  "email": "string"
}
2.2 User Login
Inputs:
Field	Type	Required
Email	String	Yes
Password	String	Yes
Output:
JWT token / session
User profile data
3. Lead Management
3.1 Create Lead
Inputs:
Field	Type	Required	Notes
Name	String	Yes	Lead name
Phone	String	Yes	Numeric string
Status	Enum	Yes	See below
Notes	String	No	Optional
FollowUpDate	Date	Yes	YYYY-MM-DD
3.2 Status Enum
NEW
CONTACTED
INTERESTED
NEGOTIATION
CLOSED
3.3 Action Flow
User fills lead form
Clicks “Add Lead”
System validates data
Lead is stored in database
3.4 Output (Lead Object)
{
  "leadId": "string",
  "userId": "string",
  "name": "Rahul",
  "phone": "9876543210",
  "status": "NEW",
  "notes": "Interested in pricing",
  "followUpDate": "2026-03-21",
  "lastContacted": null,
  "createdAt": "timestamp"
}
4. Update Lead
4.1 Editable Fields
Name
Phone
Status
Notes
FollowUpDate
4.2 Actions
Update lead
Delete lead
Change status
Add notes
4.3 Special Action: Mark as Contacted

When user interacts with lead:

👉 System updates:

{
  "lastContacted": "current_timestamp"
}
5. Follow-Up System
5.1 Set Follow-Up

User must select a date while:

Creating lead OR
Updating lead
5.2 Validation Rules
Date cannot be null
Date must be valid format
Past dates allowed (for overdue tracking)
5.3 System Role

Follow-up date is used to:

Generate daily tasks
Classify lead priority
6. Daily Action System (Core Interaction)
6.1 Input to System

System uses:

All leads
Current date
6.2 Processing Logic

For each lead:

IF followUpDate < today → Overdue
IF followUpDate == today → Today
IF status == INTERESTED or NEGOTIATION → Hot Lead
6.3 Output (Action Object)
{
  "leadId": "string",
  "action": "Call",
  "priority": "HIGH",
  "category": "OVERDUE",
  "label": "Call Rahul (Overdue 🔴)"
}
6.4 Action Types
Action	Condition
Call	Default
Message	If user prefers
Follow-up	General
7. Daily Dashboard Interaction
7.1 System Output

List of actions:

Sorted by priority
Minimal readable format
7.2 Example Output
1. Call Rahul (Overdue 🔴)
2. Message Priya (Today 🟡)
3. Close Amit deal (Hot Lead 🔥)
7.3 User Actions

User can:

Mark action as done ✅
Open lead details
Update lead
8. Task Completion System
8.1 Input

User clicks:

👉 “Mark as Done”

8.2 System Updates
{
  "lastContacted": "timestamp",
  "followUpDate": "new_date_optional"
}
8.3 Output
Task removed from list
Completion count increases
9. Habit Tracking System
9.1 Inputs
Number of tasks completed
Daily login
9.2 Stored Data
{
  "completedTasksToday": 5,
  "streak": 3
}
9.3 Output
“You completed 5 follow-ups today ✅”
“3-day streak 🔥”
10. Notification System (MVP)
10.1 Trigger

Daily (morning):

System checks tasks
10.2 Output Channels
In-app notification
Email
10.3 Message Example
You have 5 follow-ups today:
- Call Rahul
- Message Priya
11. Error Handling
11.1 Input Errors
Invalid email
Empty required fields
Invalid date
11.2 System Errors
Database failure
API failure
11.3 Output Format
{
  "error": true,
  "message": "Invalid input"
}
12. Security Considerations
Password hashing required
JWT/session-based authentication
User-specific data isolation
🎯 Final Definition

This document defines:

How users interact with LeadPilot and how the system responds to every action.

It ensures:

Consistent data handling
Predictable system behavior
Clear logic for AI agents