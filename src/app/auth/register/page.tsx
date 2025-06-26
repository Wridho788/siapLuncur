
import AuthForm from "@/components/AuthForm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const metadata = {
  title: "Daftar | SiapLuncur",
}

export default async function RegisterPage() {
  // Redirect user if already logged in
  const cookieStore = await cookies();
  const token = cookieStore.get("sb‑access‑token")?.value
  if (token) redirect("/dashboard")
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <AuthForm mode="register" />
    </div>
  )
}
