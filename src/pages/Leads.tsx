import { AppLayout } from "@/components/AppLayout";
import { useLeads } from "@/hooks/use-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import { AddLeadDialog } from "@/components/AddLeadDialog";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "outline", contacted: "secondary", qualified: "default", lost: "destructive", converted: "default",
};

const Leads = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data: leads, isLoading } = useLeads();
  const statuses = ["All", "new", "contacted", "qualified", "converted", "lost"];

  const filtered = (leads || []).filter((l) => {
    const name = `${l.first_name} ${l.last_name}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || (l.company || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || l.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AppLayout title="Leads">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search leads..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <AddLeadDialog />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)} className="capitalize">{s}</Button>
          ))}
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1,2,3].map((i) => <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No leads found.</TableCell></TableRow>
              ) : (
                filtered.map((l) => (
                  <TableRow key={l.id} className="cursor-pointer">
                    <TableCell className="font-medium">{l.first_name} {l.last_name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{l.source || "—"}</TableCell>
                    <TableCell><Badge variant={statusColors[l.status] || "secondary"} className="capitalize">{l.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{l.company || "—"}</TableCell>
                    <TableCell className="text-right font-medium">${(Number(l.estimated_value) || 0).toLocaleString()}</TableCell>
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

export default Leads;
