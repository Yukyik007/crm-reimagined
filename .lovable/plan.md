
# CRM Visual Redesign — Clean & Minimal

## Design System
- **Style**: Clean, minimal — generous whitespace, subtle borders, neutral palette with a single accent color (blue)
- **Typography**: Inter font, clear hierarchy with weight/size contrast
- **Layout**: Collapsible sidebar navigation + top header bar
- **Components**: Shadcn UI throughout — cards, tables, dialogs, badges, tooltips

## Pages & Modules

### 1. Authentication (Login / Forgot Password)
- Centered card layout on a soft background
- Clean email + password form with SSO option
- Minimal branding at top

### 2. Dashboard (Home)
- Welcome header with user name
- KPI cards row: Total Contacts, Active Leads, Open Deals, Revenue
- Recent activity feed (timeline style)
- Quick action buttons (Add Contact, New Lead, Schedule Appointment)

### 3. Contacts
- Searchable, filterable data table with avatar, name, email, phone, company, status
- Add/edit contact via slide-over sheet
- Contact detail page with activity timeline

### 4. Leads
- Data table with lead source, status badge, assigned to, value
- Lead status filters (New, Contacted, Qualified, Lost)
- Add/edit lead form in a dialog

### 5. Pipeline (Kanban)
- Drag-and-drop Kanban board with columns: Prospect → Qualified → Proposal → Negotiation → Closed Won / Lost
- Deal cards showing value, contact name, days in stage
- Click card to open deal detail sheet

### 6. Appointments
- Calendar view (month/week) with appointment blocks
- List view toggle
- Create/edit appointment dialog with date picker, time, attendees

### 7. Activities
- Chronological activity log (calls, emails, meetings, notes)
- Filter by type and date range
- Add activity button

### 8. Teams
- Team members grid/list with role badges
- Invite member dialog

### 9. Reports
- Summary cards + simple charts (bar/line) for leads by source, deals by stage, revenue over time
- Date range filter

### 10. Admin / Users
- User management table with role, status, last active
- Edit role dialog

### 11. Profile & Settings
- Profile form (name, email, avatar, password change)
- Settings page with notification preferences, theme toggle

### 12. Tools
- Placeholder tools page with card grid for future integrations

## Navigation Structure
- **Sidebar**: Logo, Dashboard, Contacts, Leads, Pipeline, Appointments, Activities, Teams, Reports, Tools — collapsible to icon-only
- **Bottom sidebar**: Settings, Profile, Logout
- **Top header**: Page title, search bar, notifications bell, user avatar dropdown

All pages use static/mock data initially so you can see the full design, then connect Supabase for real data.
