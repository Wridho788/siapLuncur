# siap-luncur

![CI](https://github.com/USERNAME/REPO_NAME/actions/workflows/ci.yml/badge.svg)

**SiapLuncur** adalah platform pembuat landing page sederhana untuk pelaku UMKM Indonesia. Tanpa perlu keahlian teknis, pengguna bisa membuat halaman promosi dalam waktu kurang dari 10 menit.

## 🎯 Tujuan Proyek

Membantu UMKM yang belum melek teknologi untuk:
- Membangun kehadiran online dengan mudah
- Menampilkan produk atau layanan mereka secara profesional
- Meningkatkan kepercayaan pelanggan melalui tampilan digital sederhana

## Fitur Utama

- Next.js App Router
- Tailwind CSS & PostCSS
- Komponen UI shadcn/ui (Button, Card, Input)
- Custom font: Inter, Sora, Poppins
- Struktur folder modular (components, features, hooks, lib, store, styles, types)
- Asset gambar dan font siap pakai

## Menjalankan Project

Jalankan server development:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Struktur Folder

- `src/app` — Halaman utama, layout, dan global styles
- `src/components/ui` — Komponen UI siap pakai
- `src/constant`, `features`, `hooks`, `lib`, `store`, `styles`, `types` — Struktur modular untuk pengembangan
- `public/assets` — Asset gambar dan font

## Kustomisasi Font

Font Inter, Sora, dan Poppins diimpor dan diatur melalui `next/font/google` di `src/app/layout.tsx`.

## Deploy

Deploy aplikasi ini dengan mudah menggunakan [Vercel](https://vercel.com/).

## Referensi

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
