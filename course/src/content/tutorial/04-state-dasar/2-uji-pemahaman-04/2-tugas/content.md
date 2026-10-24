---
type: lesson
title: "Tugas: tombol suka dan pencarian"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: tombol suka dan kotak pencarian

Lanjutkan project dari pertemuan 03. Project tersebut sudah punya halaman `/blog`, halaman tulisan dengan alamat dinamis seperti `/blog/belajar-nextjs`, layout blog, dan menu.

Sekarang tambahkan dua hal: tombol suka yang mengingat jumlah klik, dan kotak pencarian untuk mencari tulisan di daftar blog.

## Yang dikerjakan

### 1. Tombol suka di halaman tulisan

Buat `app/blog/[slug]/like-button.tsx`. Komponen ini memakai `useState` untuk menghitung klik. `useEffect` membaca jumlah sebelumnya dari `localStorage` saat halaman dibuka:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [jumlahSuka, setJumlahSuka] = useState(0);

  useEffect(() => {
    const simpanan = localStorage.getItem(`suka-${slug}`);
    setJumlahSuka(simpanan === null ? 0 : Number(simpanan));
  }, [slug]);

  function tambahSuka() {
    const jumlahBaru = jumlahSuka + 1;
    setJumlahSuka(jumlahBaru);
    localStorage.setItem(`suka-${slug}`, String(jumlahBaru));
  }

  return (
    <button onClick={tambahSuka} className="rounded-lg border px-4 py-2">
      👍 {jumlahSuka}
    </button>
  );
}
```

Pasang tombol di `app/blog/[slug]/page.tsx` — halaman mengirim alamat tulisan (`slug`) ke tombol: `<LikeButton slug={slug} />`.

Setelah jalan, klik tombol beberapa kali lalu muat ulang halaman tulisan yang sama. Jumlah suka tetap tersimpan. Setiap tulisan memiliki jumlah sendiri karena nama simpanannya memakai alamat tulisan, misalnya `suka-belajar-nextjs`.

### 2. Pencarian di daftar tulisan

Sekarang `/blog` hanya menampilkan daftar link. Ubah menjadi daftar yang bisa dicari. Gunakan pola dari materi:

- `app/blog/kotak-cari.tsx` — kotak input yang menerima teks dan fungsi lewat props. File ini tidak perlu `"use client"` sendiri.
- `app/blog/daftar-tulisan.tsx` — komponen `"use client"` yang menyimpan teks pencarian, memilih tulisan yang cocok, lalu menampilkan `<KotakCari>` dan daftar `<Link>`.
- `app/blog/page.tsx` — halaman server yang mengirim daftar alamat tulisan ke `<DaftarTulisan>` lewat props.

Simpan state `cari` di `DaftarTulisan`, bukan di dalam kotak input. Dengan begitu, komponen daftar dapat memakai teks yang diketik untuk memilih tulisan yang cocok.

### 3. Periksa hasilnya

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

Kalau project-mu memakai pnpm atau Yarn, gunakan perintah yang sesuai.

Lalu uji di browser:

- tombol 👍 menambah jumlah suka, dan jumlahnya tetap tersimpan setelah halaman dimuat ulang
- jumlah suka di dua halaman tulisan berbeda tidak saling mengubah
- mengetik di kotak pencarian hanya menampilkan tulisan yang cocok
- menu aktif dari tugas 03 masih bekerja

## Kriteria selesai

- [ ] Project yang sama dengan tugas pertemuan sebelumnya
- [ ] `app/blog/[slug]/like-button.tsx` menghitung jumlah suka dan menyimpannya per tulisan di `localStorage`
- [ ] Halaman `/blog` punya kotak pencarian yang menampilkan tulisan yang cocok
- [ ] `daftar-tulisan.tsx` menyimpan teks pencarian; `kotak-cari.tsx` menerima teks dan fungsi lewat props
- [ ] `npm run lint` dan `npx tsc --noEmit` selesai tanpa error

## Cara mengumpulkan

Lewat pull request di repo yang sama, dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-04
git add .
git commit -m "Tugas 04"
git push -u origin tugas-04
```

Buat pull request dari `tugas-04` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 04](/pengumpulan?t=tugas-04)**

Tunggu approve mentor, lalu merge sendiri dan samakan branch utama di komputermu:

```bash
git checkout main && git pull
```
