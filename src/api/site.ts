import { supabase } from "@/lib/supabase"

export interface Site {
  id: string;
  name: string;
  config: Record<string, unknown>;
  slug?: string;
  template?: string;
  created_at?: string;
  user_id?: string;
}

export const siteService = {
  createSite: async (payload: Partial<Site>) => {
    return await supabase
      .from("sites")
      .insert(payload)
      .select()         // ⬅️ baris lengkap kembali (termasuk id!)
      .single()
  },
  getSiteById: async (id: string) => {
    return await supabase.from("sites").select("*").eq("id", id).single()
  },

  updateConfig: async (id: string, config: Record<string, unknown>) => {
    return await supabase.from("sites").update({ config }).eq("id", id)
  },

  getSitesByUser: async (userId: string) => {
    return await supabase
      .from("sites")
      .select("id, name, slug, template, created_at")   // ⬅️ pastikan id ikut
      .eq("user_id", userId)
  }
}
