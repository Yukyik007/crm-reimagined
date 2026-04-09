import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Settings = () => (
  <AppLayout title="Settings">
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications", desc: "Receive email updates for new leads and deals" },
            { label: "Push notifications", desc: "Get browser notifications for appointments" },
            { label: "Weekly digest", desc: "Receive a weekly summary of your CRM activity" },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={i < 2} />
              </div>
              {i < 2 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Dark mode</Label>
              <p className="text-xs text-muted-foreground">Toggle dark theme across the app</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  </AppLayout>
);

export default Settings;
