"use client"

// File: src/app/page.tsx

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"

export default function LandingPage() {
  const fiturRef = useRef<HTMLDivElement>(null);

  const scrollToFitur = () => {
    fiturRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground font-sans">
      {/* Header */}
      <header className="w-full px-8 py-5 flex justify-between items-center border-b border-border bg-opacity-80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Image src="/logo_hero.png" alt="SiapLuncur Logo" width={160} height={40} priority className="h-10 w-auto" />
          <span className="text-xs bg-primary text-background rounded px-2 py-0.5 font-semibold animate-pulse">Beta</span>
          <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5 font-semibold ml-2">Gratis Selamanya</span>
        </div>
        <div className="space-x-2">
          <Link href="/auth/login">
            <Button variant="outline" className="transition-all hover:scale-105">Masuk</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="transition-all hover:scale-105">Daftar Gratis</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 text-center md:text-left space-y-8 md:space-y-0 md:space-x-12 mt-8 mb-4">
        <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl text-primary drop-shadow-lg">
            Mudahnya Promosi Online untuk Usaha Kecilmu
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Bingung cara promosi di internet? <span className="text-primary font-semibold">SiapLuncur</span> bantu UMKM seperti Anda tampil keren di dunia digital. Cukup isi nama usaha & WhatsApp, halaman promosi langsung jadi. Tanpa ribet, tanpa biaya, tanpa perlu paham teknologi!
          </p>
          <div className="space-x-4">
            <Link href="/auth/register">
              <Button size="lg" className="shadow-lg transition-all hover:scale-105 hover:bg-primary/90">Coba Gratis Sekarang</Button>
            </Link>
            <Button variant="outline" size="lg" className="transition-all hover:scale-105" onClick={scrollToFitur}>
              Lihat Fitur
            </Button>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Tanpa Kartu Kredit</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Cukup Nama & WhatsApp</span>
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">Bisa Edit Kapan Saja</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
          <Image src="/hero.png" alt="Ilustrasi UMKM SiapLuncur" width={420} height={320} className="w-full max-w-md h-auto rounded-2xl shadow-xl border border-border bg-white" priority />
        </div>
      </main>

      {/* Features Section */}
      <section id="fitur" ref={fiturRef} className="px-6 py-16 bg-muted/60">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {[
            {
              title: "🎨 Template Siap Pakai & Mobile Friendly",
              desc: (
                <>
                  Pilih dari berbagai desain modern untuk usaha kamu—tanpa ribet desain sendiri.<br />
                  <span className="text-muted-foreground text-xs">Cocok untuk katalog produk, jasa, atau profil usaha. Sudah optimal untuk tampilan di HP dan cepat diakses.</span>
                </>
              )
            },
            {
              title: "🧱 Builder Tanpa Coding",
              desc: (
                <>
                  Edit teks, gambar, dan warna langsung dari dashboard—cukup klik dan ketik.<br />
                  <span className="text-muted-foreground text-xs">Tidak perlu install apa pun atau belajar IT. Bisa preview sebelum dipublikasikan.</span>
                </>
              )
            },
            {
              title: "📱 Terhubung ke WhatsApp",
              desc: (
                <>
                  Pengunjung bisa langsung chat ke WhatsApp kamu—bikin pelanggan makin mudah tanya & order.<br />
                  <span className="text-muted-foreground text-xs">Tombol CTA langsung ke nomor WhatsApp kamu. Bisa disetting pesan otomatis saat diklik.</span>
                </>
              )
            }
          ].map((item, i) => (
            <div key={i} className="bg-background rounded-2xl shadow-md p-7 flex flex-col items-center transition-all hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-lg font-bold mb-2 text-primary text-center">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-center">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-background border border-dashed border-primary/40 rounded-xl p-6 text-center">
            <div className="font-bold mb-2 text-primary">🎁 Bonus (Soft Feature v1)</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ URL Publik Instan <span className="text-xs">(misal: siapluncur.id/tokobunda)</span></li>
              <li>✅ 1 Halaman Gratis untuk setiap user</li>
              <li>✅ Tanpa perlu domain & hosting pribadi</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-6 py-12 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-xl font-bold text-center mb-8 text-primary">Apa Kata Pengguna?</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Budi, Pemilik Toko Kue",
                text: "Baru 10 menit landing page saya sudah online! Praktis dan tampilannya keren.",
                avatar: "🍰"
              },
              {
                name: "Sari, Jasa Laundry",
                text: "Gak perlu pusing soal teknis, pelanggan langsung bisa chat ke WhatsApp saya.",
                avatar: "🧺"
              },
              {
                name: "Andi, UMKM Fashion",
                text: "Bisa custom domain sendiri, bisnis saya jadi makin dipercaya pelanggan.",
                avatar: "👕"
              }
            ].map((t, i) => (
              <div key={i} className="bg-muted rounded-xl p-5 shadow flex flex-col items-center text-center border border-border">
                <div className="text-2xl mb-2">{t.avatar}</div>
                <p className="text-sm mb-2 italic">&quot;{t.text}&quot;</p>
                <span className="text-xs text-muted-foreground font-medium">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-12 bg-gradient-to-r from-primary/90 to-blue-500/80 text-background text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold">Siap mulai onlinekan usahamu?</h3>
          <p className="text-lg">Daftar gratis sekarang, landing page langsung aktif tanpa ribet!</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="shadow-lg transition-all hover:scale-105">Daftar Gratis</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-8 border-t border-border bg-background/80">
        © {new Date().getFullYear()} SiapLuncur. Dibuat dengan <span className="text-pink-500">❤️</span> oleh Ravatech.
      </footer>
    </div>
  )
}
