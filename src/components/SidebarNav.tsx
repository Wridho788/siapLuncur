import Link from "next/link";
import { Home, FileText, Settings, PlusCircle } from "lucide-react";

export default function SidebarNav() {
  return (
    <aside className="hidden md:flex flex-col bg-background border-r border-border w-20 py-6 px-2 min-h-screen items-center gap-6">
      <Link href="/dashboard" className="flex flex-col items-center text-xs text-primary hover:text-cyan-600">
        <Home size={28} />
        <span className="mt-1">Dashboard</span>
      </Link>
      <Link href="/sites" className="flex flex-col items-center text-xs text-primary hover:text-cyan-600">
        <FileText size={28} />
        <span className="mt-1">Halaman</span>
      </Link>
      <Link href="/settings" className="flex flex-col items-center text-xs text-primary hover:text-cyan-600">
        <Settings size={28} />
        <span className="mt-1">Pengaturan</span>
      </Link>
      <Link href="/onboarding" className="flex flex-col items-center text-xs text-white bg-accent rounded-full px-4 py-2 mt-4 shadow-lg">
        <PlusCircle size={32} />
        <span className="font-bold mt-1">Buat</span>
      </Link>
    </aside>
  );
}
