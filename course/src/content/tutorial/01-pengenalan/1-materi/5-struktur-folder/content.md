---
type: lesson
title: Struktur folder & file ajaib
template: nextjs
previews:
  - port: 3000
    title: "Next.js"
focus: /app/page.tsx
---

# Struktur folder & file ajaib

Sekarang kamu melihat project **Next.js** beneran di editor. Mari tur file-nya — lihat pohon file di kiri:

```
app/
├── layout.tsx      ← bingkai bersama semua halaman
├── page.tsx        ← halaman "/"
└── globals.css     ← CSS global (Tailwind di-import di sini)
next.config.ts      ← konfigurasi Next.js
package.json        ← daftar "belanja" library + perintah project
tsconfig.json       ← konfigurasi TypeScript
```

> `package.json` cukup kenalan dulu — cara isinya kita bedah di **pertemuan 02** saat setup project dari nol.

## Bukti SSR — pakai "mata crawler" lagi

Di terminal, jalankan perintah yang sama kayak tadi:

```bash
curl -s http://localhost:3000
```

Bandingkan dengan SPA di lesson sebelumnya: kali ini **HTML-nya berisi konten** — `<h1>Halo, Next.js!</h1>` kelihatan di output. Inilah SSR: server sudah menggambar halaman sebelum sampai ke browser.

## File conventions — nama yang punya "kekuatan khusus"

Di dalam `app/`, nama file menentukan perilaku route:

| File | Fungsi |
|------|--------|
| `page.tsx` | UI halaman — **file inilah yang bikin route bisa diakses** |
| `layout.tsx` | UI bersama yang membungkus `page.tsx` dan route di bawahnya |
| `loading.tsx` | UI loading otomatis saat halaman disiapkan |
| `error.tsx` | Penangkap error per segmen |
| `not-found.tsx` | Halaman 404 |
| `route.ts` | API endpoint (bukan halaman) |

Yang `loading`, `error`, `not-found` cukup kenal namanya dulu — kita pakai beneran di pertemuan 04.

## Routing = struktur folder

Folder di dalam `app/` langsung memetakan ke URL:

```
app/page.tsx                → /
app/tentang/page.tsx        → /tentang
app/blog/page.tsx           → /blog
```

Buka `app/page.tsx` di editor — `export default function Home()` itulah yang tampil di preview `/`.

## Styling di Next.js — kamu punya banyak pilihan

Cara Next.js menghias halaman **tidak dipaksa satu** — ada beberapa aliran, dan semuanya resmi didukung:

| Cara | Bentuknya | Cocok untuk |
|------|-----------|-------------|
| **Tailwind CSS** | Kelas siap pakai langsung di JSX: `className="text-xl font-bold"` | Yang mau cepat & konsisten — **ini yang kita pakai di kursus** |
| **CSS Modules** | File `page.module.css` di sebelah `page.tsx` | CSS biasa yang "aman" — nggak bentrok antar halaman |
| **`globals.css`** | Satu file CSS untuk seluruh situs | Reset, font, warna dasar |
| **shadcn/ui** | Komponen cantik siap pakai (tombol, tabel, dialog) di atas Tailwind | Project yang mau UI modern tanpa bikin dari nol |
| **Ant Design / Chakra UI** | Library komponen lengkap ala sistem desain | Dashboard/aplikasi kompleks |

Lihat `app/page.tsx` — ada `className="text-4xl font-bold"`? Itu Tailwind bekerja. Dan `globals.css` meng-import Tailwind sekali untuk semua halaman.

> **Prinsip kursus ini:** kita pakai **Tailwind** karena paling populer di ekosistem Next.js dan nggak butuh file terpisah. Kamu bebas ganti selera nanti — Next.js nggak ngunci kamu ke satu cara.

## Mini-task

Buka `app/layout.tsx`, temukan bagian `{children}` — itu "slot" tempat halaman dimasukkan. Sekarang ke lesson berikutnya: kita bikin route baru dengan tangan sendiri. 👉
