import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Zap, Globe, BarChart3, Shield } from "lucide-react";

const tools = [
  { title: "Email Integration", desc: "Connect your email provider", icon: Mail },
  { title: "Chat Widget", desc: "Add live chat to your site", icon: MessageSquare },
  { title: "Automation", desc: "Set up workflow automations", icon: Zap },
  { title: "Web Forms", desc: "Create lead capture forms", icon: Globe },
  { title: "Analytics", desc: "Advanced reporting tools", icon: BarChart3 },
  { title: "Security", desc: "Two-factor authentication", icon: Shield },
];

const Tools = () => (
  <AppLayout title="Tools">
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">Integrations and tools to extend your CRM.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Card key={t.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <t.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default Tools;
