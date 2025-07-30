import AuthForm from "@/components/AuthForm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Daftar | SiapLuncur",
}

export default async function RegisterPage() {
  // Redirect user if already logged in
  const cookieStore = await cookies();
  const token = cookieStore.get("sb‑access‑token")?.value
  if (token) redirect("/dashboard")
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
          <p className="text-gray-600 text-sm mb-4">Mulai promosi usaha Anda secara online</p>
        </div>
        
        {/* Benefits */}
        <div className="w-full bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm">Yang Anda dapatkan:</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              1 halaman promosi gratis selamanya
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Tanpa kartu kredit atau biaya tersembunyi
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Edit & publish kapan saja
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Integrasi WhatsApp otomatis
            </li>
          </ul>
        </div>
        
        <AuthForm mode="register" />
        
        <div className="text-sm text-gray-600 text-center">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Masuk di sini
          </Link>
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4">
          © {new Date().getFullYear()} SiapLuncur. Dibuat dengan ❤️ oleh Ravatech.
        </div>
      </div>
    </div>
  )
}
