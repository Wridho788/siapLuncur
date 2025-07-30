import { LogOut } from "lucide-react";

export default function Topbar({ email, onLogout }: { email: string; onLogout: () => void }) {
  return (
    <header className="hidden lg:flex w-full items-center justify-between px-8 py-4 bg-background border-b border-border shadow-sm z-10">
      <div className="flex items-center gap-3">
        <img src="/logo_hero.png" alt="Logo" width={120} height={32} className="h-8 w-auto" />
        <span className="text-xs bg-cyan-600 text-white font-semibold rounded px-2 py-0.5">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-primary font-semibold">{email}</span>
        <button onClick={onLogout} className="flex items-center gap-1 text-red-600 hover:underline">
          <LogOut size={18} /> Keluar
        </button>
      </div>
    </header>
  );
}
