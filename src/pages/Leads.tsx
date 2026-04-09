import { AppLayout } from "@/components/AppLayout";
import { leads } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  New: "outline", Contacted: "secondary", Qualified: "default", Lost: "destructive",
};

const Leads = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "New", "Contacted", "Qualified", "Lost"];

  const filtered = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
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
          <Button><Plus className="h-4 w-4 mr-2" /> Add Lead</Button>
        </div>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>{s}</Button>
          ))}
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="cursor-pointer">
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{l.source}</TableCell>
                  <TableCell><Badge variant={statusColors[l.status] || "secondary"}>{l.status}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{l.assignedTo}</TableCell>
                  <TableCell className="text-right font-medium">${l.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Leads;
