import React from "react";

export function BlockFeaturesEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-1">Fitur/Keunggulan</label>
      <textarea
        className="w-full border rounded px-3 py-2 mb-2"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Tulis fitur atau keunggulan, pisahkan dengan koma atau baris baru..."
        rows={3}
      />
    </div>
  );
}
