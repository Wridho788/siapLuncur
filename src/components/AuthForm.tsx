"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@store/authStore"
import { useRouter } from "next/navigation"

interface AuthFormProps {
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, loading, checkSession, session } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkSession();
    // hanya panggil sekali saat mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // redirect jika session valid
    if (session && typeof session.expires_at === "number" && session.expires_at > Math.floor(Date.now() / 1000)) {
      router.push("/dashboard");
    }
  }, [session, router])

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    console.log("🔄 Starting auth process...", { mode, email });
    try {
      if (mode === "login") {
        console.log("🔑 Attempting login...");
        // Tangkap hasil response login
        const loginResult = await login(email, password);
        console.debug("[DEBUG] Login response:", loginResult);
        // Ambil access_token jika ada
        const accessToken = loginResult?.data?.session?.access_token;
        console.debug("[DEBUG] Access Token:", accessToken);
        setSuccess("Login berhasil! Mengarahkan ke dashboard...");
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        // register then auto‑login
        console.log("📝 Attempting registration...");
        await useAuth.getState().logout(); // reset
        console.debug("[DEBUG] Logout state cleared before register");
        const { register } = await import("@/api/auth").then((m) => ({ register: m.authService.register }));
        console.debug("[DEBUG] Register function loaded");
        const { error: regErr, data: regData } = await register(email, password);
        console.debug("[DEBUG] Register response:", { regErr, regData });
        if (regErr) throw regErr;
        setSuccess("Registrasi berhasil! Login otomatis...");
        // Tangkap hasil response login setelah register
        console.log("🔑 Attempting auto-login after register...");
        const loginResult = await login(email, password);
        console.debug("[DEBUG] Login response after register:", loginResult);
        // Ambil access_token jika ada
        const accessToken = loginResult?.data?.session?.access_token;
        console.debug("[DEBUG] Access Token after register:", accessToken);
        if (loginResult?.data?.user) {
          console.log("✅ User aktif setelah register:", loginResult.data.user);
        } else {
          console.warn("⚠️ User belum aktif setelah register");
        }
        setSuccess("Login berhasil! Mengarahkan ke dashboard...");
        setTimeout(() => router.push("/dashboard"), 1000);
      }
    } catch (err: unknown) {
      console.error("❌ Auth error:", err);
      if (err instanceof Error) {
        setError(err.message ?? "Terjadi kesalahan");
      } else {
        setError("Terjadi kesalahan");
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={e => { e.preventDefault(); handleSubmit(); }}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full py-3 text-base min-h-[44px]"
        autoComplete="email"
        required
      />
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full py-3 text-base min-h-[44px] pr-10"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          onClick={() => setShowPassword(v => !v)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-1">{success}</div>}
      <Button
        type="submit"
        className="w-full py-3 text-base min-h-[44px] mt-2"
        disabled={loading}
      >
        {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
      </Button>
    </form>
  )
}