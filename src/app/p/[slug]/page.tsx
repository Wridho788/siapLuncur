"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { siteService, Site } from "@/api/site";
import { templates } from "@/api/templates";

export default function PublicSitePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await siteService.getSiteBySlug(slug);
      setSite(data);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="p-8">Memuat halaman publik...</div>;
  if (!site ) return <div className="p-8 text-red-600">Halaman tidak ditemukan atau belum dipublish.</div>;

  const config = (site.config || {}) as any;
  const hero = config.hero || {};   
  const features = Array.isArray(config.features) ? config.features : [];
  const cta = config.cta || {};
  const selectedTemplate = templates.find(t => t.id === site.template);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-background/90 rounded-2xl shadow-xl border border-border p-8 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          {selectedTemplate && (
            <img src={selectedTemplate.image} alt={selectedTemplate.name} className="w-16 h-16 rounded-lg border object-cover" />
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
            <a href={`https://wa.me/${cta.whatsapp}?text=${encodeURIComponent(cta.message || "")}`} target="_blank" rel="noopener noreferrer">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-bold shadow hover:scale-105 transition-all">
                {hero.buttonText}
              </button>
            </a>
          )}
        </div>
        <div>
          <h3 className="font-bold mb-2">Fitur Produk / Layanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.filter((f:any) => f.title || f.desc).map((feat:any, i:number) => (
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
      </div>
    </div>
  );
}
