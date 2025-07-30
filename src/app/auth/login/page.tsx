import Image from "next/image"
import AuthForm from "@/components/AuthForm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold text-sm"
      >
        ← Kembali ke Beranda
      </Link>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center gap-6">
        <Link href="/">
          <Image src="/logo_hero.png" alt="Logo SiapLuncur" width={140} height={40} className="mb-2" priority />
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h1>
          <p className="text-gray-600 text-sm">Masuk ke akun SiapLuncur Anda</p>
        </div>
        <AuthForm mode="login" />
        <div className="text-sm text-gray-600 text-center">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  )
}
