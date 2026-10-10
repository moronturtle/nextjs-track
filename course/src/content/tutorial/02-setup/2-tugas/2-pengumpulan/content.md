---
type: lesson
title: "Tugas: lanjutkan project-mu"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: lanjutkan project-mu

Tugas ini adalah **lanjutan dari tugas pertemuan 01**. Gunakan project yang sama — project yang sudah berisi halaman `/tentang` dan `/kontak`.

Mulai tugas ini, halamanmu tidak terpaku pada dua halaman itu. Kamu boleh membangun seperti website pada umumnya: menambahkan halaman utama `/`, halaman baru lain, dan menu navigasi yang menghubungkan semuanya. Susun sesuai keinginanmu — yang penting langkah-langkah di bawah selesai.

Tujuan tugas ini: menambahkan navigasi bersama, menata halaman dengan Tailwind CSS, dan mencoba ESLint serta Prettier.

## Yang dikerjakan

### 1. Tambahkan navigasi di semua halaman

Buka `app/layout.tsx`. Tambahkan menu di dalam `<body>` sebelum `{children}` dengan komponen `Link` dari `next/link`. Isi menu disesuaikan dengan halaman yang ada di project-mu.

Tambahkan baris import ini di bagian atas `app/layout.tsx`:

```tsx
import Link from "next/link";
```

Lalu, di dalam `<body>` yang sudah ada dan sebelum `{children}`, tambahkan menu seperti berikut:

```tsx
<nav className="flex gap-4 border-b p-4">
  <Link href="/">Beranda</Link>
  <Link href="/tentang">Tentang</Link>
  <Link href="/kontak">Kontak</Link>
</nav>
```

Sesuaikan daftar link dengan halamanmu — boleh ditambah atau dikurangi. Kalau halaman utama `/` di project-mu belum menarik, kamu boleh menulis ulang isi `app/page.tsx` supaya terasa seperti halaman home website sungguhan.

Jangan membuat elemen `<html>` atau `<body>` baru. Project-mu sudah memiliki kedua elemen tersebut di root layout.

### 2. Rapikan tampilan halaman-halamanmu

Gunakan class Tailwind pada halaman yang ada di project-mu — minimal `app/tentang/page.tsx` dan `app/kontak/page.tsx`; halaman utama dan halaman lain juga boleh. Setiap halaman harus memiliki judul yang mudah dibaca, jarak antarbagian, dan warna teks yang jelas.

Contoh class yang bisa dicoba: `mx-auto`, `max-w-3xl`, `px-6`, `py-12`, `text-3xl`, `font-bold`, `text-slate-600`, `rounded-lg`, dan `hover:bg-slate-600`. Cari class lain di [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) kalau perlu.

### 3. Pasang dan jalankan Prettier

Dari folder project, pasang Prettier dan aturan agar format ESLint tidak bertentangan:

```bash
npm install --save-dev prettier eslint-config-prettier
```

Di `eslint.config.mjs`, impor konfigurasi Prettier:

```js
import prettier from "eslint-config-prettier/flat";
```

Tambahkan `prettier` setelah konfigurasi Next.js dan TypeScript di daftar `defineConfig`. Jangan hapus konfigurasi ESLint yang sudah dibuat oleh Next.js.

Buat file `.prettierrc` di folder project dengan pengaturan format seperti di materi:

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

Rapikan file di dalam `app/`:

```bash
npx prettier --write app
```

Kalau project-mu memakai pnpm, gunakan `pnpm add -D prettier eslint-config-prettier` untuk memasang paket, lalu `pnpm exec prettier --write app` untuk merapikan file. Kalau memakai Yarn, gunakan `yarn add --dev prettier eslint-config-prettier`, lalu `yarn prettier --write app`. Gunakan satu package manager yang sama untuk seluruh perintah di project.

### 4. Periksa hasilnya

Jalankan pemeriksaan ESLint:

```bash
npm run lint
```

Jika memakai pnpm, jalankan `pnpm lint`. Jika memakai Yarn, jalankan `yarn lint`.

Untuk memastikan tidak ada kesalahan tipe, jalankan juga:

```bash
npx tsc --noEmit
```

Lalu jalankan project dan buka `http://localhost:3000` di browser. Klik setiap link di menu — semua halaman harus bisa dibuka lewat menu tersebut.

## Kriteria selesai

- [ ] Project yang digunakan sama dengan project tugas pertemuan 01.
- [ ] Menu di `app/layout.tsx` menampilkan link ke halaman-halaman project-mu, dan semuanya bisa dibuka lewat menu.
- [ ] Halaman `/tentang` dan `/kontak` masih dapat dibuka — halaman lain boleh ditambah sesukamu.
- [ ] Halaman-halaman menggunakan beberapa class Tailwind.
- [ ] Prettier terpasang, `.prettierrc` dibuat, dan file dalam `app/` sudah dirapikan.
- [ ] `npm run lint` dan `npx tsc --noEmit` selesai tanpa error.

Halaman tambahan di luar `/tentang` dan `/kontak` bersifat pilihan — kerjakan kalau kamu mau. Metadata dan SEO tidak perlu dikerjakan.

## Cara mengumpulkan

Tugas dikumpulkan lewat **pull request** (PR) — permintaan di GitHub untuk menggabungkan perubahan dari satu branch ke branch lain. Branch adalah jalur kerja terpisah di dalam repo; branch utama project-mu bernama `main` — pada repo lama bisa bernama `master`. Cek nama branch utama project-mu di halaman repo GitHub, lalu gunakan nama tersebut di perintah-perintah di bawah.

Pastikan repo project-mu **public** dan sama dengan repo tugas pertemuan 01.

### 1. Buat branch khusus tugas ini

Mulai dari branch utama yang terbaru, lalu buat branch baru:

```bash
git checkout main && git pull
git checkout -b tugas-02
```

### 2. Simpan dan push pekerjaanmu

```bash
git add .
git commit -m "Tugas 02"
git push -u origin tugas-02
```

### 3. Buat pull request di GitHub

Buka repo project-mu di GitHub. Biasanya langsung muncul tombol kuning **Compare & pull request** — klik tombol itu. Kalau tidak muncul, buka tab **Pull requests**, klik **New pull request**, pilih `tugas-02` sebagai sumber dan `main` (atau `master`) sebagai tujuan, lalu klik **Create pull request**.

### 4. Tulis komentar di thread pengumpulan

Salin alamat PR-mu, misalnya `https://github.com/budi/nama-repo/pull/3`. Tulis **komentar baru** di thread tugas 02 dengan format `[nama]_[link PR]` — contoh: `budi_https://github.com/budi/nama-repo/pull/3`. Jangan balas komentar murid lain.

**[→ Buka thread pengumpulan tugas 02](/pengumpulan?t=tugas-02)**

### 5. Merge setelah disetujui mentor

Jangan menekan tombol merge dulu — tunggu mentor memeriksa dan menyetujui (approve) PR-mu. Setelah di-approve, **kamu sendiri** yang menekan **Merge pull request** di halaman PR; perubahanmu resmi masuk ke `main` (atau `master`).

Terakhir, samakan branch utama di komputermu supaya siap untuk tugas berikutnya:

```bash
git checkout main && git pull
```
