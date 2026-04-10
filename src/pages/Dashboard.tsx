import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "@/hooks/use-data";
import { useAuth } from "@/contexts/AuthContext";
import { Users, UserPlus, Handshake, DollarSign, Plus, Phone, Mail, MessageSquare, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const activityIcons: Record<string, React.ElementType> = { call: Phone, email: Mail, meeting: MessageSquare, note: FileText, task: FileText };

const Dashboard = () => {
  const { profile } = useAuth();
  const { data, isLoading } = useDashboardStats();
  const navigate = useNavigate();
  const firstName = profile?.display_name?.split(" ")[0] || "there";

  const kpis = [
    { label: "Total Contacts", value: data?.totalContacts?.toLocaleString() ?? "0", icon: Users },
    { label: "Active Leads", value: data?.activeLeads?.toString() ?? "0", icon: UserPlus },
    { label: "Open Deals", value: data?.openDeals?.toString() ?? "0", icon: Handshake },
    { label: "Revenue", value: `$${((data?.revenue ?? 0) / 1000).toFixed(0)}k`, icon: DollarSign },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back, {firstName}</h2>
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
                {isLoading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{kpi.value}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : data?.recentActivities?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activities yet. Start by adding contacts and logging activities.</p>
              ) : (
                <div className="space-y-4">
                  {data?.recentActivities?.slice(0, 5).map((a: any) => {
                    const Icon = activityIcons[a.type] || FileText;
                    return (
                      <div key={a.id} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-muted p-2"><Icon className="h-3.5 w-3.5 text-muted-foreground" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{a.subject}</p>
                          <p className="text-xs text-muted-foreground">{a.description || ""} · {new Date(a.created_at).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">{a.type}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/contacts")}>
                <Plus className="h-4 w-4 mr-2" /> Add Contact
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/leads")}>
                <UserPlus className="h-4 w-4 mr-2" /> New Lead
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/appointments")}>
                <Phone className="h-4 w-4 mr-2" /> Schedule Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
