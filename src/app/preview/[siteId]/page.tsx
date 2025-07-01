"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { siteService, Site } from "@/api/site";
import { templates } from "@/api/templates";
import { toast } from "sonner";
import Image from "next/image";

export default function SitePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId) return;
    siteService.getSiteById(siteId).then(({ data }) => {
      setSite(data);
      setLoading(false);
    });
  }, [siteId]);

  const handlePublish = async () => {
    if (!site) return;
    // 1. Pastikan slug valid
    const slug = site.slug?.trim();
    if (!slug || !/^[a-z0-9\-]+$/.test(slug)) {
      toast.error("Slug tidak valid. Gunakan huruf kecil, angka, dan tanda minus saja.");
      return;
    }
    // 2. Cek slug unik
    const { data: existing } = await siteService.getSitesByUser(site.user_id!);
    if (existing && Array.isArray(existing)) {
      const duplicate = existing.find((s: { id: string; slug: string }) => s.slug === slug && s.id !== site.id);
      if (duplicate) {
        toast.error("Slug sudah digunakan. Pilih slug lain.");
        return;
      }
    }
    // 3. Update is_published
    const { error } = await siteService.publishSite(site.id);
    if (error) {
      toast.error("Gagal publish halaman");
      return;
    }
    toast.success("Halaman berhasil dipublish!");
    // 4. Redirect ke public view
    router.push(`/p/${slug}`);
  };

  if (loading) return <div className="p-8">Memuat preview halaman...</div>;
  if (!site) return <div className="p-8 text-red-600">Site tidak ditemukan.</div>;

  const config = (site.config || {}) as {
    hero?: { title?: string; description?: string; buttonText?: string };
    features?: { icon: string; title: string; desc: string }[];
    cta?: { whatsapp?: string; message?: string };
  };
  const hero = config.hero || {};
  const features = Array.isArray(config.features) ? config.features : [];
  const cta = config.cta || {};
  const selectedTemplate = templates.find(t => t.id === site.template);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-background/90 rounded-2xl shadow-xl border border-border p-8 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          {selectedTemplate && (
            <Image src={selectedTemplate.image} alt={selectedTemplate.name} width={64} height={64} className="w-16 h-16 rounded-lg border object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-primary mb-1">{site.name}</h1>
            <div className="text-xs text-muted-foreground">{selectedTemplate?.name}</div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{hero.title}</h2>
          <p className="mb-2 text-muted-foreground">{hero.description}</p>
          {hero.buttonText && (
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-bold shadow hover:scale-105 transition-all">
              {hero.buttonText}
            </button>
          )}
        </div>
        <div>
          <h3 className="font-bold mb-2">Fitur Produk / Layanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.filter((f) => f.title || f.desc).map((feat, i) => (
              <div key={i} className="border border-border bg-muted/40 p-4 rounded-xl shadow-sm flex flex-col gap-1">
                <div className="text-2xl">{feat.icon}</div>
                <div className="font-semibold">{feat.title}</div>
                <div className="text-sm text-muted-foreground">{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Kontak WhatsApp</h3>
          <div className="flex items-center gap-2">
            <span className="font-mono">{cta.whatsapp}</span>
            {cta.message && <span className="text-muted-foreground">Pesan: {cta.message}</span>}
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="text-primary underline" onClick={() => router.back()}>&larr; Kembali ke Editor</button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow transition-all" onClick={handlePublish}>
            🚀 Publish Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
