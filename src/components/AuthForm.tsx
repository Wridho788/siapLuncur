"use client"

import { useState } from "react"
import { Input } from "@ui/input"
import { Button } from "@ui/button"
import { useAuth } from "@store/authStore"
import { cn } from "@lib/utils"

interface AuthFormProps {
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, logout, loading, checkSession, user } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      if (mode === "login") {
        await login(email, password)
      } else {
        // register then auto‑login
        await useAuth.getState().logout() // reset
        const { register } = await import("@/api/auth").then((m) => ({ register: m.authService.register }))
        const { error: regErr } = await register(email, password)
        if (regErr) throw regErr
        await login(email, password)
      }
    } catch (err: any) {
      setError(err.message ?? "Terjadi kesalahan")
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