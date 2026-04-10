import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateLead } from "@/hooks/use-data";

export function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateLead();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", company: "", source: "", estimated_value: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(form, { onSuccess: () => { setOpen(false); setForm({ first_name: "", last_name: "", email: "", phone: "", company: "", source: "", estimated_value: 0 }); } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Lead</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Lead</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="space-y-2"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Source</Label><Input placeholder="Website, Referral..." value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} /></div>
            <div className="space-y-2"><Label>Est. Value</Label><Input type="number" value={form.estimated_value} onChange={(e) => setForm({ ...form, estimated_value: Number(e.target.value) })} /></div>
          </div>
          <Button type="submit" className="w-full" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Lead"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
