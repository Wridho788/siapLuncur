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
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-[80vh] flex items-center">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                ✅ Gratis Selamanya
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                ⚡ Siap dalam 5 Menit
              </span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                📱 Mobile Friendly
              </span>
            </div>

            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
                Mudahnya Promosi Online untuk{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Usaha Kecilmu
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Bingung cara promosi di internet? <span className="font-bold text-blue-600">SiapLuncur</span> bantu UMKM seperti Anda tampil keren di dunia digital. 
                <br />
                <span className="font-semibold">Cukup isi nama usaha & WhatsApp, halaman promosi langsung jadi!</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/register" className="group">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  🚀 Mulai Gratis Sekarang
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-2 border-gray-300 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
                onClick={scrollToFitur}
              >
                📋 Lihat Fitur
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🧑‍💼', '👩‍💼', '🧑‍🔧', '👩‍🍳'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-700">100+ UMKM</p>
                  <p className="text-xs text-gray-500">sudah bergabung</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                <span className="text-sm font-semibold text-gray-700">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <Image 
                src="/hero.png" 
                alt="Ilustrasi UMKM SiapLuncur" 
                width={500} 
                height={400} 
                className="relative w-full max-w-lg h-auto rounded-3xl shadow-2xl border border-gray-200 bg-white transform hover:scale-105 transition-transform duration-300" 
                priority 
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <span className="text-sm font-bold">✅ GRATIS</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <span className="text-sm font-bold">⚡ CEPAT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" ref={fiturRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kenapa UMKM Pilih <span className="text-blue-600">SiapLuncur</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk promosi online yang mudah dipahami dan digunakan
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "🎨",
                title: "Template Siap Pakai & Mobile Friendly",
                desc: "Pilih dari berbagai desain modern untuk usaha kamu—tanpa ribet desain sendiri.",
                detail: "Cocok untuk katalog produk, jasa, atau profil usaha. Sudah optimal untuk tampilan di HP dan cepat diakses.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🧱",
                title: "Builder Tanpa Coding",
                desc: "Edit teks, gambar, dan warna langsung dari dashboard—cukup klik dan ketik.",
                detail: "Tidak perlu install apa pun atau belajar IT. Bisa preview sebelum dipublikasikan.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "📱",
                title: "Terhubung ke WhatsApp",
                desc: "Pengunjung bisa langsung chat ke WhatsApp kamu—bikin pelanggan makin mudah tanya & order.",
                detail: "Tombol CTA langsung ke nomor WhatsApp kamu. Bisa disetting pesan otomatis saat diklik.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.detail}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-2">
                      Pelajari lebih lanjut <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl">🎁</span>
                  <h3 className="text-2xl font-bold text-white">Bonus Eksklusif!</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {[
                    { icon: "🌐", title: "URL Publik Instan", desc: "siapluncur.id/tokobunda" },
                    { icon: "🆓", title: "1 Halaman Gratis", desc: "untuk setiap user" },
                    { icon: "⚡", title: "Tanpa Domain", desc: "& hosting pribadi" }
                  ].map((bonus, i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                      <div className="text-2xl mb-2">{bonus.icon}</div>
                      <h4 className="font-bold mb-1">{bonus.title}</h4>
                      <p className="text-sm opacity-90">{bonus.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata <span className="text-blue-600">Pelanggan Kami</span>?
            </h2>
            <p className="text-lg text-gray-600">
              Dengar langsung pengalaman UMKM yang sudah merasakan manfaatnya
            </p>
          </div>

          {/* Testimonials Horizontal Scroll */}
          <div className="relative">
            {/* Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {[
                {
                  name: "Budi Santoso",
                  role: "Pemilik Toko Kue Bunda",
                  text: "Baru 10 menit landing page saya sudah online! Praktis dan tampilannya keren. Pelanggan jadi lebih mudah order via WhatsApp.",
                  avatar: "🍰",
                  rating: 5,
                  location: "Jakarta"
                },
                {
                  name: "Sari Wijaya",
                  role: "Jasa Laundry Kilat",
                  text: "Gak perlu pusing soal teknis, pelanggan langsung bisa chat ke WhatsApp saya. Orderan meningkat 40% sejak pakai SiapLuncur!",
                  avatar: "🧺",
                  rating: 5,
                  location: "Bandung"
                },
                {
                  name: "Andi Rahman",
                  role: "UMKM Fashion Lokal",
                  text: "Template-nya bagus dan mobile friendly. Bisnis fashion saya jadi makin dipercaya pelanggan. Recommended!",
                  avatar: "👕",
                  rating: 5,
                  location: "Surabaya"
                },
                {
                  name: "Rina Kusuma",
                  role: "Warung Makan Sederhana",
                  text: "Sekarang pelanggan bisa lihat menu kami online dan langsung pesan via WhatsApp. Sangat membantu!",
                  avatar: "🍜",
                  rating: 5,
                  location: "Yogyakarta"
                },
                {
                  name: "Dedi Pratama",
                  role: "Bengkel Motor Jaya",
                  text: "Mudah banget bikin halaman untuk bengkel. Sekarang customer bisa booking service online lewat WhatsApp.",
                  avatar: "🔧",
                  rating: 5,
                  location: "Medan"
                }
              ].map((testimonial, i) => (
                <div key={i} className="flex-none w-80 sm:w-96 bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative snap-start">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-blue-100 text-3xl font-serif">&quot;</div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    &quot;{testimonial.text}&quot;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center mt-6 gap-2">
              <span className="text-xs text-gray-400">← Geser untuk melihat lebih banyak →</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100+", label: "UMKM Bergabung", icon: "👥" },
              { number: "4.9/5", label: "Rating Pengguna", icon: "⭐" },
              { number: "24/7", label: "Support Gratis", icon: "💬" },
              { number: "99%", label: "Uptime Server", icon: "🚀" }
            ].map((stat, i) => (
              <div key={i} className="p-4">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Simple, Direct Messaging */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Siap Mulai Promosi Online?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Bergabung dengan ratusan UMKM yang sudah mempercayai SiapLuncur untuk mengembangkan bisnis mereka secara online.
            </p>
            
            {/* Clean CTA Button */}
            <Link href="/auth/register" className="inline-block">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Mulai Gratis Sekarang
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              Tidak perlu kartu kredit • Website aktif dalam 5 menit
            </p>
          </div>

          {/* Simple Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Mudah Digunakan",
                desc: "Interface sederhana yang mudah dipahami siapa saja"
              },
              {
                title: "Gratis Selamanya",
                desc: "Tidak ada biaya tersembunyi atau upgrade paksa"
              },
              {
                title: "Support Penuh",
                desc: "Tim kami siap membantu kapan saja dibutuhkan"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Signal */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>100+ UMKM aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Rating 4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
