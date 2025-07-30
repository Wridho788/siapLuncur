interface Template {
  preview?: string;
  image?: string;
  name: string;
}

export default function LivePreview({ template }: { template: Template }) {
  // Untuk demo, tampilkan gambar preview. Bisa diganti iframe atau komponen readonly builder.
  return (
    <div className="w-full flex justify-center items-center bg-muted rounded-xl border border-border p-4 min-h-[300px]">
      <img src={template.preview || template.image} alt={template.name} className="rounded-xl shadow max-w-full h-auto" style={{ maxHeight: 400 }} />
    </div>
  );
}
