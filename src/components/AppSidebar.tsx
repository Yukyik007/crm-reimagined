import {
  LayoutDashboard, Users, UserPlus, Kanban, CalendarDays,
  Activity, UsersRound, BarChart3, Wrench, Settings, UserCircle, LogOut, ShieldCheck,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Leads", url: "/leads", icon: UserPlus },
  { title: "Pipeline", url: "/pipeline", icon: Kanban },
  { title: "Appointments", url: "/appointments", icon: CalendarDays },
  { title: "Activities", url: "/activities", icon: Activity },
  { title: "Teams", url: "/teams", icon: UsersRound },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Tools", url: "/tools", icon: Wrench },
];

const bottomNav = [
  { title: "Admin", url: "/admin", icon: ShieldCheck },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: UserCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-4">
            {!collapsed ? (
              <span className="text-lg font-bold tracking-tight text-foreground">CRM</span>
            ) : (
              <span className="text-lg font-bold text-foreground">C</span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator className="mb-2" />
        <SidebarMenu>
          {bottomNav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className="hover:bg-sidebar-accent/50"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-sidebar-accent/50 text-muted-foreground cursor-pointer" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
