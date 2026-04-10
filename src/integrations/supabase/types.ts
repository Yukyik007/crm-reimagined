export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          address: string | null
          annual_revenue: number | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          employee_count: number | null
          id: string
          industry: string | null
          name: string
          owner_id: string | null
          phone: string | null
          state: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name: string
          owner_id?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          completed: boolean
          contact_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          lead_id: string | null
          opportunity_id: string | null
          owner_id: string | null
          subject: string
          type: Database["public"]["Enums"]["activity_type"]
          updated_at: string
        }
        Insert: {
          completed?: boolean
          contact_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          opportunity_id?: string | null
          owner_id?: string | null
          subject: string
          type?: Database["public"]["Enums"]["activity_type"]
          updated_at?: string
        }
        Update: {
          completed?: boolean
          contact_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lead_id?: string | null
          opportunity_id?: string | null
          owner_id?: string | null
          subject?: string
          type?: Database["public"]["Enums"]["activity_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          contact_id: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          location: string | null
          owner_id: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          owner_id?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          owner_id?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      check_ins: {
        Row: {
          appointment_id: string | null
          check_in_time: string
          check_out_time: string | null
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          user_id: string
        }
        Insert: {
          appointment_id?: string | null
          check_in_time?: string
          check_out_time?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          user_id: string
        }
        Update: {
          appointment_id?: string | null
          check_in_time?: string
          check_out_time?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          achieved_amount: number
          commission_earned: number
          commission_rate: number
          created_at: string
          id: string
          period: string
          status: Database["public"]["Enums"]["commission_status"]
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          achieved_amount?: number
          commission_earned?: number
          commission_rate?: number
          created_at?: string
          id?: string
          period: string
          status?: Database["public"]["Enums"]["commission_status"]
          target_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          achieved_amount?: number
          commission_earned?: number
          commission_rate?: number
          created_at?: string
          id?: string
          period?: string
          status?: Database["public"]["Enums"]["commission_status"]
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          account_id: string | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string
          id: string
          job_title: string | null
          last_name: string
          mobile: string | null
          owner_id: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          job_title?: string | null
          last_name: string
          mobile?: string | null
          owner_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string
          mobile?: string | null
          owner_id?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_registrations: {
        Row: {
          completed_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string | null
          status: Database["public"]["Enums"]["registration_status"]
          token: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          token: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          token?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string
          email: string | null
          estimated_value: number | null
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          estimated_value?: number | null
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          estimated_value?: number | null
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          account_id: string | null
          amount: number | null
          close_date: string | null
          contact_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string | null
          probability: number | null
          stage: Database["public"]["Enums"]["opportunity_stage"]
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          close_date?: string | null
          contact_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          close_date?: string | null
          contact_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sku: string | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sku?: string | null
          unit_price?: number
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sku?: string | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quotation_items: {
        Row: {
          created_at: string
          description: string | null
          discount_percent: number
          id: string
          line_total: number
          product_id: string | null
          product_name: string
          quantity: number
          quotation_id: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percent?: number
          id?: string
          line_total?: number
          product_id?: string | null
          product_name: string
          quantity?: number
          quotation_id: string
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percent?: number
          id?: string
          line_total?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          quotation_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotation_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          approved_by: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          opportunity_id: string | null
          quote_number: string
          status: Database["public"]["Enums"]["quotation_status"]
          total_amount: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          approved_by?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          opportunity_id?: string | null
          quote_number: string
          status?: Database["public"]["Enums"]["quotation_status"]
          total_amount?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          approved_by?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          opportunity_id?: string | null
          quote_number?: string
          status?: Database["public"]["Enums"]["quotation_status"]
          total_amount?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_resolved: boolean
          message: string
          opportunity_id: string
          resolved_at: string | null
          resolved_by: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_resolved?: boolean
          message: string
          opportunity_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_resolved?: boolean
          message?: string
          opportunity_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
        }
        Relationships: [
          {
            foreignKeyName: "risk_alerts_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          description: string | null
          id: string
          manager_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      activity_type: "call" | "email" | "meeting" | "task" | "note"
      alert_severity: "low" | "medium" | "high" | "critical"
      app_role:
        | "admin"
        | "sales_rep"
        | "sales_manager"
        | "presales"
        | "product_manager"
      commission_status: "pending" | "calculated" | "paid"
      lead_status: "new" | "contacted" | "qualified" | "converted" | "lost"
      opportunity_stage:
        | "prospecting"
        | "qualification"
        | "proposal"
        | "negotiation"
        | "closed_won"
        | "closed_lost"
      quotation_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "rejected"
        | "sent"
      registration_status: "pending" | "completed" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: ["call", "email", "meeting", "task", "note"],
      alert_severity: ["low", "medium", "high", "critical"],
      app_role: [
        "admin",
        "sales_rep",
        "sales_manager",
        "presales",
        "product_manager",
      ],
      commission_status: ["pending", "calculated", "paid"],
      lead_status: ["new", "contacted", "qualified", "converted", "lost"],
      opportunity_stage: [
        "prospecting",
        "qualification",
        "proposal",
        "negotiation",
        "closed_won",
        "closed_lost",
      ],
      quotation_status: [
        "draft",
        "pending_approval",
        "approved",
        "rejected",
        "sent",
      ],
      registration_status: ["pending", "completed", "expired"],
    },
  },
} as const
