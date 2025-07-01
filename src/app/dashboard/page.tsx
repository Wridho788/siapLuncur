export const dynamic = "force-dynamic"

"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@store/authStore"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import SiteCard from "@/components/SiteCard"
import { useUserSites } from "@/hooks/useUserSites";


async function createSite(site: { user_id: string; slug: string; template: string; name: string }) {
  // Simulasi insert ke Supabase
  const { data, error } = await supabase.from("sites").insert([{ ...site, id: uuidv4() }])
  if (error) throw error
  return data
}

export default function DashboardPage() {
  const { user, checkSession } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ slug: "", template: "default", name: "" })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkSession();
    if (!user) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Gunakan React Query untuk sites
  const { data: sites = [], isLoading: loading, refetch } = useUserSites(user?.id);

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      if (!user) {
        setError("User tidak ditemukan. Silakan login ulang.");
        setCreating(false);
        return;
      }
      await createSite({
        user_id: user.id,
        slug: form.slug,
        template: form.template,
        name: form.name,
      })
      setForm({ slug: "", template: "default", name: "" })
      await refetch();
    } catch (err: unknown) {
      setError((err as Error).message || "Gagal membuat halaman")
    } finally {
      setCreating(false)
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-100 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-background/90 rounded-2xl shadow-xl border border-border p-0 flex flex-col gap-0">
          <div className="flex flex-row items-center gap-3 border-b border-border pb-4 pt-6 px-8 bg-gradient-to-r from-white via-cyan-100 to-blue-100 rounded-t-2xl">
            <Image src="/logo_hero.png" alt="SiapLuncur Logo" width={120} height={32} className="h-8 w-auto" />
            <span className="ml-2 bg-cyan-600 text-white text-xs font-semibold rounded px-2 py-0.5">Dashboard</span>
            <div className="flex-1" />
            <Link href="/onboarding">
              <Button variant="default" className="ml-auto">
                ➕ Buat Halaman Baru
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-6 pt-6 pb-8 px-8">
            <div className="text-2xl font-extrabold text-primary mb-1">Selamat datang{user?.email ? `, ${user.email}` : ""}!</div>
            <p className="text-muted-foreground text-base mb-4">Kelola halaman promosi usahamu dengan mudah. Semua fitur siap pakai, tanpa ribet!</p>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">Memuat data…</div>
            )}

            {/* Empty State: Form Buat Site */}
            {!loading && sites.length === 0 && (
              <form onSubmit={handleCreateSite} className="flex flex-col items-center justify-center py-10 w-full max-w-md mx-auto gap-4">
                <Image src="/hero.png" alt="Empty State" width={180} height={120} className="mb-4 opacity-80" />
                <div className="text-lg font-semibold text-primary mb-2">Buat Halaman Promosi Usaha</div>
                <div className="w-full flex flex-col gap-3">
                  <input
                    className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    placeholder="Nama Usaha"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <input
                    className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    placeholder="Alamat URL (slug)"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    required
                  />
                  <select
                    className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    value={form.template}
                    onChange={e => setForm(f => ({ ...f, template: e.target.value }))}
                  >
                    <option value="default">Template Default</option>
                    <option value="modern">Template Modern</option>
                    <option value="simple">Template Simple</option>
                  </select>
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <Button size="lg" type="submit" className="bg-cyan-600 text-white font-semibold shadow hover:scale-105 transition-all w-full mt-2" disabled={creating}>
                  {creating ? "Membuat..." : "🚀 Buat Halaman Saya"}
                </Button>
              </form>
            )}

            {/* List Site User */}
            {!loading && sites.length > 0 && (
              <div className="flex flex-col gap-4">
                {sites.map((site) => (
                  <SiteCard key={site.id} site={site} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
