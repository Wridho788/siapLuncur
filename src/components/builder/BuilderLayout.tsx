import React from "react";

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 border border-border">
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">Edit Halaman UMKM Anda</h1>
        {children}
      </div>
    </div>
  );
}
