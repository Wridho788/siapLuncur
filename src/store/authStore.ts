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
    set({ loading: true })
    const { data, error } = await authService.login(email, password)
    set({ loading: false, user: data?.user || null })
    if (error) throw error
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
