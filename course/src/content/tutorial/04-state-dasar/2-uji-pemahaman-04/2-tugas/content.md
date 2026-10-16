---
type: lesson
title: "Tugas: tombol suka dan pencarian"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: tombol suka dan pencarian

Lanjutan dari project yang sama — project yang di pertemuan 03 sudah punya `/blog`, halaman `[slug]`, layout khusus blog, dan menu yang menandai halaman aktif.

Kali ini kamu membuat blog-mu interaktif: tombol suka yang tersimpan, dan kotak pencarian yang memfilter daftar tulisan.

## Yang dikerjakan

### 1. Tombol suka di halaman tulisan

Buat `app/blog/[slug]/like-button.tsx` — komponen `"use client"` dengan `useState` yang menghitung klik:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [suka, setSuka] = useState(0);

  useEffect(() => {
    const tersimpan = localStorage.getItem(`suka-${slug}`);
    if (tersimpan) setSuka(Number(tersimpan));
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`suka-${slug}`, String(suka));
  }, [suka, slug]);

  return (
    <button onClick={() => setSuka(suka + 1)} className="rounded-lg border px-4 py-2">
      👍 {suka}
    </button>
  );
}
```

Pasang di `app/blog/[slug]/page.tsx` — halaman meneruskan `slug` sebagai props: `<LikeButton slug={slug} />`.

Setelah jalan, coba: klik beberapa kali, reload halaman — hitungan tetap. Karena key-nya pakai `suka-${slug}`, tiap tulisan punya hitungan sendiri.

### 2. Pencarian di daftar tulisan

Sekarang `/blog` hanya menampilkan daftar `<Link>` biasa. Ubah jadi daftar yang bisa dicari, pakai pola dari materi:

- `app/blog/kotak-cari.tsx` — input yang menerima `nilai` dan `saatBerubah` sebagai props (tidak perlu `"use client"` sendiri).
- `app/blog/daftar-tulisan.tsx` — komponen `"use client"` yang memegang state `cari`, memfilter daftar, dan merender `<KotakCari>` + `<ul>` berisi `<Link>`.
- `app/blog/page.tsx` — tetap komponen server; daftar slug tulisan dikirim ke `<DaftarTulisan>` lewat props.

State `cari` tinggal di `DaftarTulisan`, bukan di dalam input — inilah controlled input dari materi.

### 3. Periksa hasilnya

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

Kalau project-mu memakai pnpm atau Yarn, sesuaikan perintahnya seperti biasa.

Lalu uji di browser:

- tombol 👍 menambah hitungan, dan tetap tersimpan setelah reload
- hitungan di `/blog/a` dan `/blog/b` tidak saling mempengaruhi
- mengetik di kotak cari memfilter daftar tulisan secara langsung
- menu aktif dari tugas 03 masih bekerja

## Kriteria selesai

- [ ] Project yang sama dengan tugas pertemuan sebelumnya
- [ ] `app/blog/[slug]/like-button.tsx` ada dan hitungan tersimpan per slug lewat `localStorage`
- [ ] `app/blog` punya kotak cari yang memfilter daftar tulisan
- [ ] State pencarian tinggal di komponen parent (`daftar-tulisan.tsx`), input hanya menerima props
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
