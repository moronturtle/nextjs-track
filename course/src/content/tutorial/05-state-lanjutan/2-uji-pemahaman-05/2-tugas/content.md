---
type: lesson
title: "Tugas: daftar favorit global"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: daftar favorit global

Lanjutan dari project yang sama — project yang sudah punya blog, tombol suka yang tersimpan, pencarian, dan menu aktif.

Kali ini kamu membangun **global state** sendiri dengan Context: daftar tulisan favorit. Pengunjung bisa menandai tulisan sebagai favorit dari halaman tulisan, dan jumlah favorit tampil di menu — di halaman mana pun.

## Yang dikerjakan

### 1. Buat context favorit

Buat `app/favorit-context.tsx`. Polanya sama persis dengan `tema-context.tsx` di materi — hanya datanya yang beda: daftar slug tulisan.

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type Favorit = {
  daftar: string[];
  toggle: (slug: string) => void;
};

const FavoritContext = createContext<Favorit | null>(null);

export function FavoritProvider({ children }: { children: React.ReactNode }) {
  const [daftar, setDaftar] = useState<string[]>([]);

  const toggle = (slug: string) =>
    setDaftar((lama) =>
      lama.includes(slug) ? lama.filter((s) => s !== slug) : [...lama, slug]
    );

  return (
    <FavoritContext.Provider value={{ daftar, toggle }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  const fav = useContext(FavoritContext);
  if (!fav) throw new Error("useFavorit hanya bisa di dalam FavoritProvider");
  return fav;
}
```

Perhatikan cara `toggle` mengubah state: `setDaftar((lama) => ...)` — fungsi pengubah menerima nilai lama dan mengembalikan nilai baru. Tulisan yang sudah ada di daftar dihapus (`filter`), yang belum ada ditambahkan (`[...lama, slug]`). Ini pola update array yang umum — jangan mengubah isi array langsung, selalu buat array baru.

### 2. Pasang Provider di root layout

Di `app/layout.tsx`, bungkus `Menu` dan `{children}` dengan `<FavoritProvider>` — supaya menu dan semua halaman bisa membacanya:

```tsx
<body>
  <FavoritProvider>
    <Menu />
    {children}
  </FavoritProvider>
</body>
```

### 3. Tombol favorit di halaman tulisan

Buat `app/blog/[slug]/tombol-favorit.tsx` — komponen `"use client"` yang membaca context dan menandai tulisan yang sedang dibuka:

```tsx
"use client";

import { useFavorit } from "../../favorit-context";

export default function TombolFavorit({ slug }: { slug: string }) {
  const { daftar, toggle } = useFavorit();
  const aktif = daftar.includes(slug);

  return (
    <button
      onClick={() => toggle(slug)}
      className="rounded-lg border px-4 py-2"
    >
      {aktif ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
```

Pasang di `app/blog/[slug]/page.tsx`, di samping tombol suka dari tugas 04: `<TombolFavorit slug={slug} />`.

### 4. Tampilkan jumlah favorit di menu

`app/menu.tsx` dari tugas 03 sudah `"use client"`. Tambahkan `useFavorit` di dalamnya, lalu tampilkan jumlahnya — misalnya satu item di ujung kanan menu: `Favorit: {daftar.length}`.

Uji di browser: buka `/blog/belajar-nextjs`, tekan "Simpan ke favorit" → angka di menu bertambah. Pindah ke `/tentang` — angkanya tetap. Inilah global state: satu sumber, dibaca dari halaman mana pun.

### 5. Periksa hasilnya

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Project yang sama dengan tugas pertemuan sebelumnya
- [ ] `app/favorit-context.tsx` berisi Context + Provider dengan `useState` + hook `useFavorit`
- [ ] `FavoritProvider` terpasang di `app/layout.tsx`
- [ ] Tombol ☆/★ di halaman tulisan menandai favorit per slug
- [ ] Menu menampilkan jumlah favorit dan ikut berubah saat tombol ditekan dari halaman mana pun
- [ ] `npm run lint` dan `npx tsc --noEmit` selesai tanpa error

## Bonus (opsional): versi Redux

Kalau langkah 1–4 sudah beres dan kamu masih mau tantangan, tulis ulang fitur favorit dengan Redux Toolkit seperti di materi: `app/favorit-slice.ts`, `app/store.ts`, dan `app/providers.tsx` — lalu `useSelector`/`useDispatch` menggantikan `useFavorit`. Boleh dikerjakan di file baru berdampingan dengan versi Context, tidak perlu dihapus.

## Cara mengumpulkan

Lewat pull request di repo yang sama, dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-05
git add .
git commit -m "Tugas 05"
git push -u origin tugas-05
```

Buat pull request dari `tugas-05` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 05](/pengumpulan?t=tugas-05)**

Tunggu approve mentor, lalu merge sendiri dan samakan branch utama di komputermu:

```bash
git checkout main && git pull
```
