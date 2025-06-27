"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@store/authStore"

export default function DashboardPage() {
  const { user, checkSession } = useAuth()
  const router = useRouter()

  useEffect(() => {
    checkSession().then(() => {
      if (!user) router.push("/auth/login")
    })
  }, [])

  return <div>Halaman Dashboard</div>
}
