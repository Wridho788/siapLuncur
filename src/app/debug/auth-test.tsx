"use client"

import { useAuth } from "@store/authStore"
import { useEffect } from "react"

export default function AuthTest() {
  const { user, login, logout, loading, checkSession } = useAuth()

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <div className="p-4 space-y-4">
      <div>User: {user?.email ?? "Not Logged In"}</div>
      <button onClick={() => login("test@email.com", "12345678")}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
