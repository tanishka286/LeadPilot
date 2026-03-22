LeadPilot – Feature Scope Document (Agent-Ready)
1. Purpose of Document

This document defines:

What features are included in MVP
What features are excluded
Feature boundaries and constraints
Implementation priority

👉 This ensures AI agents and developers do not over-engineer the product

2. Product Strategy
2.1 Core Philosophy

LeadPilot is:

❌ NOT a full CRM
✅ A Daily Action System

2.2 Build Rule

Every feature must answer:

“Does this help the user take action today?”

If NO → Do not include in MVP

3. MVP Feature Set (Phase 1 – MUST BUILD)
3.1 User Authentication
Scope:
Signup (email + password)
Login / Logout
Basic session handling
Exclusions:
Social login (Google, GitHub)
Multi-factor authentication
3.2 Lead Management
Scope:
Create lead
Edit lead
Delete lead
View all leads
Fields:
Name
Phone
Status
Notes
Follow-up date
Exclusions:
File attachments
Custom fields
Bulk import/export
3.3 Deal Pipeline (Basic)
Scope:
Status-based lead tracking
Allowed Statuses:
NEW
CONTACTED
INTERESTED
NEGOTIATION
CLOSED
Exclusions:
Drag-and-drop Kanban (Phase 2)
Custom stages
3.4 Follow-Up System
Scope:
Assign follow-up date
Update follow-up date
Track overdue follow-ups
Exclusions:
Recurring follow-ups
Auto-scheduling
3.5 🧠 Daily Action Dashboard (CORE FEATURE)
Objective:

Generate a clear, prioritized action list in <30 seconds

Scope:

System must:

Convert leads → action items
Classify actions:
Overdue 🔴
Today 🟡
Hot Leads 🔥
Sort actions by priority
Required Output Format:
“Call Rahul (Overdue 🔴)”
“Message Priya (Today 🟡)”
“Close Amit deal (Hot Lead 🔥)”
Functional Requirements:
Minimal UI (no clutter)
Fast loading
Readable instantly
Exclusions:
Complex filtering
Custom dashboards
Analytics charts
3.6 Task Completion System
Scope:
Mark action as completed
Update lastContacted
Optionally set next follow-up
Exclusions:
Task history logs (Phase 2)
Undo actions
3.7 Habit System (Retention Engine)
Scope:
Track:
Daily completed tasks
Streak (days active)
Output Examples:
“You completed 5 follow-ups today ✅”
“3-day streak 🔥”
Exclusions:
Leaderboards
Social sharing
3.8 Notification System (MVP SAFE VERSION)
Scope:
In-app notifications
Email reminders
Trigger:
Daily (morning time, configurable later)
Exclusions (IMPORTANT):
WhatsApp API
SMS
Push notifications
4. Phase 2 Features (Post-MVP)

These features are NOT to be built initially.

4.1 UI Enhancements
Drag-and-drop Kanban board
Advanced filtering
4.2 Notes & Activity Tracking
Interaction history
Timeline view
4.3 Notification Upgrade
WhatsApp integration
Message templates
5. Phase 3 Features (Advanced)
5.1 AI Features
Lead scoring
Smart follow-up suggestions
5.2 Automation
Auto follow-up scheduling
Workflow automation
5.3 Analytics
Conversion tracking
Performance dashboard
5.4 Platform Expansion
Mobile app
Multi-user teams
6. Explicitly Out of Scope (Strict No for MVP)
❌ Do NOT Build:
Full CRM features
Complex reporting dashboards
Enterprise features
Role-based access control
Multi-tenant org structures
Chat systems
File storage

👉 If AI agent suggests these → Reject

7. Technical Constraints
7.1 Frontend
Next.js 14
Tailwind CSS
Mobile responsive
7.2 Backend
Node.js / Next.js API routes
REST-based APIs
7.3 Database
MongoDB (preferred for MVP speed)
8. Performance Requirements
Dashboard load time < 2 seconds
Action generation must be instant
Minimal API calls
9. UX Constraints
User should understand UI in <30 seconds
No clutter
No unnecessary clicks
10. Feature Acceptance Criteria

A feature is considered complete only if:

It supports daily action workflow
It is simple to use
It improves follow-up consistency
11. Release Definition (MVP Ready)

Product is ready when user can:

Sign up
Add leads
Set follow-ups
See daily action list
Complete tasks
Return next day