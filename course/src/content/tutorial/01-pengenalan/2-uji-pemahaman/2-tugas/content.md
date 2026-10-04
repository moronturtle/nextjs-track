---
type: lesson
title: "Tugas: project Next.js pertamamu"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: project Next.js pertamamu

Tugas ini dikerjakan **di laptopmu sendiri**, bukan di halaman ini — justru tujuannya supaya kamu belajar menyiapkan project dari awal. Kumpulkan sebelum pertemuan berikutnya.

## Yang harus disiapkan dulu

1. **Node.js** — wajib. Ini yang membuat perintah `npx` dan `npm` bisa jalan. Download dari **nodejs.org**, pilih versi **LTS**, install seperti aplikasi biasa. Cara cek sudah terinstall atau belum: buka terminal, ketik `node -v` — kalau muncul nomor versi (misal `v22.x.x`), berarti sudah ada.
2. **Package manager** — tidak perlu install tambahan, `npm` otomatis ikut terinstall bareng Node.js. Kalau kamu sudah biasa pakai `pnpm` atau `yarn`, itu juga boleh.
3. **Code editor** — bebas pakai apa saja. Kalau belum punya, pakai **Visual Studio Code** — gratis dan paling umum dipakai.
4. **Akun GitHub** — untuk mengumpulkan tugasnya nanti. Kalau belum punya, daftar dulu di **github.com** — gratis.

## Langkah pengerjaan

1. Buka terminal (di VS Code: menu **Terminal → New Terminal**)
2. Buat project baru dengan perintah:

   ```bash
   npx create-next-app@latest nama-project
   ```

   Ganti `nama-project` dengan nama project-mu — huruf kecil, tanpa spasi.

3. Nanti akan muncul beberapa pertanyaan (pakai TypeScript? Tailwind? dst.) — **tekan Enter saja**, pilihan bawaan sudah benar.
4. Masuk ke folder-nya, lalu jalankan:

   ```bash
   cd nama-project
   npm run dev
   ```

5. Buka `http://localhost:3000` di browser — halaman bawaan Next.js akan tampil.

## Tugasnya

Buat **dua halaman baru** di dalam folder `app/`:

| Route | Isi |
|-------|-----|
| `/tentang` | Tentang dirimu — nama, asal, hobi, bebas |
| `/kontak` | Cara menghubungimu — email, GitHub, atau media sosial |

Caranya sama seperti di lesson 4: buat folder `app/tentang/` berisi file `page.tsx`, dan folder `app/kontak/` berisi file `page.tsx`.

Contoh isi `app/tentang/page.tsx`:

```tsx
export default function TentangPage() {
  return <h1>Tentang Saya</h1>;
}
```

Kalau `http://localhost:3000/tentang` dan `http://localhost:3000/kontak` bisa dibuka di browser, tugas selesai.

## Kriteria selesai

- [ ] Project dibuat dengan `create-next-app`
- [ ] `npm run dev` jalan tanpa error
- [ ] `/tentang` menampilkan halamanmu
- [ ] `/kontak` menampilkan halamanmu

## Cara mengumpulkan

Push project-mu ke GitHub, lalu kirim link repo-nya di halaman pengumpulan:

**[→ Kumpulkan tugas di sini](/pengumpulan)**

Belum bisa git? Boleh kumpulkan screenshot dua halamanmu yang sedang jalan di browser.
