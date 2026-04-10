import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateAppointment } from "@/hooks/use-data";

export function AddAppointmentDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateAppointment();
  const [form, setForm] = useState({ title: "", description: "", start_time: "", end_time: "", location: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { ...form, start_time: new Date(form.start_time).toISOString(), end_time: new Date(form.end_time).toISOString() },
      { onSuccess: () => { setOpen(false); setForm({ title: "", description: "", start_time: "", end_time: "", location: "" }); } }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> New Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Appointment</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Start</Label><Input type="datetime-local" required value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} /></div>
            <div className="space-y-2"><Label>End</Label><Input type="datetime-local" required value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <Button type="submit" className="w-full" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Appointment"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
