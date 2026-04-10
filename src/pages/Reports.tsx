import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOpportunities, useLeads } from "@/hooks/use-data";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 72%, 42%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", "hsl(262, 80%, 50%)", "hsl(180, 60%, 45%)"];

const Reports = () => {
  const { data: opportunities, isLoading: loadingOpps } = useOpportunities();
  const { data: leads, isLoading: loadingLeads } = useLeads();

  const dealsByStage = ["prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost"].map((stage) => ({
    name: stage.replace("_", " "),
    value: (opportunities || []).filter((o) => o.stage === stage).length,
  }));

  const leadsBySource = Object.entries(
    (leads || []).reduce<Record<string, number>>((acc, l) => { acc[l.source || "Unknown"] = (acc[l.source || "Unknown"] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const totalLeads = (leads || []).length;
  const wonDeals = (opportunities || []).filter((o) => o.stage === "closed_won");
  const winRate = (opportunities || []).length > 0
    ? Math.round((wonDeals.length / (opportunities || []).length) * 100)
    : 0;
  const avgDealSize = wonDeals.length > 0
    ? Math.round(wonDeals.reduce((s, o) => s + (Number(o.amount) || 0), 0) / wonDeals.length)
    : 0;

  const isLoading = loadingOpps || loadingLeads;

  return (
    <AppLayout title="Reports">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle></CardHeader>
            <CardContent>{isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{totalLeads}</div>}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle></CardHeader>
            <CardContent>{isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{winRate}%</div>}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Deal Size</CardTitle></CardHeader>
            <CardContent>{isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">${(avgDealSize / 1000).toFixed(0)}k</div>}</CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Leads by Source</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[250px]" /> : leadsBySource.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No lead data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={leadsBySource}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(220, 10%, 46%)' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(220, 10%, 46%)' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Deals by Stage</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[250px]" /> : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dealsByStage.filter((d) => d.value > 0)} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {dealsByStage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
