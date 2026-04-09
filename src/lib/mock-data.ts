export const contacts = [
  { id: "1", name: "Sarah Chen", email: "sarah@acme.co", phone: "+1 555-0101", company: "Acme Corp", status: "Active", avatar: "SC" },
  { id: "2", name: "James Wilson", email: "james@techstart.io", phone: "+1 555-0102", company: "TechStart", status: "Active", avatar: "JW" },
  { id: "3", name: "Maria Garcia", email: "maria@innovate.com", phone: "+1 555-0103", company: "Innovate Inc", status: "Inactive", avatar: "MG" },
  { id: "4", name: "David Kim", email: "david@globalnet.com", phone: "+1 555-0104", company: "GlobalNet", status: "Active", avatar: "DK" },
  { id: "5", name: "Emily Brown", email: "emily@crescentmedia.com", phone: "+1 555-0105", company: "Crescent Media", status: "Active", avatar: "EB" },
  { id: "6", name: "Alex Turner", email: "alex@skyline.dev", phone: "+1 555-0106", company: "Skyline Dev", status: "Inactive", avatar: "AT" },
  { id: "7", name: "Lisa Park", email: "lisa@bluewavetech.com", phone: "+1 555-0107", company: "BlueWave Tech", status: "Active", avatar: "LP" },
  { id: "8", name: "Ryan Mitchell", email: "ryan@nextstep.ai", phone: "+1 555-0108", company: "NextStep AI", status: "Active", avatar: "RM" },
];

export const leads = [
  { id: "1", name: "Sarah Chen", source: "Website", status: "Qualified", assignedTo: "John D.", value: 25000 },
  { id: "2", name: "Tech Solutions Ltd", source: "Referral", status: "New", assignedTo: "Jane S.", value: 50000 },
  { id: "3", name: "Global Industries", source: "LinkedIn", status: "Contacted", assignedTo: "John D.", value: 120000 },
  { id: "4", name: "StartUp Hub", source: "Website", status: "New", assignedTo: "Mike R.", value: 15000 },
  { id: "5", name: "Digital Wave Co", source: "Cold Call", status: "Lost", assignedTo: "Jane S.", value: 35000 },
  { id: "6", name: "Apex Dynamics", source: "Trade Show", status: "Qualified", assignedTo: "Mike R.", value: 80000 },
  { id: "7", name: "Orbit Systems", source: "Referral", status: "Contacted", assignedTo: "John D.", value: 45000 },
];

export type DealStage = "Prospect" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";

export const deals = [
  { id: "1", title: "Acme Corp - Enterprise Plan", contact: "Sarah Chen", value: 120000, stage: "Proposal" as DealStage, daysInStage: 5 },
  { id: "2", title: "TechStart - Starter Pack", contact: "James Wilson", value: 15000, stage: "Qualified" as DealStage, daysInStage: 3 },
  { id: "3", title: "GlobalNet - Custom Build", contact: "David Kim", value: 250000, stage: "Negotiation" as DealStage, daysInStage: 12 },
  { id: "4", title: "Innovate Inc - Annual License", contact: "Maria Garcia", value: 45000, stage: "Prospect" as DealStage, daysInStage: 1 },
  { id: "5", title: "Crescent Media - Campaign", contact: "Emily Brown", value: 30000, stage: "Closed Won" as DealStage, daysInStage: 0 },
  { id: "6", title: "BlueWave - Integration", contact: "Lisa Park", value: 65000, stage: "Proposal" as DealStage, daysInStage: 8 },
  { id: "7", title: "NextStep AI - ML Suite", contact: "Ryan Mitchell", value: 90000, stage: "Prospect" as DealStage, daysInStage: 2 },
  { id: "8", title: "Skyline Dev - Retainer", contact: "Alex Turner", value: 20000, stage: "Closed Lost" as DealStage, daysInStage: 0 },
];

