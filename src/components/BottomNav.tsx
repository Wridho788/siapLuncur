import Link from "next/link";
import { Home, FileText, Settings, PlusCircle } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-background/95 border-t border-border flex justify-around items-center py-2 shadow-xl sm:hidden">
      <Link href="/dashboard" className="flex flex-col items-center text-xs text-primary">
        <Home size={24} />
        <span>Dashboard</span>
      </Link>
      <Link href="/sites" className="flex flex-col items-center text-xs text-primary">
        <FileText size={24} />
        <span>Halaman Saya</span>
      </Link>
      <Link href="/settings" className="flex flex-col items-center text-xs text-primary">
        <Settings size={24} />
        <span>Pengaturan</span>
      </Link>
      <Link href="/onboarding" className="flex flex-col items-center text-xs text-white bg-accent rounded-full px-4 py-2 -mt-6 shadow-lg">
        <PlusCircle size={28} />
        <span className="font-bold">Buat</span>
      </Link>
    </nav>
  );
}
