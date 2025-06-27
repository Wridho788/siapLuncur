"use client"

import { useState } from "react"
import { Input } from "@ui/input"
import { Button } from "@ui/button"
import { useAuth } from "@store/authStore"
import { useRouter } from "next/navigation"

interface AuthFormProps {
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    console.log("🔄 Starting auth process...", { mode, email });
    try {
      if (mode === "login") {
        console.log("🔑 Attempting login...");
        await login(email, password);
        console.log("✅ Login successful!");
        router.push("/dashboard");
      } else {
        // register then auto‑login
        console.log("📝 Attempting registration...");
        await useAuth.getState().logout(); // reset
        const { register } = await import("@/api/auth").then((m) => ({ register: m.authService.register }));
        const { error: regErr } = await register(email, password);
        if (regErr) throw regErr;
        console.log("✅ Registration successful, now logging in...");
        await login(email, password);
        console.log("✅ Auto-login successful!");
        router.push("/dashboard");
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
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <h1 className="font-heading text-2xl text-center text-primary">
        {mode === "login" ? "Masuk" : "Daftar"} SiapLuncur
      </h1>
      {error && (
        <p className="text-sm text-red-500 text-center border border-red-300 bg-red-50 rounded p-2">
          {error}
        </p>
      )}
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Memproses…" : mode === "login" ? "Masuk" : "Daftar"}
      </Button>
    </div>
  )
}