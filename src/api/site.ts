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
  },

  publishSite: async (id: string) => {
    // Update kolom is_published dan updated_at
    const { data, error } = await supabase
      .from("sites")
      .update({ is_published: true, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("slug")  // ambil slug untuk redirect

    return { data: data?.[0], error }
  },

  getSiteBySlug: async (slug: string) => {
    return await supabase.from("sites").select("*").eq("slug", slug).eq("is_published", true).single();
  },

}
