"use client"

import { useEffect, useState } from "react"
import { siteService, Site } from "@/api/site"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { templates } from "@/api/templates"
import Image from "next/image"

interface Feature {
  icon: string
  title: string
  desc: string
}

export default function BuilderPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [site, setSite] = useState<Site | null>(null)
  const [heroTitle, setHeroTitle] = useState("")
  const [heroDescription, setHeroDescription] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [features, setFeatures] = useState<Feature[]>([])
  const [waNumber, setWaNumber] = useState("")
  const [waMessage, setWaMessage] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!siteId || typeof siteId !== "string" || siteId === "undefined") {
      console.debug("[DEBUG] BuilderPage: siteId tidak valid", siteId);
      return;
    }
    console.debug("[DEBUG] BuilderPage: siteId", siteId);
    const fetchSite = async () => {
      try {
        const { data, error } = await siteService.getSiteById(siteId);
        console.debug("[DEBUG] BuilderPage: fetched site data", data, error);
        if (error) {
          console.error("[DEBUG] BuilderPage: error fetch site", error);
        }
        if (data) {
          setSite(data)
          const config = data.config || {}
          setHeroTitle(config.hero?.title || "")
          setHeroDescription(config.hero?.description || "")
          setButtonText(config.hero?.buttonText || "")
          setFeatures(config.features || [])
          setWaNumber(config.cta?.whatsapp || "")
          setWaMessage(config.cta?.message || "")
        }
      } catch (err) {
        console.error("[DEBUG] BuilderPage: fetchSite exception", err);
      }
    }
    fetchSite()
  }, [siteId])

  const handleSave = async () => {
    console.debug("[DEBUG] BuilderPage: handleSave called");
    if (!heroTitle.trim()) {
      toast.warning("Judul hero tidak boleh kosong!")
      console.debug("[DEBUG] BuilderPage: heroTitle kosong");
      return
    }
    if (features.length < 1) {
      toast.warning("Minimal 1 fitur harus diisi!")
      console.debug("[DEBUG] BuilderPage: features kosong", features);
      return
    }
    setSaving(true)
    const newConfig = {
      ...site?.config,
      hero: {
        title: heroTitle,
        description: heroDescription,
        buttonText: buttonText,
      },
      features,
      cta: {
        whatsapp: waNumber,
        message: waMessage,
      }
    }
    console.debug("[DEBUG] BuilderPage: updateConfig", { siteId, newConfig, site });
    try {
      const result = await siteService.updateConfig(siteId, newConfig);
      console.debug("[DEBUG] BuilderPage: updateConfig result", result);
      setSaving(false)
      if (!result.error) {
        toast.success("Berhasil disimpan!")
        console.debug("[DEBUG] BuilderPage: updateConfig success");
        // Redirect ke halaman preview setelah berhasil simpan
        window.location.href = `/preview/${siteId}`;
      } else {
        toast.error("Gagal menyimpan")
        console.error("[DEBUG] BuilderPage: updateConfig error", result.error);
      }
    } catch (err) {
      setSaving(false);
      toast.error("Gagal menyimpan (exception)");
      console.error("[DEBUG] BuilderPage: updateConfig exception", err);
    }
  }

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...features]
    newFeatures[index][field] = value
    setFeatures(newFeatures)
  }

  const addFeature = () => {
    setFeatures([...features, { icon: "", title: "", desc: "" }])
  }

  const removeFeature = (index: number) => {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  // Cari template yang dipilih
  const selectedTemplate = templates.find(t => t.id === site?.template);

  if (!site) {
    console.debug("[DEBUG] BuilderPage: site state is null, menampilkan 'Memuat data halaman...'");
    return <div className="p-8">Memuat data halaman...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 bg-white/80 rounded-2xl shadow-2xl border border-border mt-8 mb-12 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        {selectedTemplate && (
          <Image src={selectedTemplate.image} alt={selectedTemplate.name} width={80} height={80} className="w-20 h-20 rounded-xl shadow border border-border object-cover" />
        )}
        <div>
          <h1 className="text-3xl font-extrabold text-primary font-heading leading-tight mb-1">{site.name}</h1>
          {selectedTemplate && (
            <div className="text-base text-muted-foreground font-semibold flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{selectedTemplate.name}</span>
              <span className="text-xs text-muted-foreground">{selectedTemplate.desc}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Judul Hero</label>
        <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Deskripsi Hero</label>
        <Textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Teks Tombol</label>
        <Input value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
      </div>

      <hr className="my-6 border-border" />
      <h2 className="text-xl font-bold text-primary mb-2">Fitur Produk / Layanan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feat, i) => (
          <div key={i} className="border border-border bg-muted/40 p-4 rounded-xl shadow-sm space-y-2 flex flex-col animate-fade-in">
            <Input placeholder="Icon (emoji)" value={feat.icon} onChange={(e) => updateFeature(i, "icon", e.target.value)} />
            <Input placeholder="Judul" value={feat.title} onChange={(e) => updateFeature(i, "title", e.target.value)} />
            <Textarea placeholder="Deskripsi" value={feat.desc} onChange={(e) => updateFeature(i, "desc", e.target.value)} />
            <Button variant="destructive" size="sm" onClick={() => removeFeature(i)} className="self-end mt-2">Hapus</Button>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={addFeature} className="mt-4">➕ Tambah Fitur</Button>
      <hr className="my-6 border-border" />
      <h2 className="text-xl font-bold text-primary mb-2">CTA WhatsApp</h2>
      <Input placeholder="Nomor WhatsApp (628xxx)" value={waNumber} onChange={(e) => setWaNumber(e.target.value)} />
      <Textarea placeholder="Pesan default" value={waMessage} onChange={(e) => setWaMessage(e.target.value)} />
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={saving} className="px-8 py-2 text-lg font-bold shadow-md bg-primary text-primary-foreground hover:scale-105 transition-all">
          {saving ? "Menyimpan..." : "💾 Simpan Perubahan"}
        </Button>
      </div>
    </div>
  )
}