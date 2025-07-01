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
        const { register } = await import("@/api/auth").then((m) => ({ register: m.authService.register }));
        const { error: regErr } = await register(email, password);
        if (regErr) throw regErr;
        setSuccess("Registrasi berhasil! Login otomatis...");
        // Tangkap hasil response login setelah register
        const loginResult = await login(email, password);
        console.debug("[DEBUG] Login response after register:", loginResult);
        // Ambil access_token jika ada
        const accessToken = loginResult?.data?.session?.access_token;
        console.debug("[DEBUG] Access Token after register:", accessToken);
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
    <div className="space-y-6 w-full max-w-sm mx-auto">
      <h1 className="font-heading text-2xl text-center text-primary mb-2">
        {mode === "login" ? "Masuk" : "Daftar"}
      </h1>
      {error && (
        <div className="flex items-center justify-center">
          <span className="text-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2 w-full text-center">
            {error}
          </span>
        </div>
      )}
      {success && (
        <div className="flex items-center justify-center">
          <span className="text-sm text-green-700 border border-green-200 bg-green-50 rounded px-3 py-2 w-full text-center">
            {success}
          </span>
        </div>
      )}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="email">Email</label>
        <Input
          id="email"
          placeholder="Masukkan email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
        />
      </div>
      <div className="space-y-3 relative">
        <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="password">Password</label>
        <Input
          id="password"
          placeholder="Masukkan password"
          type={showPassword ? "text" : "password"}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all pr-10"
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-8 text-muted-foreground hover:text-primary focus:outline-none"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <Button className="w-full mt-2 shadow-sm hover:shadow-md transition-all" onClick={handleSubmit} disabled={loading}>
        {loading ? "Memproses…" : mode === "login" ? "Masuk" : "Daftar"}
      </Button>
    </div>
  )
}