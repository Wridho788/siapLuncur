import { create } from "zustand"
import { User, Session } from "@supabase/supabase-js"
import { authService } from "@/api/auth"

type LoginResult = {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: unknown;
};

type AuthStore = {
  user: User | null
  session: Session | null
  loading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => Promise<void>
  checkSession: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: false,

  login: async (email, password) => {
    console.log("🔄 AuthStore: Starting login...", { email });
    set({ loading: true });
    const { data, error } = await authService.login(email, password);
    set({ loading: false, user: data?.user || null, session: data?.session || null });
    if (error) throw error;
    // Persist session ke localStorage
    if (data?.session) localStorage.setItem("session", JSON.stringify(data.session));
    return { data, error };
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, session: null });
    localStorage.removeItem("session");
  },

  checkSession: () => {
    const sessionStr = localStorage.getItem("session");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session.expires_at > Math.floor(Date.now() / 1000)) {
        set({ session, user: session.user });
      } else {
        set({ session: null, user: null });
        localStorage.removeItem("session");
      }
    }
  }
}))
