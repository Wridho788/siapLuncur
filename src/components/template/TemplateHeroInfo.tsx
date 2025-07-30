import Image from "next/image";

type Template = {
  image: string;
  name: string;
  category?: string;
  desc?: string;
};

export default function TemplateHeroInfo({ template }: { template: Template }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <Image src={template.image} alt={template.name} width={120} height={80} className="rounded-xl border border-border object-cover" />
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold text-primary font-heading mb-1">{template.name}</h1>
        <div className="text-sm text-muted-foreground mb-2">{template.category || "Template"}</div>
        <p className="text-base text-muted-foreground">{template.desc}</p>
      </div>
    </div>
  );
}
