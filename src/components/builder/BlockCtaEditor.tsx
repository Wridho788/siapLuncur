import React from "react";

export function BlockCtaEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-1">Kontak/CTA WhatsApp</label>
      <input
        className="w-full border rounded px-3 py-2 mb-2"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Tulis nomor WhatsApp atau call-to-action..."
      />
    </div>
  );
}
