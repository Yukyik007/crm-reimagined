import { AppLayout } from "@/components/AppLayout";
import { useTeams } from "@/hooks/use-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

const Teams = () => {
  const { data: teams, isLoading } = useTeams();

  return (
    <AppLayout title="Teams">
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1,2,3].map((i) => <Skeleton key={i} className="h-32" />)}</div>
        ) : (teams || []).length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No teams created yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(teams || []).map((team) => (
              <Card key={team.id}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm mb-1">{team.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{team.description || "No description"}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{(team as any).team_members?.length || 0} members</Badge>
                  </div>
                  {(team as any).team_members?.length > 0 && (
                    <div className="flex -space-x-2 mt-3">
                      {(team as any).team_members.slice(0, 5).map((m: any) => (
                        <Avatar key={m.id} className="h-7 w-7 border-2 border-card">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {m.profiles?.display_name?.split(" ").map((n: string) => n[0]).join("") || "?"}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Teams;
