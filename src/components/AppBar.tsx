"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";

export default function AppBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
    setIsMobileMenuOpen(false);
  };

  // Handle scroll untuk collapse effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full px-4 sm:px-8 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-20 transition-all duration-300 ${
      isScrolled ? 'py-2 shadow-md' : 'py-3'
    }`}>
    <>
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Image 
              src="/logo_hero.png" 
              alt="SiapLuncur Logo" 
              width={isScrolled ? 100 : 120} 
              height={isScrolled ? 24 : 32} 
              priority 
              className={`h-auto w-auto transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`} 
            />
          </Link>
          <div className={`flex gap-1 transition-all duration-300 ${isScrolled ? 'scale-90' : ''}`}>
            <span className="text-[10px] bg-primary text-black rounded-full px-2 py-0.5 font-semibold animate-pulse">Beta</span>
            <span className="text-[10px] bg-green-500 text-white rounded-full px-2 py-0.5 font-semibold">Free</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
              <User size={14} className="text-primary" />
              <span className="text-xs font-medium truncate max-w-20">{user.email?.split('@')[0]}</span>
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-5 space-y-4">
            {!user ? (
              <>
                {/* Header untuk guest user */}
                <div className="text-center pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">Mulai Sekarang!</h3>
                  <p className="text-sm text-gray-500 mt-1">Buat website usaha kamu dalam hitungan menit</p>
                </div>
                
                {/* Tombol Daftar Gratis - Primary CTA */}
                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">🚀 Daftar Gratis</span>
                        <p className="text-xs opacity-90 mt-1">Tanpa kartu kredit</p>
                      </div>
                      <div className="text-2xl">→</div>
                    </div>
                  </div>
                </Link>
                
                {/* Tombol Masuk - Secondary */}
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-semibold">Sudah punya akun? Masuk</span>
                      <span className="text-xl">👋</span>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/* Header untuk logged in user */}
                <div className="text-center pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">Halo! 👋</h3>
                  <p className="text-sm text-gray-500 mt-1">Kelola website usaha kamu</p>
                </div>
                
                {/* Tombol Dashboard */}
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">📊 Dashboard</span>
                        <p className="text-xs opacity-90 mt-1">Kelola website kamu</p>
                      </div>
                      <div className="text-2xl">→</div>
                    </div>
                  </div>
                </Link>
                
                {/* Tombol Logout */}
                <button 
                  onClick={handleLogout}
                  className="w-full border-2 border-red-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between text-red-600">
                    <span className="font-semibold">Keluar</span>
                    <span className="text-xl">👋</span>
                  </div>
                </button>
              </>
            )}
            
            {/* Footer info */}
            <div className="pt-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                ✨ <span className="font-medium">Gratis selamanya</span> untuk 1 website
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo_hero.png" alt="SiapLuncur Logo" width={140} height={36} priority className="h-9 w-auto" />
          </Link>
          <div className="flex gap-2">
            <span className="text-xs bg-primary text-white rounded px-3 py-1 font-semibold animate-pulse">Beta</span>
            <span className="text-xs bg-green-500 text-white rounded px-3 py-1 font-semibold">Gratis Selamanya</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/auth/login">
                <button className="px-5 py-2 border border-primary text-primary rounded-lg transition-all hover:bg-primary hover:text-white font-semibold">
                  Masuk
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-5 py-2 bg-primary text-white rounded-lg transition-all hover:bg-primary/90 font-semibold">
                  Daftar Gratis
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 bg-muted rounded-lg px-4 py-2">
                <User size={16} className="text-primary" />
                <span className="font-medium text-primary">{user.email}</span>
              </div>
              <Link href="/dashboard">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 font-semibold">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 border border-red-500 text-red-600 rounded-lg transition-all hover:bg-red-600 hover:text-white font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
    </header>
  );
}
