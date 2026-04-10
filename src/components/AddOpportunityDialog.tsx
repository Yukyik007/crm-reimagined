import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateOpportunity } from "@/hooks/use-data";

const stages = ["prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost"];

export function AddOpportunityDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateOpportunity();
  const [form, setForm] = useState({ name: "", stage: "prospecting", amount: 0, close_date: "", probability: 20, description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(form, { onSuccess: () => { setOpen(false); setForm({ name: "", stage: "prospecting", amount: 0, close_date: "", probability: 20, description: "" }); } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Add Opportunity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Opportunity</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Stage</Label>
              <Select value={form.stage} onValueChange={(v) => setForm({ ...form, stage: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{stages.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Amount</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Close Date</Label><Input type="date" value={form.close_date} onChange={(e) => setForm({ ...form, close_date: e.target.value })} /></div>
            <div className="space-y-2"><Label>Probability %</Label><Input type="number" min="0" max="100" value={form.probability} onChange={(e) => setForm({ ...form, probability: Number(e.target.value) })} /></div>
          </div>
          <Button type="submit" className="w-full" disabled={create.isPending}>{create.isPending ? "Creating..." : "Create Opportunity"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
