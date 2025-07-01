import Image from "next/image"
import AuthForm from "@/components/AuthForm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const metadata = {
  title: "Masuk | SiapLuncur",
}

export default async function LoginPage() {
  // Example server‑side redirect if already logged in (token in cookie)
  const cookieStore = await cookies();
  const token = cookieStore.get("sb‑access‑token")?.value;
  console.log('token:', cookieStore)
  if (token) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-blue-50 p-4">
      <div className="w-full max-w-md bg-background/90 rounded-2xl shadow-xl border border-border p-8 flex flex-col items-center gap-6">
        <Image src="/logo_hero.png" alt="Logo" width={140} height={40} className="mb-2" priority />
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
