import { AppLayout } from "@/components/AppLayout";
import { useActivities } from "@/hooks/use-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, FileText, CheckSquare } from "lucide-react";
import { useState } from "react";
import { AddActivityDialog } from "@/components/AddActivityDialog";
import { Skeleton } from "@/components/ui/skeleton";

const icons: Record<string, React.ElementType> = { call: Phone, email: Mail, meeting: MessageSquare, note: FileText, task: CheckSquare };
const types = ["All", "call", "email", "meeting", "task", "note"];

const Activities = () => {
  const [filter, setFilter] = useState("All");
  const { data: activities, isLoading } = useActivities();
  const filtered = filter === "All" ? (activities || []) : (activities || []).filter((a) => a.type === filter);

  return (
    <AppLayout title="Activities">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {types.map((t) => (
              <Button key={t} variant={filter === t ? "default" : "outline"} size="sm" onClick={() => setFilter(t)} className="capitalize">{t}</Button>
            ))}
          </div>
          <AddActivityDialog />
        </div>
        {isLoading ? (
          <div className="space-y-2">{[1,2,3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No activities found.</p>
        ) : (
          <div className="space-y-1">
            {filtered.map((a) => {
              const Icon = icons[a.type] || FileText;
              return (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="mt-0.5 rounded-full bg-muted p-2"><Icon className="h-3.5 w-3.5 text-muted-foreground" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.subject}</p>
                    <p className="text-xs text-muted-foreground">{a.description || ""} · {new Date(a.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.completed && <Badge variant="default" className="text-xs">Done</Badge>}
                    <Badge variant="secondary" className="text-xs capitalize">{a.type}</Badge>
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

export default Activities;
