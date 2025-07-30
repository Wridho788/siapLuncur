import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TemplateCardProps {
  name: string;
  desc: string;
  image: string;
  onSelect: () => void;
  loading?: boolean;
  onPreview?: () => void;
}

export default function TemplateCard({ name, desc, image, onSelect, loading, onPreview }: TemplateCardProps) {
  return (
    <div className="bg-background rounded-xl shadow-md border border-border p-4 flex flex-col items-center gap-3 transition-all hover:shadow-lg min-w-[220px] w-full max-w-xs">
      <div className="w-full flex justify-center relative group">
        <Image src={image} alt={name} width={220} height={120} className="rounded-lg border border-muted w-full h-auto object-cover" />
        {onPreview && (
          <button
            className="absolute bottom-2 right-2 bg-white/80 text-xs px-3 py-1 rounded shadow hover:bg-primary hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            type="button"
          >
            Preview
          </button>
        )}
      </div>
      <div className="font-bold text-primary text-lg text-center mt-2">{name}</div>
      <div className="text-sm text-muted-foreground text-center mb-2">{desc}</div>
      <Button className="w-full py-3 text-base min-h-[44px] mt-2" onClick={onSelect} disabled={loading}>
        {loading ? "Memproses..." : "Pilih Template Ini"}
      </Button>
      <Button
        variant="outline"
        className="w-full mt-1 flex items-center justify-center gap-2"
        onClick={onPreview}
        type="button"
      >
        <Eye size={18} /> Lihat Detail
      </Button>
    </div>
  );
}
