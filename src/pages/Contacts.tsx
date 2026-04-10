import { AppLayout } from "@/components/AppLayout";
import { useContacts } from "@/hooks/use-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useState } from "react";
import { AddContactDialog } from "@/components/AddContactDialog";
import { Skeleton } from "@/components/ui/skeleton";

const Contacts = () => {
  const [search, setSearch] = useState("");
  const { data: contacts, isLoading } = useContacts();

  const filtered = (contacts || []).filter((c) => {
    const name = `${c.first_name} ${c.last_name}`.toLowerCase();
    return name.includes(search.toLowerCase()) || (c.email || "").toLowerCase().includes(search.toLowerCase());
  });

  return (
    <AppLayout title="Contacts">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <AddContactDialog />
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden sm:table-cell">Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1,2,3].map((i) => <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No contacts found. Add your first contact!</TableCell></TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {c.first_name[0]}{c.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{c.first_name} {c.last_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.email || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{c.phone || "—"}</TableCell>
                    <TableCell className="hidden sm:table-cell">{(c as any).accounts?.name || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "Active" ? "default" : "secondary"}>{c.status}</Badge>
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

export default Contacts;
