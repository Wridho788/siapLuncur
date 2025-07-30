"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authStore";
import { templates } from "@/api/templates";
import TemplateCard from "@/components/TemplateCard";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/ui/Modal";
import Image from "next/image";

export default function OnboardingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewTpl, setPreviewTpl] = useState<typeof templates[0] | null>(null);

  const handleSelect = async (templateId: string) => {
    if (!user) {
      setError("User tidak ditemukan. Silakan login ulang.");
      return;
    }
    setError(null);
    setLoadingId(templateId);
    try {
      // Generate slug dari nama user atau random
      const slug = user.email?.split("@")[0]?.toLowerCase().replace(/[^a-z0-9]/g, "-") || uuidv4().slice(0, 8);
      const name = user.email?.split("@")[0] || "My Site";
      const { data, error } = await supabase.from("sites").insert([
        {
          id: uuidv4(),
          user_id: user.id,
          slug,
          template: templateId,
          name,
        },
      ]).select();
      if (error) throw error;
      const siteId = data?.[0]?.id;
      if (!siteId) {
        setError("Gagal membuat site: ID tidak ditemukan. Silakan coba lagi.");
        return;
      }
      router.push(`/builder/${siteId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Gagal membuat site");
      } else {
        setError("Gagal membuat site");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handlePreview = (templateId: string) => {
    router.push(`/template/${templateId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-extrabold text-primary text-center mb-2">Pilih Template Halaman</h1>
        <p className="text-muted-foreground text-center mb-8">Pilih tampilan yang paling cocok untuk usaha kamu. Semua template bisa diedit nanti!</p>
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              name={tpl.name}
              desc={tpl.desc}
              image={tpl.image}
              onSelect={() => handleSelect(tpl.id)}
              loading={loadingId === tpl.id}
              onPreview={() => handlePreview(tpl.id)}
            />
          ))}
        </div>
      </div>
      {previewTpl && (
        <Modal onClose={() => setPreviewTpl(null)}>
          <div className="p-4 max-w-lg w-full">
            <Image src={previewTpl.image} alt={previewTpl.name} width={400} height={220} className="rounded-lg w-full mb-4" />
            <h2 className="text-xl font-bold mb-2">{previewTpl.name}</h2>
            <p className="mb-4 text-muted-foreground">{previewTpl.desc}</p>
            <div className="mb-2">
              <div className="font-semibold">Hero:</div>
              <div className="bg-muted rounded p-2 mb-2">{previewTpl.defaultBlocks.hero}</div>
              <div className="font-semibold">Features:</div>
              <div className="bg-muted rounded p-2 mb-2">{previewTpl.defaultBlocks.features}</div>
              <div className="font-semibold">Contact:</div>
              <div className="bg-muted rounded p-2">{previewTpl.defaultBlocks.contact}</div>
            </div>
            <button className="mt-4 w-full bg-primary text-white py-2 rounded" onClick={() => { 
              console.debug("[DEBUG] Pilih Template:", previewTpl);
              setPreviewTpl(null); 
              handleSelect(previewTpl.id); 
            }}>
              Pilih Template Ini
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
