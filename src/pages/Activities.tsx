import { AppLayout } from "@/components/AppLayout";
import { activities } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Phone, Mail, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";

const icons: Record<string, React.ElementType> = { Call: Phone, Email: Mail, Meeting: MessageSquare, Note: FileText };
const types = ["All", "Call", "Email", "Meeting", "Note"];

const Activities = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? activities : activities.filter((a) => a.type === filter);

  return (
    <AppLayout title="Activities">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {types.map((t) => (
              <Button key={t} variant={filter === t ? "default" : "outline"} size="sm" onClick={() => setFilter(t)}>{t}</Button>
            ))}
          </div>
          <Button><Plus className="h-4 w-4 mr-2" /> Add Activity</Button>
        </div>
        <div className="space-y-1">
          {filtered.map((a) => {
            const Icon = icons[a.type] || FileText;
            return (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="mt-0.5 rounded-full bg-muted p-2">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.user} · {a.date} at {a.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">{a.type}</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Activities;
