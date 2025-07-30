import TemplateHeroInfo from "@/components/template/TemplateHeroInfo";
import LivePreview from "@/components/template/LivePreview";
import UseTemplateButton from "@/components/template/UseTemplateButton";
import { templates } from "@/api/templates";
import { notFound } from "next/navigation";

export default async function TemplatePreviewPage({ 
  params 
}: { 
  params: Promise<{ templateId: string }> 
}) {
  const { templateId } = await params;
  const template = templates.find(t => t.id === templateId);
  if (!template) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-3xl bg-background/90 rounded-2xl shadow-xl border border-border p-8 flex flex-col gap-8 animate-fade-in">
        <TemplateHeroInfo template={template} />
        <LivePreview template={template} />
        <UseTemplateButton template={template} />
      </div>
    </div>
  );
}
