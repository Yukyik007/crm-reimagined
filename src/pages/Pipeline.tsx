import { AppLayout } from "@/components/AppLayout";
import { deals, DealStage } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages: DealStage[] = ["Prospect", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

const stageColors: Record<string, string> = {
  Prospect: "bg-muted",
  Qualified: "bg-blue-50 dark:bg-blue-950",
  Proposal: "bg-amber-50 dark:bg-amber-950",
  Negotiation: "bg-purple-50 dark:bg-purple-950",
  "Closed Won": "bg-emerald-50 dark:bg-emerald-950",
  "Closed Lost": "bg-red-50 dark:bg-red-950",
};

const Pipeline = () => (
  <AppLayout title="Pipeline">
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage);
        const total = stageDeals.reduce((sum, d) => sum + d.value, 0);
        return (
          <div key={stage} className="min-w-[280px] flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">{stage}</h3>
              <Badge variant="secondary" className="text-xs">{stageDeals.length}</Badge>
            </div>
            <div className="space-y-3">
              {stageDeals.map((deal) => (
                <Card key={deal.id} className={`cursor-pointer hover:shadow-md transition-shadow ${stageColors[stage]}`}>
                  <CardContent className="p-4">
                    <p className="font-medium text-sm mb-1">{deal.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{deal.contact}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">${deal.value.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{deal.daysInStage}d in stage</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {stageDeals.length > 0 && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Total: ${total.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </AppLayout>
);

export default Pipeline;
