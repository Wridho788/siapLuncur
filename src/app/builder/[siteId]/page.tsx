"use client"

import { useEffect, useState } from "react"
import { siteService, Site } from "@/api/site"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useParams } from "next/navigation"

interface Feature {
  icon: string
  title: string
  desc: string
}

export default function BuilderPage() {
  const params = useParams();
  const siteId = params.id as string;
  const [site, setSite] = useState<Site | null>(null)
  const [heroTitle, setHeroTitle] = useState("")
  const [heroDescription, setHeroDescription] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [features, setFeatures] = useState<Feature[]>([])
  const [waNumber, setWaNumber] = useState("")
  const [waMessage, setWaMessage] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSite = async () => {
      const { data } = await siteService.getSiteById(siteId)
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
    }
    fetchSite()
  }, [siteId])

  const handleSave = async () => {
    if (!heroTitle.trim()) {
      toast.warning("Judul hero tidak boleh kosong!")
      return
    }
    if (features.length < 1) {
      toast.warning("Minimal 1 fitur harus diisi!")
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

    const { error } = await siteService.updateConfig(siteId, newConfig)
    setSaving(false)

    if (!error) toast.success("Berhasil disimpan!")
    else toast.error("Gagal menyimpan")
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

  if (!site) return <div className="p-8">Memuat data halaman...</div>

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-heading text-primary">Editor Halaman: {site.name}</h1>

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

      <hr />
      <h2 className="text-xl font-semibold">Fitur</h2>
      {features.map((feat, i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <Input placeholder="Icon (emoji)" value={feat.icon} onChange={(e) => updateFeature(i, "icon", e.target.value)} />
          <Input placeholder="Judul" value={feat.title} onChange={(e) => updateFeature(i, "title", e.target.value)} />
          <Textarea placeholder="Deskripsi" value={feat.desc} onChange={(e) => updateFeature(i, "desc", e.target.value)} />
          <Button variant="destructive" size="sm" onClick={() => removeFeature(i)}>Hapus</Button>
        </div>
      ))}
      <Button variant="outline" onClick={addFeature}>➕ Tambah Fitur</Button>

      <hr />
      <h2 className="text-xl font-semibold">CTA WhatsApp</h2>
      <Input placeholder="Nomor WhatsApp (628xxx)" value={waNumber} onChange={(e) => setWaNumber(e.target.value)} />
      <Textarea placeholder="Pesan default" value={waMessage} onChange={(e) => setWaMessage(e.target.value)} />

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Menyimpan..." : "💾 Simpan Perubahan"}
      </Button>
    </div>
  )
}