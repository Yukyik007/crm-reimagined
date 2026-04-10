import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateContact } from "@/hooks/use-data";

export function AddContactDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateContact();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", job_title: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(form, { onSuccess: () => { setOpen(false); setForm({ first_name: "", last_name: "", email: "", phone: "", job_title: "" }); } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Contact</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div className="space-y-2"><Label>Job Title</Label><Input value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} /></div>
          <Button type="submit" className="w-full" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Contact"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
