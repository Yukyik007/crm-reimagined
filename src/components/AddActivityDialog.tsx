import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateActivity } from "@/hooks/use-data";

const types = ["call", "email", "meeting", "task", "note"];

export function AddActivityDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateActivity();
  const [form, setForm] = useState({ type: "task", subject: "", description: "", due_date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { ...form, due_date: form.due_date ? new Date(form.due_date).toISOString() : undefined },
      { onSuccess: () => { setOpen(false); setForm({ type: "task", subject: "", description: "", due_date: "" }); } }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Activity</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Subject</Label><Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="space-y-2"><Label>Due Date</Label><Input type="datetime-local" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
          <Button type="submit" className="w-full" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Activity"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
