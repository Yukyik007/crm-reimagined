import { AppLayout } from "@/components/AppLayout";
import { users } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Admin = () => (
  <AppLayout title="Admin — Users">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{users.length} users</p>
        <Button><Plus className="h-4 w-4 mr-2" /> Add User</Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="cursor-pointer">
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                <TableCell><Badge variant={u.status === "Active" ? "default" : "secondary"}>{u.status}</Badge></TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{u.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </AppLayout>
);

export default Admin;
