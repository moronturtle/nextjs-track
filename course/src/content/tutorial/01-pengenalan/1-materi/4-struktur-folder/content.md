---
type: lesson
title: Struktur folder & routing
template: baca
previews: false
terminal: false
focus: /nama-project/app/page.tsx
---

# Struktur folder & routing

Untuk membuat project Next.js baru, jalankan command ini di terminal:

```bash
npx create-next-app@latest nama-project
```

Command/perintah diatas membuat satu folder bernama `nama-project`, lengkap dengan semua file yang dibutuhkan supaya Next.js bisa berjalan — dan **folder itulah yang sedang kamu lihat di panel File sekarang**. Kamu belum perlu menjalankannya (kita lakukan di pertemuan 2); sekarang cukup kenalan dulu dengan isinya.

## Tur isi project

```
nama-project/
├── app/
│   ├── favicon.ico       ← ikon kecil di tab browser
│   ├── globals.css       ← CSS yang dipakai seluruh halaman
│   ├── layout.tsx        ← bingkai yang membungkus semua halaman
│   ├── page.tsx          ← halaman untuk alamat "/"
│   ├── tentang/
│   │   └── page.tsx      ← halaman untuk alamat "/tentang"
│   └── profil/
│       └── page.tsx      ← halaman untuk alamat "/profil"
├── public/               ← gambar, ikon, dan file statis lainnya
├── .gitignore            ← file yang tidak perlu ikut ke GitHub
├── eslint.config.mjs     ← aturan pemeriksa kerapian kode
├── next.config.ts        ← pengaturan Next.js
├── package.json          ← daftar library + perintah project
├── postcss.config.mjs    ← pengaturan CSS (dipakai Tailwind)
├── README.md             ← catatan tentang project
└── tsconfig.json         ← pengaturan TypeScript
```

Kelihatan banyak? Tenang — **hampir semua pekerjaanmu nanti hanya di dalam folder `app/`**. File-file di luar itu adalah konfigurasi: ditulis sekali oleh `create-next-app`, lalu jarang disentuh lagi. `package.json` akan kita bedah pelan-pelan di pertemuan 2.

## Routing = struktur folder

Inilah aturan paling penting di Next.js: **nama folder di dalam `app/` langsung menjadi alamat halaman di browser.** Kamu tidak perlu menulis konfigurasi routing sama sekali.

```
app/page.tsx          → /
app/tentang/page.tsx  → /tentang
app/profil/page.tsx   → /profil
app/blog/page.tsx     → /blog
```

Coba buka `app/tentang/page.tsx` dan `app/profil/page.tsx` di panel File — isinya hanya konten halaman biasa. Tapi karena folder-nya bernama `tentang` dan `profil`, Next.js otomatis menyajikannya di alamat `/tentang` dan `/profil`.

Syaratnya cuma satu: file di dalam folder **harus bernama `page.tsx`** — nama itu sudah ditentukan Next.js. Kalau kamu menamainya `halaman.tsx` atau salah ketik jadi `page.jsx`, Next.js tidak menganggapnya halaman dan alamatnya tidak bisa diakses.

## `layout.tsx` — bingkai untuk semua halaman

Sekarang buka `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

`{children}` adalah tempat isi `page.tsx` dimasukkan. Saat pengunjung membuka `/tentang`, yang tampil di browser adalah layout ini ditambah isi `tentang/page.tsx`. Karena layout membungkus **semua** halaman, bagian yang sama di setiap halaman — seperti menu dan footer — cukup ditulis sekali di sini. Ingat masalah "kode diulang" di lesson 1? Inilah jawaban resminya di Next.js.

:::info{title="Nama khusus lainnya — kenal dulu"}
Selain `page.tsx`, satu folder boleh berisi `layout.tsx`, `loading.tsx` (tampilan saat halaman sedang dimuat), `error.tsx`, dan `not-found.tsx` (halaman 404). Sekarang cukup tahu nama-nama ini punya arti khusus — kita pakai nanti.
:::

## Ringkasan

- ✅ `create-next-app` membuat struktur project lengkap — yang sering kamu sentuh hanya `app/`
- ✅ **Nama folder = alamat halaman**, dan `page.tsx` adalah file yang menghidupkannya
- ✅ `layout.tsx` membungkus semua halaman lewat `{children}` — bagian yang sama ditulis sekali
- ✅ `public/` tempat menaruh gambar dan file statis lainnya

Teori cukup — selanjutnya cek pemahamanmu lewat kuis singkat, lalu kerjakan tugasnya di laptopmu sendiri. 👉
