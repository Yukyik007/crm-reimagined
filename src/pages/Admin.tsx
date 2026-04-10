import { AppLayout } from "@/components/AppLayout";
import { useProfiles } from "@/hooks/use-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

const Admin = () => {
  const { hasRole } = useAuth();
  const { data: profiles, isLoading } = useProfiles();

  if (!hasRole("admin") && !hasRole("sales_manager")) {
    return (
      <AppLayout title="Admin">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
          <p className="text-xs text-muted-foreground mt-1">Contact an administrator to request access.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Admin — Users">
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">{(profiles || []).length} users</p>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Roles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1,2,3].map((i) => <TableRow key={i}><TableCell colSpan={3}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)
              ) : (profiles || []).length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">No users found.</TableCell></TableRow>
              ) : (
                (profiles || []).map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.display_name || "Unknown"}</TableCell>
                    <TableCell className="text-muted-foreground">{p.department || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {((p as any).user_roles || []).map((r: any) => (
                          <Badge key={r.role} variant="outline" className="capitalize text-xs">{r.role.replace("_", " ")}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
