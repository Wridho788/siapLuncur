import { create } from "zustand"
import { User } from "@supabase/supabase-js"
import { authService } from "@/api/auth"

type AuthStore = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    console.log("🔄 AuthStore: Starting login...", { email });
    set({ loading: true });
    const { data, error } = await authService.login(email, password);
    console.log("📤 AuthService response:", { data: data?.user?.email, error });
    set({ loading: false, user: data?.user || null });
    if (error) {
      console.error("❌ AuthStore: Login failed:", error);
      throw error;
    }
    console.log("✅ AuthStore: Login successful, user set:", data?.user?.email);
  },

  logout: async () => {
    await authService.logout()
    set({ user: null })
  },

  checkSession: async () => {
    const { data } = await authService.getSession()
    set({ user: data.session?.user || null })
  },
}))