export const appointments = [
  { id: "1", title: "Discovery Call - Acme Corp", date: "2026-04-10", time: "10:00 AM", attendees: ["Sarah Chen", "John D."], type: "Call" },
  { id: "2", title: "Product Demo - TechStart", date: "2026-04-10", time: "2:00 PM", attendees: ["James Wilson", "Jane S."], type: "Meeting" },
  { id: "3", title: "Contract Review - GlobalNet", date: "2026-04-11", time: "11:00 AM", attendees: ["David Kim", "Mike R."], type: "Meeting" },
  { id: "4", title: "Follow-up - Crescent Media", date: "2026-04-12", time: "9:30 AM", attendees: ["Emily Brown"], type: "Call" },
  { id: "5", title: "Onboarding - BlueWave", date: "2026-04-14", time: "3:00 PM", attendees: ["Lisa Park", "John D."], type: "Meeting" },
];

export const activities = [
  { id: "1", type: "Call", description: "Discovery call with Sarah Chen", date: "2026-04-09", time: "10:30 AM", user: "John D." },
  { id: "2", type: "Email", description: "Sent proposal to GlobalNet", date: "2026-04-09", time: "9:15 AM", user: "Mike R." },
  { id: "3", type: "Meeting", description: "Product demo with TechStart team", date: "2026-04-08", time: "2:00 PM", user: "Jane S." },
  { id: "4", type: "Note", description: "Updated pricing for Acme Corp deal", date: "2026-04-08", time: "11:00 AM", user: "John D." },
  { id: "5", type: "Email", description: "Follow-up email to Digital Wave", date: "2026-04-07", time: "4:30 PM", user: "Jane S." },
  { id: "6", type: "Call", description: "Cold call to Apex Dynamics", date: "2026-04-07", time: "10:00 AM", user: "Mike R." },
  { id: "7", type: "Meeting", description: "Team sync on Q2 pipeline", date: "2026-04-06", time: "9:00 AM", user: "John D." },
];

export const teamMembers = [
  { id: "1", name: "John Doe", email: "john@company.com", role: "Sales Manager", status: "Online", avatar: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@company.com", role: "Account Executive", status: "Online", avatar: "JS" },
  { id: "3", name: "Mike Ross", email: "mike@company.com", role: "Sales Rep", status: "Away", avatar: "MR" },
  { id: "4", name: "Anna Lee", email: "anna@company.com", role: "Marketing Lead", status: "Offline", avatar: "AL" },
];

export const users = [
  { id: "1", name: "John Doe", email: "john@company.com", role: "Admin", status: "Active", lastActive: "2 min ago" },
  { id: "2", name: "Jane Smith", email: "jane@company.com", role: "Editor", status: "Active", lastActive: "1 hour ago" },
  { id: "3", name: "Mike Ross", email: "mike@company.com", role: "Viewer", status: "Active", lastActive: "3 hours ago" },
  { id: "4", name: "Anna Lee", email: "anna@company.com", role: "Editor", status: "Inactive", lastActive: "2 days ago" },
];

export const kpiData = {
  totalContacts: 1248,
  activeLeads: 64,
  openDeals: 23,
  revenue: 485000,
};

export const chartData = {
  leadsBySource: [
    { name: "Website", value: 35 },
    { name: "Referral", value: 25 },
    { name: "LinkedIn", value: 20 },
    { name: "Cold Call", value: 12 },
    { name: "Trade Show", value: 8 },
  ],
  dealsByStage: [
    { name: "Prospect", value: 12 },
    { name: "Qualified", value: 8 },
    { name: "Proposal", value: 6 },
    { name: "Negotiation", value: 4 },
    { name: "Won", value: 15 },
    { name: "Lost", value: 5 },
  ],
  revenueOverTime: [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 55000 },
    { month: "Apr", revenue: 47000 },
    { month: "May", revenue: 62000 },
    { month: "Jun", revenue: 58000 },
  ],
};
