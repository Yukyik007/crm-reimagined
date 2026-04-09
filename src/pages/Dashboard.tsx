import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { kpiData, activities } from "@/lib/mock-data";
import { Users, UserPlus, Handshake, DollarSign, Plus, Phone, Mail, MessageSquare, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total Contacts", value: kpiData.totalContacts.toLocaleString(), icon: Users, trend: "+12%" },
  { label: "Active Leads", value: kpiData.activeLeads.toString(), icon: UserPlus, trend: "+8%" },
  { label: "Open Deals", value: kpiData.openDeals.toString(), icon: Handshake, trend: "+3" },
  { label: "Revenue", value: `$${(kpiData.revenue / 1000).toFixed(0)}k`, icon: DollarSign, trend: "+18%" },
];

const activityIcons: Record<string, React.ElementType> = { Call: Phone, Email: Mail, Meeting: MessageSquare, Note: FileText };

const Dashboard = () => (
  <AppLayout title="Dashboard">
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground">Here's what's happening with your CRM today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium">{kpi.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((a) => {
                const Icon = activityIcons[a.type] || FileText;
                return (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-muted p-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{a.description}</p>
                      <p className="text-xs text-muted-foreground">{a.user} · {a.date} at {a.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">{a.type}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add Contact
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="h-4 w-4 mr-2" /> New Lead
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Phone className="h-4 w-4 mr-2" /> Schedule Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </AppLayout>
);

export default Dashboard;
