import { AppLayout } from "@/components/AppLayout";
import { useAppointments } from "@/hooks/use-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, List, Phone, Users } from "lucide-react";
import { useState } from "react";
import { AddAppointmentDialog } from "@/components/AddAppointmentDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const Appointments = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const { data: appointments, isLoading } = useAppointments();

  return (
    <AppLayout title="Appointments">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
              <List className="h-4 w-4 mr-1" /> List
            </Button>
            <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
              <Calendar className="h-4 w-4 mr-1" /> Calendar
            </Button>
          </div>
          <AddAppointmentDialog />
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
        ) : view === "list" ? (
          <div className="space-y-3">
            {(appointments || []).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No appointments scheduled.</p>
            ) : (
              (appointments || []).map((a) => (
                <Card key={a.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="rounded-full bg-muted p-2.5">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(a.start_time), "MMM d, yyyy h:mm a")} — {format(new Date(a.end_time), "h:mm a")}
                        {a.location && ` · ${a.location}`}
                      </p>
                    </div>
                    {(a as any).contacts && (
                      <Badge variant="secondary">{(a as any).contacts.first_name} {(a as any).contacts.last_name}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Calendar View</p>
              <p className="text-sm">Full calendar view coming soon.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Appointments;
