---
type: lesson
title: Setup project dan package.json
template: baca
previews: false
terminal: false
focus: /project/package.json
---

# Setup project dan `package.json`

Di pertemuan 01, kamu membuat project Next.js dan halaman `/tentang` serta `/kontak`. Sekarang kita lihat apa yang dibuat oleh perintah setup dan bagaimana menjalankan project yang sama.

## Membuat project

Perintah ini membuat folder project baru dan memasang library yang dibutuhkan Next.js:

```bash
npx create-next-app@latest nama-project
```

Ganti `nama-project` dengan nama folder yang kamu inginkan. Gunakan huruf kecil dan tanda hubung, tanpa spasi.

Perintah di atas memakai npm. Kalau kamu sudah memakai package manager lain, perintah untuk membuat project adalah `pnpm create next-app@latest nama-project` atau `yarn create next-app nama-project`.

Saat ditanya cara setup, pilih **recommended defaults** (pengaturan yang disarankan). Pilihan ini menyiapkan TypeScript (JavaScript dengan pemeriksaan tipe), ESLint, Tailwind CSS, dan App Router. Setelah proses selesai, masuk ke folder project lalu jalankan server lokal:

```bash
cd nama-project
npm run dev
```

Buka `http://localhost:3000` di browser. Untuk versi Next.js yang dipakai di materi ini, Node.js minimal versi 20.9 diperlukan. Cek versi Node.js dengan `node -v`.

:::info{title="Kalau kamu melanjutkan tugas pertemuan 01"}
Tidak perlu membuat project baru. Masuk ke folder project yang sudah berisi halaman `/tentang` dan `/kontak`, lalu lanjutkan dari sana.
:::

## Apa itu `package.json`?

`package.json` adalah file yang mencatat nama project, library yang dipakai, dan perintah singkat untuk menjalankan pekerjaan. Buka `project/package.json` di panel File.

Bagian `scripts` berisi nama perintah yang bisa dijalankan. Contohnya, `npm run dev` menjalankan `next dev` untuk membuka server pengembangan. Kamu tidak perlu mengetik perintah panjang itu setiap kali.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

- `npm run dev` — menjalankan project saat kamu mengerjakannya.
- `npm run build` — memeriksa dan menyiapkan versi produksi.
- `npm run start` — menjalankan hasil build produksi. Jalankan `npm run build` lebih dulu.
- `npm run lint` — memeriksa masalah kode dengan ESLint.

Bagian `dependencies` mencatat library yang diperlukan saat aplikasi berjalan, seperti Next.js dan React. `devDependencies` mencatat alat bantu saat membuat project, seperti ESLint dan Tailwind CSS.

## Pilih satu package manager

Package manager adalah alat yang memasang library dan menjalankan script dari `package.json`. Node.js memasang `npm` bersamaan dengannya. `pnpm` dan `yarn` adalah pilihan lain yang perlu dipasang terpisah.

Untuk project yang dibuat dan dijalankan dengan `npm`, file `package-lock.json` mencatat versi library yang dipasang. Jika memilih `pnpm`, project memiliki `pnpm-lock.yaml`; jika memilih Yarn, project memiliki `yarn.lock`.

Gunakan package manager yang sama untuk project itu. Jangan memasang library dengan `npm` lalu berganti ke `pnpm` di project yang sama.

:::tip{title="Lihat project contoh"}
Project `playground-next-hsi` yang dipakai sebagai contoh dibuat dengan Next.js 16.3.8 dan pnpm 12.8.1. Karena itu, `package.json`-nya mencatat `pnpm` dan project-nya memiliki `pnpm-lock.yaml`. Perintah di tugas pertemuan 01 memakai npm; kedua pilihan sama-sama bisa dipakai jika konsisten.
:::

## Ringkasan

- ✅ `create-next-app` menyiapkan folder, library, dan konfigurasi awal project.
- ✅ `package.json` mencatat library dan script seperti `dev`, `build`, dan `lint`.
- ✅ `npm`, `pnpm`, dan `yarn` bisa menjalankan project; pilih satu dan gunakan secara konsisten.

Berikutnya, kita lihat ESLint — alat yang memeriksa pola penulisan kode.
