
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
  console.log("Checking for token:", token);
  if (token) {
    console.log("Token found, redirecting to dashboard...");
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <AuthForm mode="login" />
    </div>
  )
}
