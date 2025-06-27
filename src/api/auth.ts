import { supabase } from "@/lib/supabase"

export const authService = {
  register: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  },
  login: async (email: string, password: string) => {
    console.log("🌐 API: Calling Supabase login...", { email });
    const result = await supabase.auth.signInWithPassword({ email, password });
    console.log("📡 Supabase response:", { 
      user: result.data?.user?.email, 
      session: !!result.data?.session,
      error: result.error 
    });
    return result;
  },
  logout: async () => {
    return await supabase.auth.signOut()
  },
  getSession: async () => {
    return await supabase.auth.getSession()
  },
}
