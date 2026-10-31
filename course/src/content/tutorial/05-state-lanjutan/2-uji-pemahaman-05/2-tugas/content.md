---
type: lesson
title: "Tugas: favorit di seluruh halaman"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: favorit di seluruh halaman

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 04. Jangan membuat project baru.

Fitur yang sudah kamu buat menjadi dasar tugas ini:

- Dari pertemuan 01–02: halaman utama, halaman Tentang dan Kontak, serta menu navigasi.
- Dari pertemuan 03: halaman blog, halaman tulisan dengan alamat dinamis, dan menu aktif.
- Dari pertemuan 04: tombol suka yang jumlahnya tersimpan dan kotak pencarian tulisan.

Sekarang tambahkan daftar tulisan favorit. Pengunjung dapat menyimpan tulisan dari halaman tulisan. Jumlah favorit terlihat di menu, termasuk saat pengunjung pindah halaman.

Sebelum mulai, rapikan dulu susunan foldernya seperti di materi:

- `app/` khusus untuk routing: `page.tsx` dan `layout.tsx`.
- `components/` untuk komponen yang dipakai bagian lain.
- `context/` untuk Context dan Provider.

## Langkah 1: buat Context untuk favorit

Buat `context/favorit-context.tsx`. File ini menyimpan daftar favorit dan membagikannya ke komponen lain.

```tsx
"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FavoritState = {
  daftar: string[];
  ubahFavorit: (slug: string) => void;
};

const FavoritContext = createContext<FavoritState | null>(null);

export function FavoritProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [daftar, setDaftar] = useState<string[]>([]);

  function ubahFavorit(slug: string) {
    setDaftar((daftarLama) => {
      const sudahDisimpan = daftarLama.includes(slug);

      if (sudahDisimpan) {
        return daftarLama.filter((item) => item !== slug);
      }

      return [...daftarLama, slug];
    });
  }

  return (
    <FavoritContext.Provider value={{ daftar, ubahFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  const data = useContext(FavoritContext);

  if (data === null) {
    throw new Error("useFavorit harus dipakai di dalam FavoritProvider");
  }

  return data;
}
```

`daftarLama` adalah isi daftar sebelum tombol ditekan. Jika tulisan sudah ada, `filter` membuat daftar baru tanpa tulisan tersebut. Jika belum ada, `[...daftarLama, slug]` membuat daftar baru dengan tulisan tersebut.

## Langkah 2: pasang Provider di layout utama

`app/menu.tsx` dari tugas pertemuan 03 adalah komponen, bukan routing. Pindahkan file itu ke `components/menu.tsx`.

Buka `app/layout.tsx` — file yang membungkus halaman-halaman project. Ubah import `Menu` dan tambahkan import `FavoritProvider` di bagian atas:

```tsx
import Menu from "@/components/menu";
import { FavoritProvider } from "@/context/favorit-context";
```

Di dalam `RootLayout`, bungkus menu dan `{children}` dengan `FavoritProvider`:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <FavoritProvider>
          <Menu />
          {children}
        </FavoritProvider>
      </body>
    </html>
  );
}
```

`@/` menunjuk ke folder utama project, jadi `@/components/menu` berarti file `menu.tsx` di folder `components`. Pastikan tidak ada lagi import `./menu` atau `./favorit-context`. Jangan menambahkan `useState` ke `layout.tsx`; state tetap ada di `FavoritProvider`.

## Langkah 3: tambahkan tombol favorit ke halaman tulisan

Buat `components/tombol-favorit.tsx`. Komponen ini menerima `slug` dari halaman tulisan, lalu membaca dan mengubah Context:

```tsx
"use client";

import { useFavorit } from "@/context/favorit-context";

