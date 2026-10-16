---
type: lesson
title: Layout dengan app/layout.tsx
template: baca
previews: false
terminal: false
focus: /project/app/blog/layout.tsx
---

# Layout — bingkai yang membungkus halaman

Kamu sudah dua kali bertemu `app/layout.tsx`: di lesson struktur folder pada pertemuan 01, dan saat menambahkan menu navigasi di tugas pertemuan 02. Sekarang kita lihat lebih dalam — karena ternyata layout bisa **bertingkat**, sama seperti route.

## Root layout — satu bingkai untuk semua

`app/layout.tsx` disebut **root layout** — bingkai paling luar. Setiap halaman dimasukkan ke tempat `{children}`-nya. Karena itu menu yang kamu tulis di tugas 02 otomatis tampil di semua halaman tanpa disalin ke tiap file — ini jawaban resmi Next.js untuk masalah "kode diulang di setiap halaman" dari lesson pertama.

## Nested layout — bingkai di dalam bingkai

Folder route juga boleh punya `layout.tsx` sendiri. `app/blog/layout.tsx` membungkus **hanya halaman-halaman di bawah `/blog`** — halaman lain tidak kena.

```text
app/
├── layout.tsx              ← membungkus SEMUA halaman
├── page.tsx                → /
├── tentang/page.tsx        → /tentang
└── blog/
    ├── layout.tsx          ← membungkus HANYA halaman blog
    ├── page.tsx            → /blog
    └── [slug]/page.tsx     → /blog/apa-saja
```

Saat pengunjung membuka `/blog/artikel-pertama`, Next.js menyusun halaman dari bingkai terluar ke terdalam:

```text
root layout   (menu + footer)
  └─ blog layout   (pembatas khusus blog)
       └─ page   (isi tulisan)
```

Bandingkan tiga file di panel File: `app/layout.tsx`, `app/blog/layout.tsx`, dan `app/blog/page.tsx`. Halaman `/tentang` hanya dibungkus root layout; halaman `/blog` dibungkus keduanya.

:::warning{title="Aturan penting"}
Root layout wajib punya `<html>` dan `<body>` — itu kerangka dokumen HTML-mu. Layout di dalamnya seperti `app/blog/layout.tsx` **tidak boleh** menulis `<html>`/`<body>` lagi, karena halaman blog sudah berada di dalam `<body>` milik root layout. Nested layout cukup mengembalikan elemen biasa seperti `<section>` atau `<div>`.
:::

## Layout tidak ikut dimuat ulang

Ada satu bonus yang tidak terlihat dari kode: saat pindah antarhalaman yang berbagi layout sama — misalnya dari `/blog` ke `/blog/artikel-pertama` — Next.js hanya mengganti bagian `{children}`. Menu dan sidebar dari layout tetap di tempatnya, tidak dibuat ulang. Inilah salah satu alasan perpindahan halaman di Next.js terasa cepat.

## Kapan membuat nested layout?

Setiap kali satu section butuh bingkai sendiri: sidebar khusus blog, tab khusus dashboard, atau header khusus halaman admin. Kalau elemennya dipakai semua halaman, taruh di root layout; kalau hanya milik satu section, taruh di layout section itu.

## Ringkasan

- ✅ `app/layout.tsx` = root layout; membungkus semua halaman dan wajib berisi `<html>` + `<body>`
- ✅ `layout.tsx` di dalam folder route = nested layout; membungkus hanya halaman di bawah folder itu
- ✅ Layout bertingkat disusun dari luar ke dalam lewat `{children}`, dan tidak dimuat ulang saat pindah halaman dalam satu section
- ❌ Nested layout tidak boleh punya `<html>`/`<body>` — itu hanya milik root layout

Di tugas 02 kamu menulis menu dengan `<Link>` tanpa tahu alasannya — padahal `<a>` biasa pun bisa. Lesson berikutnya menjawab kenapa `<Link>` dipakai.
