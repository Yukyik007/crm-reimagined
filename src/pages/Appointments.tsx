import { AppLayout } from "@/components/AppLayout";
import { appointments } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, List, Phone, Users } from "lucide-react";
import { useState } from "react";

const Appointments = () => {
  const [view, setView] = useState<"list" | "calendar">("list");

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
          <Button><Plus className="h-4 w-4 mr-2" /> New Appointment</Button>
        </div>

        {view === "list" ? (
          <div className="space-y-3">
            {appointments.map((a) => (
              <Card key={a.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-muted p-2.5">
                    {a.type === "Call" ? <Phone className="h-4 w-4 text-muted-foreground" /> : <Users className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date} at {a.time} · {a.attendees.join(", ")}</p>
                  </div>
                  <Badge variant="secondary">{a.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Calendar View</p>
              <p className="text-sm">Full calendar view coming soon — connect your backend to enable scheduling.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Appointments;