export default function TombolFavorit({ slug }: { slug: string }) {
  const { daftar, ubahFavorit } = useFavorit();
  const sudahDisimpan = daftar.includes(slug);

  return (
    <button onClick={() => ubahFavorit(slug)}>
      {sudahDisimpan ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
```

Di `app/blog/[slug]/page.tsx`, impor tombol di bagian atas file:

```tsx
import TombolFavorit from "@/components/tombol-favorit";
```

Lalu, di dalam halaman, kirim `slug` yang sedang dibuka ke tombol:

```tsx
<TombolFavorit slug={slug} />
```

Letakkan tombol di dekat tombol suka dari tugas pertemuan 04. Keduanya berbeda: tombol suka menghitung klik, sedangkan tombol favorit menambah atau menghapus tulisan dari daftar favorit.

## Langkah 4: tampilkan jumlah favorit di menu

Menu dari tugas pertemuan 03 sudah memakai `"use client"` dan `Link`. Di `components/menu.tsx`, tambahkan import ini:

```tsx
import { useFavorit } from "@/context/favorit-context";
```

Di dalam fungsi `Menu`, baca daftar favorit:

```tsx
const { daftar } = useFavorit();
```

Tampilkan jumlahnya di dalam menu:

```tsx
<span>Favorit: {daftar.length}</span>
```

Sekarang coba di browser:

1. Buka `/blog/belajar-nextjs`.
2. Tekan **☆ Simpan ke favorit**.
3. Lihat jumlah favorit di menu bertambah.
4. Pindah ke `/tentang`, lalu kembali ke blog. Jumlah favorit tetap sama.
5. Tekan tombol favorit lagi. Tulisan terhapus dari daftar dan jumlahnya berkurang.

Data favorit di tugas ini disimpan di state Provider, jadi data tetap ada saat berpindah halaman. Jika halaman dimuat ulang, daftar kembali kosong. Penyimpanan yang bertahan setelah reload sudah kamu buat untuk tombol suka di tugas pertemuan 04.

## Langkah 5: pastikan project sebelumnya tetap jalan

Periksa kembali fitur dari pertemuan sebelumnya:

- Halaman `/`, `/tentang`, dan `/kontak` masih bisa dibuka.
- Menu navigasi masih mengarah ke halaman yang benar.
- Halaman `/blog` masih menampilkan daftar tulisan dan kotak pencarian.
- Link tulisan masih membuka alamat dinamis seperti `/blog/belajar-nextjs`.
- Tombol suka masih menghitung dan mengingat jumlahnya setelah reload.
- Tombol favorit mengubah jumlah favorit di menu.

Jalankan pemeriksaan project:

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

Jika project-mu memakai pnpm atau Yarn, gunakan perintah yang sesuai dengan project tersebut.

## Kriteria selesai

- [ ] Saya melanjutkan project dari tugas pertemuan 01–04, bukan membuat project baru.
- [ ] Context ada di `context/favorit-context.tsx` dan menyimpan daftar favorit serta fungsi `ubahFavorit`.
- [ ] Komponen `Menu` dan `TombolFavorit` ada di folder `components/`.
- [ ] `FavoritProvider` membungkus menu dan halaman di `app/layout.tsx`.
- [ ] Halaman tulisan memiliki tombol untuk menambah atau menghapus favorit.
- [ ] Menu menampilkan jumlah favorit dan berubah saat tombol ditekan.
- [ ] Halaman, navigasi, pencarian, dan tombol suka dari tugas sebelumnya masih berjalan.
- [ ] Pemeriksaan lint dan TypeScript selesai tanpa error.

## Tantangan tambahan (opsional): coba Zustand

Jika tugas utama sudah selesai, buat versi Zustand seperti di materi. Buat `store/use-favorit.ts` dengan `create`, lalu gunakan hook itu di tombol dan menu. Versi Zustand tidak memerlukan `FavoritProvider`.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-05
git add .
git commit -m "Tugas 05"
git push -u origin tugas-05
```

Buat pull request dari `tugas-05` ke `main` (atau `master`). Lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 05](/pengumpulan?t=tugas-05)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
