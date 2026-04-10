import { AppLayout } from "@/components/AppLayout";
import { useOpportunities, useUpdateOpportunityStage } from "@/hooks/use-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddOpportunityDialog } from "@/components/AddOpportunityDialog";
import { Skeleton } from "@/components/ui/skeleton";

const stages = ["prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost"];
const stageLabels: Record<string, string> = {
  prospecting: "Prospecting", qualification: "Qualification", proposal: "Proposal",
  negotiation: "Negotiation", closed_won: "Closed Won", closed_lost: "Closed Lost",
};
const stageColors: Record<string, string> = {
  prospecting: "bg-muted", qualification: "bg-blue-50 dark:bg-blue-950",
  proposal: "bg-amber-50 dark:bg-amber-950", negotiation: "bg-purple-50 dark:bg-purple-950",
  closed_won: "bg-emerald-50 dark:bg-emerald-950", closed_lost: "bg-red-50 dark:bg-red-950",
};

const Pipeline = () => {
  const { data: opportunities, isLoading } = useOpportunities();

  return (
    <AppLayout title="Pipeline">
      <div className="space-y-4">
        <div className="flex justify-end"><AddOpportunityDialog /></div>
        {isLoading ? (
          <div className="flex gap-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-48 flex-1" />)}</div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageOpps = (opportunities || []).filter((o) => o.stage === stage);
              const total = stageOpps.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
              return (
                <div key={stage} className="min-w-[280px] flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">{stageLabels[stage]}</h3>
                    <Badge variant="secondary" className="text-xs">{stageOpps.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {stageOpps.map((opp) => (
                      <Card key={opp.id} className={`cursor-pointer hover:shadow-md transition-shadow ${stageColors[stage]}`}>
                        <CardContent className="p-4">
                          <p className="font-medium text-sm mb-1">{opp.name}</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {(opp as any).contacts ? `${(opp as any).contacts.first_name} ${(opp as any).contacts.last_name}` : (opp as any).accounts?.name || "—"}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">${(Number(opp.amount) || 0).toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">{opp.probability}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {stageOpps.length > 0 && (
                      <p className="text-xs text-muted-foreground text-center pt-1">Total: ${total.toLocaleString()}</p>
                    )}
                    {stageOpps.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">No deals</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Pipeline;
