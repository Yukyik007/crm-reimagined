import { AppLayout } from "@/components/AppLayout";
import { teamMembers } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const statusColor: Record<string, string> = {
  Online: "bg-emerald-500", Away: "bg-amber-500", Offline: "bg-muted-foreground/30",
};

const Teams = () => (
  <AppLayout title="Teams">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{teamMembers.length} team members</p>
        <Button><Plus className="h-4 w-4 mr-2" /> Invite Member</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">{m.avatar}</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColor[m.status]}`} />
              </div>
              <div>
                <p className="font-medium text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">{m.role}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default Teams;
