
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'sales_rep', 'sales_manager', 'presales', 'product_manager');

-- Create lead status enum
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');

-- Create opportunity stage enum
CREATE TYPE public.opportunity_stage AS ENUM ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost');

-- Create activity type enum
CREATE TYPE public.activity_type AS ENUM ('call', 'email', 'meeting', 'task', 'note');

-- Create quotation status enum
CREATE TYPE public.quotation_status AS ENUM ('draft', 'pending_approval', 'approved', 'rejected', 'sent');

-- Create commission status enum
CREATE TYPE public.commission_status AS ENUM ('pending', 'calculated', 'paid');

-- Create alert severity enum
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create registration status enum
CREATE TYPE public.registration_status AS ENUM ('pending', 'completed', 'expired');

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  department TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  -- Default role: sales_rep
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'sales_rep');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Accounts
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  phone TEXT,
  email TEXT,
  annual_revenue NUMERIC,
  employee_count INTEGER,
  owner_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contacts
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  job_title TEXT,
  department TEXT,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  owner_id UUID,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  source TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  assigned_to UUID,
  estimated_value NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Opportunities
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  owner_id UUID,
  stage opportunity_stage NOT NULL DEFAULT 'prospecting',
  amount NUMERIC DEFAULT 0,
  close_date DATE,
  probability INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Activities
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type activity_type NOT NULL DEFAULT 'task',
  subject TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  completed BOOLEAN NOT NULL DEFAULT false,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  owner_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  owner_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  manager_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  description TEXT,
  category TEXT,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quotations
CREATE TABLE public.quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT NOT NULL UNIQUE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  created_by UUID,
  approved_by UUID,
  status quotation_status NOT NULL DEFAULT 'draft',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  valid_until DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_quotations_updated_at BEFORE UPDATE ON public.quotations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quotation items
CREATE TABLE public.quotation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  discount_percent NUMERIC NOT NULL DEFAULT 0,
  line_total NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;

-- Commissions
CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  period TEXT NOT NULL,
  target_amount NUMERIC NOT NULL DEFAULT 0,
  achieved_amount NUMERIC NOT NULL DEFAULT 0,
  commission_rate NUMERIC NOT NULL DEFAULT 0,
  commission_earned NUMERIC NOT NULL DEFAULT 0,
  status commission_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON public.commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Risk alerts
CREATE TABLE public.risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  message TEXT NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'medium',
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_by UUID,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.risk_alerts ENABLE ROW LEVEL SECURITY;

-- Customer registrations
CREATE TABLE public.customer_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status registration_status NOT NULL DEFAULT 'pending',
  invited_by UUID,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.customer_registrations ENABLE ROW LEVEL SECURITY;

-- Check-ins
CREATE TABLE public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  check_in_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  check_out_time TIMESTAMPTZ,
  latitude NUMERIC,
  longitude NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

-- =================== RLS POLICIES ===================

-- Profiles
CREATE POLICY "Anyone authenticated can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Accounts
CREATE POLICY "Authenticated can view accounts" ON public.accounts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create accounts" ON public.accounts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update accounts" ON public.accounts FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin can delete accounts" ON public.accounts FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

-- Contacts
CREATE POLICY "Authenticated can view contacts" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create contacts" ON public.contacts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update contacts" ON public.contacts FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin can delete contacts" ON public.contacts FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

-- Leads
CREATE POLICY "Authenticated can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create leads" ON public.leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Assignee or admin can update leads" ON public.leads FOR UPDATE TO authenticated USING (auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assignee or admin can delete leads" ON public.leads FOR DELETE TO authenticated USING (auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin'));

-- Opportunities
CREATE POLICY "Authenticated can view opportunities" ON public.opportunities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create opportunities" ON public.opportunities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update opportunities" ON public.opportunities FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin can delete opportunities" ON public.opportunities FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

-- Activities
CREATE POLICY "Authenticated can view activities" ON public.activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create activities" ON public.activities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update activities" ON public.activities FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin can delete activities" ON public.activities FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

-- Appointments
CREATE POLICY "Authenticated can view appointments" ON public.appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create appointments" ON public.appointments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update appointments" ON public.appointments FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner or admin can delete appointments" ON public.appointments FOR DELETE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));

-- Teams
CREATE POLICY "Authenticated can view teams" ON public.teams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin or manager can create teams" ON public.teams FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Manager or admin can update teams" ON public.teams FOR UPDATE TO authenticated USING (auth.uid() = manager_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can delete teams" ON public.teams FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Team members
CREATE POLICY "Authenticated can view team members" ON public.team_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manager or admin can manage members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND manager_id = auth.uid())
);
CREATE POLICY "Manager or admin can update members" ON public.team_members FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND manager_id = auth.uid())
);
CREATE POLICY "Manager or admin can remove members" ON public.team_members FOR DELETE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND manager_id = auth.uid())
);

-- Products
CREATE POLICY "Authenticated can view products" ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin or PM can create products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'product_manager'));
CREATE POLICY "Admin or PM can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'product_manager'));
CREATE POLICY "Admin can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Quotations
CREATE POLICY "Authenticated can view quotations" ON public.quotations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create quotations" ON public.quotations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Creator or admin can update quotations" ON public.quotations FOR UPDATE TO authenticated USING (auth.uid() = created_by OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Admin can delete quotations" ON public.quotations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Quotation items
CREATE POLICY "Authenticated can view quotation items" ON public.quotation_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create quotation items" ON public.quotation_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Creator or admin can update quotation items" ON public.quotation_items FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.quotations WHERE id = quotation_id AND (created_by = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);
CREATE POLICY "Admin can delete quotation items" ON public.quotation_items FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.quotations WHERE id = quotation_id AND (created_by = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);

-- Commissions
CREATE POLICY "Users can view own commissions" ON public.commissions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Admin can manage commissions" ON public.commissions FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Admin can update commissions" ON public.commissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));

-- Risk alerts
CREATE POLICY "Authenticated can view risk alerts" ON public.risk_alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "System or admin can create alerts" ON public.risk_alerts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Admin or manager can update alerts" ON public.risk_alerts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));

-- Customer registrations
CREATE POLICY "Admin can view registrations" ON public.customer_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can create registrations" ON public.customer_registrations FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update registrations" ON public.customer_registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Check-ins
CREATE POLICY "Users can view own check-ins" ON public.check_ins FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'sales_manager'));
CREATE POLICY "Users can create own check-ins" ON public.check_ins FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own check-ins" ON public.check_ins FOR UPDATE TO authenticated USING (auth.uid() = user_id);
