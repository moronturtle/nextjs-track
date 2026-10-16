---
type: lesson
title: "Kenalan dengan Zustand"
template: baca
previews: false
terminal: false
focus: /project/app/use-favorit.ts
---

# Zustand — global state tanpa ribet

Context dari dua lesson sebelumnya sudah cukup untuk project seukuran tugasmu. Tapi di project sungguhan, banyak orang memilih jalan yang lebih praktis: **library state global**. Yang paling gampang dipahami adalah **Zustand**.

Kabar baiknya: Zustand jauh lebih sederhana dari Context. Tidak ada `createContext`, tidak ada `Provider`, tidak ada custom hook untuk mengecek Provider. **Satu file untuk satu store — dan itu saja.**

Pasang dulu paketnya:

```bash
npm install zustand
```

## Satu file: store sekaligus hook

Buka `project/app/use-favorit.ts` — ini seluruh kode global state favorit kita:

```ts
import { create } from "zustand";

type FavoritState = {
  daftar: string[];
  toggle: (slug: string) => void;
};

export const useFavorit = create<FavoritState>((set) => ({
  daftar: [],

  toggle: (slug) =>
    set((state) => ({
      daftar: state.daftar.includes(slug)
        ? state.daftar.filter((s) => s !== slug)
        : [...state.daftar, slug],
    })),
}));
```

Yang terjadi di sini:

- **`create(...)`** — membuat **store**: tempat penyimpanan data di luar komponen. Nama file-nya bebas; kita pakai `use-favorit.ts` supaya jelas ini hook favorit.
- **`daftar: []`** — nilai awal state, seperti `useState([])`.
- **`toggle`** — fungsi pengubah, ikut disimpan di store. `set` di sini seperti `setDaftar`: menerima state lama, mengembalikan bagian yang baru.
- Aturan array tetap sama seperti `useState` — **jangan ubah array yang ada, selalu buat yang baru** (`filter` untuk menghapus, `[...lama, baru]` untuk menambah).

Dan hasilnya? `useFavorit` langsung jadi **hook** yang bisa dipakai komponen mana pun. Tidak perlu dipasang di `layout.tsx`, tidak perlu Provider — Zustand yang mengurus semuanya.

## Dipakai di komponen — tinggal panggil

`project/app/tombol-favorit.tsx`:

```tsx
"use client";

import { useFavorit } from "./use-favorit";

export default function TombolFavorit({ slug }: { slug: string }) {
  const daftar = useFavorit((s) => s.daftar);
  const toggle = useFavorit((s) => s.toggle);
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

`useFavorit((s) => s.daftar)` artinya "ambil bagian `daftar` dari store". Komponen yang membacanya akan ditampilkan ulang saat bagian itu berubah — sama seperti `useContext`, tapi tanpa Provider.

Dan karena tidak ada Provider, komponen lain di tempat jauh bisa membaca sumber yang sama. `project/app/menu.tsx` menampilkan jumlah favorit — tanpa satu baris setup pun:

```tsx
const jumlahFavorit = useFavorit((s) => s.daftar.length);
```

Tekan tombol di halaman tulisan → angka di menu langsung ikut berubah. Global state tanpa kode tambahan.

:::tip{title="Bonus: simpan ke localStorage otomatis"}
Zustand punya fitur `persist` yang menulis store ke `localStorage` sendiri — cukup bungkus dengan satu fungsi, tanpa menulis `useEffect` seperti di materi. Bentuknya `create()(persist((set) => ({...})))`. Kenal dulu saja; detailnya bisa kamu baca di dokumentasi Zustand saat butuh.
:::

## Context atau Zustand?

| | Context bawaan | Zustand |
|---|---|---|
| Instal | Sudah ada di React | Satu paket kecil: `zustand` |
| Setup | `createContext` + `Provider` di layout + custom hook | Satu file `create` — langsung jadi hook |
| Komponen tengah | Harus ada di dalam Provider | Bebas — store bisa dibaca dari mana saja |
| Cocok untuk | Data sederhana yang dibaca banyak komponen | Sama — tapi lebih sedikit kode |

Patokan praktis: **dua-duanya boleh**. Context lebih "bawaan" jadi tidak perlu install apa pun; Zustand lebih ringkas ditulis. Yang penting kamu paham konsepnya — global state = satu sumber data dibaca banyak komponen.

:::info{title="Kenal nama saja: Redux"}
Di lowongan kerja dan project lama kamu mungkin menemukan **Redux Toolkit** — library global state yang lebih tua dan lebih rumit: ada slice, store, `dispatch`, `useSelector`. Konsepnya sama (satu sumber data, komponen membaca), tapi kodenya jauh lebih banyak. Untuk projectmu, Zustand atau Context sudah lebih dari cukup.
:::

## Ringkasan

- ✅ Zustand = library state global yang ringkas — `create` membuat store sekaligus hook-nya dalam satu file
- ✅ Tidak ada Provider — komponen membaca langsung dengan `useStore((s) => s.bagian)`
- ✅ `set` di dalam `create` mengubah state; aturan array sama seperti `useState` — selalu buat array baru
- ❌ Jangan kira global state harus selalu pakai library — Context bawaan React tetap valid untuk kasus sederhana

Materi pertemuan 05 selesai. Saatnya quiz, lalu lanjutkan project-mu di tugas.
