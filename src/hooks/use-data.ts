import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Contacts
export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contacts").select("*, accounts(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateContact() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (contact: { first_name: string; last_name: string; email?: string; phone?: string; mobile?: string; job_title?: string; department?: string; account_id?: string; status?: string }) => {
      const { data, error } = await supabase.from("contacts").insert({ ...contact, owner_id: user?.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["contacts"] }); toast.success("Contact created"); },
    onError: (e) => toast.error(e.message),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["contacts"] }); toast.success("Contact deleted"); },
    onError: (e) => toast.error(e.message),
  });
}

// Leads
export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (lead: { first_name: string; last_name: string; email?: string; phone?: string; company?: string; source?: string; estimated_value?: number }) => {
      const { data, error } = await supabase.from("leads").insert({ ...lead, assigned_to: user?.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["leads"] }); toast.success("Lead created"); },
    onError: (e) => toast.error(e.message),
  });
}

// Opportunities
export function useOpportunities() {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("opportunities").select("*, accounts(name), contacts(first_name, last_name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateOpportunity() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (opp: { name: string; stage?: string; amount?: number; close_date?: string; probability?: number; account_id?: string; contact_id?: string; description?: string }) => {
      const { data, error } = await supabase.from("opportunities").insert({ ...opp, owner_id: user?.id } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["opportunities"] }); toast.success("Opportunity created"); },
    onError: (e) => toast.error(e.message),
  });
}

export function useUpdateOpportunityStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: string }) => {
      const { error } = await supabase.from("opportunities").update({ stage } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["opportunities"] }); },
    onError: (e) => toast.error(e.message),
  });
}

// Activities
export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("activities").select("*, contacts(first_name, last_name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (activity: { type?: string; subject: string; description?: string; due_date?: string; contact_id?: string; lead_id?: string; opportunity_id?: string }) => {
      const { data, error } = await supabase.from("activities").insert({ ...activity, owner_id: user?.id } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["activities"] }); toast.success("Activity created"); },
    onError: (e) => toast.error(e.message),
  });
}

// Appointments
export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*, contacts(first_name, last_name)").order("start_time", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateAppointment() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (appt: { title: string; description?: string; start_time: string; end_time: string; location?: string; contact_id?: string }) => {
      const { data, error } = await supabase.from("appointments").insert({ ...appt, owner_id: user?.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["appointments"] }); toast.success("Appointment created"); },
    onError: (e) => toast.error(e.message),
  });
}

// Teams
export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teams").select("*, team_members(*, profiles(display_name, avatar_url))").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Accounts
export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("accounts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateAccount() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (account: { name: string; industry?: string; website?: string; phone?: string; email?: string }) => {
      const { data, error } = await supabase.from("accounts").insert({ ...account, owner_id: user?.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["accounts"] }); toast.success("Account created"); },
    onError: (e) => toast.error(e.message),
  });
}

// Products
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Commissions
export function useCommissions() {
  return useQuery({
    queryKey: ["commissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("commissions").select("*, profiles:user_id(display_name)");
      if (error) throw error;
      return data;
    },
  });
}

// Risk Alerts
export function useRiskAlerts() {
  return useQuery({
    queryKey: ["risk_alerts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("risk_alerts").select("*, opportunities(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Profiles (for admin)
export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*, user_roles(role)");
      if (error) throw error;
      return data;
    },
  });
}

// Quotations
export function useQuotations() {
  return useQuery({
    queryKey: ["quotations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("quotations").select("*, opportunities(name), contacts(first_name, last_name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Check-ins
export function useCheckIns() {
  return useQuery({
    queryKey: ["check_ins"],
    queryFn: async () => {
      const { data, error } = await supabase.from("check_ins").select("*, appointments(title)").order("check_in_time", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Dashboard stats
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard_stats"],
    queryFn: async () => {
      const [contacts, leads, opps, activities] = await Promise.all([
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).in("status", ["new", "contacted", "qualified"]),
        supabase.from("opportunities").select("id, amount", { count: "exact" }).not("stage", "in", '("closed_won","closed_lost")'),
        supabase.from("activities").select("*, contacts(first_name, last_name)").order("created_at", { ascending: false }).limit(10),
      ]);
      const totalRevenue = (await supabase.from("opportunities").select("amount").eq("stage", "closed_won")).data?.reduce((s, o) => s + (Number(o.amount) || 0), 0) || 0;
      return {
        totalContacts: contacts.count || 0,
        activeLeads: leads.count || 0,
        openDeals: opps.count || 0,
        revenue: totalRevenue,
        recentActivities: activities.data || [],
      };
    },
  });
}
