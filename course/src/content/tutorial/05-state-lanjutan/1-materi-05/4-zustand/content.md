---
type: lesson
title: Menyimpan global state dengan Zustand
template: baca
previews: false
terminal: false
focus: /project/store/use-favorit.ts
---

# Menyimpan global state dengan Zustand

Di lesson sebelumnya, kita memakai Context untuk membagikan tema. Ada cara lain yang sering dipakai di project React, yaitu **Zustand**. Zustand adalah library — paket berisi kode siap pakai — untuk menyimpan data bersama agar bisa dipakai banyak komponen.

Perbedaan awalnya mudah dilihat:

- Context perlu Provider untuk membagikan nilainya.
- Zustand membuat tempat penyimpanan data yang bisa dibaca komponen tanpa Provider.

## Pasang Zustand

Di project Next.js, pasang paketnya dengan perintah:

```bash
npm install zustand
```

## Buat tempat menyimpan favorit

Store Zustand biasanya disimpan di folder `store`, bersebelahan dengan `app/` dan `components/`:

```text
app/            ← khusus routing: page.tsx dan layout.tsx
components/     ← komponen yang dipakai oleh bagian lain
store/          ← store Zustand
```

Buka `project/store/use-favorit.ts` di panel File. File ini membuat satu tempat untuk menyimpan daftar favorit dan fungsi untuk mengubah daftar:

```ts
import { create } from "zustand";

type FavoritState = {
  daftar: string[];
  ubahFavorit: (slug: string) => void;
};

export const useFavorit = create<FavoritState>((setState) => ({
  daftar: [],

  ubahFavorit: (slug) =>
    setState((stateLama) => {
      const sudahDisimpan = stateLama.daftar.includes(slug);

      if (sudahDisimpan) {
        return {
          daftar: stateLama.daftar.filter((item) => item !== slug),
        };
      }

      return {
        daftar: [...stateLama.daftar, slug],
      };
    }),
}));
```

Mari baca bagian-bagiannya:

- **`create`** membuat tempat penyimpanan Zustand. Tempat ini disebut **store**.
- **`daftar`** adalah data yang disimpan. Tipe `string[]` berarti daftar yang berisi teks. Awalnya daftar masih kosong.
- **`ubahFavorit`** adalah fungsi yang kita buat. Fungsi ini menambah tulisan ke favorit atau menghapusnya jika sudah ada.
- **`setState`** adalah fungsi dari Zustand untuk mengubah isi store. Mirip setter dari `useState`, tetapi mengubah data yang dibagikan store.
- **`stateLama`** adalah isi store sebelum diperbarui. Kalau tulisan sudah ada, `filter` membuat daftar baru tanpa tulisan tersebut. Kalau belum ada, `[...stateLama.daftar, slug]` membuat daftar baru dengan tulisan tambahan.

Nama `useFavorit` diawali `use` karena fungsi tersebut adalah **hook** — fungsi React untuk memakai fitur tertentu di dalam komponen. Komponen yang membutuhkan data favorit dapat memanggilnya.

## Baca dan ubah data dari komponen

Buka `project/components/tombol-favorit.tsx`. Tombol membaca daftar dan fungsi `ubahFavorit` dari Zustand:

```tsx
"use client";

import { useFavorit } from "@/store/use-favorit";

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

`useFavorit()` membaca isi store. Baris `const { daftar, ubahFavorit }` mengambil daftar favorit dan fungsi untuk mengubahnya.

Saat tombol ditekan, `ubahFavorit(slug)` berjalan. Fungsi itu memanggil `setState` di store. Zustand lalu memberi nilai terbaru kepada komponen yang membaca store tersebut.

Contohnya, menu dapat membaca jumlah tulisan favorit:

```tsx
const { daftar } = useFavorit();
const jumlahFavorit = daftar.length;
```

Tombol favorit dan menu tidak perlu saling mengirim props. Keduanya membaca data dari tempat yang sama. Inilah global state.

:::info{title="Nanti, setelah paham"}
Contoh ini membaca isi store dengan `useFavorit()`, supaya hubungan antara store dan komponen mudah dilihat. Zustand juga bisa memilih satu bagian saja, misalnya `useFavorit((state) => state.daftar)`. Cara memilih bagian ini berguna saat store sudah besar.
:::

:::tip{title="Coba di project-mu"}
Pasang `zustand`, buat store `use-favorit.ts` dan tombolnya di project-mu. Tekan tombol pada beberapa tulisan — komponen lain yang membaca `daftar` ikut menerima nilai terbaru, tanpa Provider sama sekali.
:::

## Context atau Zustand?

| | Context | Zustand |
|---|---|---|
| Perlu dipasang? | Provider membungkus komponen pemakai | Tidak perlu Provider |
| Cara membaca | `useContext` atau fungsi bantu | Panggil hook dari store, misalnya `useFavorit` |
| Cocok untuk | Membagikan data sederhana di bagian tertentu | Membagikan state yang dipakai banyak komponen |
| Perlu paket tambahan? | Tidak | Ya, pasang `zustand` |

Keduanya dapat dipakai untuk berbagi data. Mulailah dengan `useState` untuk data lokal. Gunakan Context atau Zustand saat beberapa komponen perlu membaca data yang sama.

## Ringkasan

- ✅ Zustand adalah library untuk menyimpan state yang dipakai beberapa komponen.
- ✅ `create` membuat store dan hook yang dapat dipakai komponen.
- ✅ Komponen membaca data dengan `useFavorit()` dan memanggil fungsi `ubahFavorit` untuk mengubahnya.
- ✅ Zustand tidak perlu Provider di layout.
- ❌ Jangan memakai global state jika datanya hanya dibutuhkan satu komponen.

Materi pertemuan 05 selesai. Kerjakan quiz, lalu tambahkan fitur favorit ke project yang sama di tugas.
