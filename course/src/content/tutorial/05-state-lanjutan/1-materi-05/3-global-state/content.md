---
type: lesson
title: Memakai global state
template: baca
previews: false
terminal: false
focus: /project/components/menu.tsx
---

# Memakai global state

Di lesson sebelumnya, Context membagikan pilihan tema dari satu Provider. Sekarang kita gunakan tema itu dari dua tempat:

- Tombol di halaman mengubah tema.
- Menu di bagian atas menampilkan pilihan tema saat ini.

Data yang dipakai beberapa komponen seperti ini disebut **global state**. “Global” di sini berarti dapat dipakai oleh banyak komponen di area yang dibungkus Provider. Data tidak otomatis tersedia di seluruh project.

## Satu nilai dipakai di dua tempat

Buka file-file di panel File:

- `context/tema-context.tsx` — menyimpan pilihan tema dan membagikan nilainya lewat Provider.
- `components/tombol-tema.tsx` — mengubah pilihan tema.
- `components/menu.tsx` — membaca dan menampilkan pilihan tema.
- `app/layout.tsx` — memasang Provider supaya menu dan halaman bisa membaca tema.

Di `components/menu.tsx`, menu membaca tema dari Context:

```tsx
"use client";

import { useTema } from "@/context/tema-context";

export default function Menu() {
  const { gelap } = useTema();

  return <p>Tema saat ini: {gelap ? "Gelap" : "Terang"}</p>;
}
```

Di `components/tombol-tema.tsx`, tombol mengubah nilai yang sama:

```tsx
"use client";

import { useTema } from "@/context/tema-context";

export default function TombolTema() {
  const { ubahTema } = useTema();

  return <button onClick={ubahTema}>Ganti tema</button>;
}
```

Saat tombol ditekan, nilai di Provider berubah. Menu membaca nilai baru dan menampilkan pilihan tema yang terbaru. Tombol dan menu tidak perlu saling mengirim props.

## Tentukan bagian yang boleh memakai data

Tempat Provider dipasang menentukan komponen mana yang bisa membaca Context:

| Provider dipasang di | Komponen yang dapat membaca |
|---|---|
| `app/layout.tsx` | Menu dan semua halaman di project |
| `app/blog/layout.tsx` | Halaman di dalam bagian blog |
| Di dalam satu `page.tsx` | Hanya komponen di halaman tersebut |

Pasang Provider di bagian paling kecil yang masih mencakup semua pemakai data. Kalau hanya halaman blog yang memakai data, Provider tidak harus membungkus halaman lain.

## Kapan memakai Context?

Pilih cara yang paling sederhana untuk kebutuhanmu:

- Satu komponen memakai data → simpan dengan `useState` di komponen itu.
- Parent dan anak memakai data → kirim lewat props.
- Banyak komponen di bagian berbeda memakai data yang sama → Context dapat membantu.

Context bukan jawaban untuk semua state. Misalnya, teks yang sedang diketik di satu kotak pencarian cukup disimpan dengan `useState`.

## Kebiasaan yang baik saat memakai Context

Beberapa hal yang biasa dilakukan di project nyata:

- **Satu Context untuk satu kebutuhan.** Tema, data pengguna, dan isi keranjang masing-masing punya Context sendiri. Jangan menggabungkan semuanya dalam satu Context besar — saat satu data berubah, semua komponen pemakai ikut ditampilkan ulang.
- **Context untuk data yang jarang berubah.** Tema, bahasa, dan data pengguna yang sedang masuk cocok untuk Context. Data yang berubah setiap detik atau hanya dipakai satu-dua komponen cukup memakai `useState` dan props.
- **`value={{ gelap, ubahTema }}` dibuat baru setiap Provider ditampilkan ulang.** Untuk project kecil ini tidak masalah. Kalau nanti halaman terasa lambat, nilai ini bisa dibungkus dengan `useMemo` — cukup kenali namanya dulu.
- **Buat perubahan terlihat.** Di contoh kita, tema hanya mengubah tulisan. Di project nyata, tema gelap biasanya menambahkan class `dark` ke elemen `<html>` agar warna seluruh halaman berubah. Kalau pilihan tema ingin tersimpan, gunakan `localStorage` seperti di pertemuan 04 — ingat untuk membacanya dengan `useEffect` karena `localStorage` hanya ada di browser.

:::tip{title="Coba di project-mu"}
Pasang file-file ini di project-mu. Ubah tema dari isi halaman — tulisan tema di menu ikut berubah. Pindah ke halaman lain, lalu kembali. Pilihan tema tetap sama karena `TemaProvider` dipasang di layout, bukan di halaman.
:::

## Ringkasan

- ✅ Global state adalah data yang dipakai beberapa komponen.
- ✅ Context membagikan state kepada komponen yang berada di dalam Provider.
- ✅ Provider di root layout dapat membagikan data ke menu dan semua halaman.
- ✅ State yang hanya dipakai satu komponen tetap cocok memakai `useState`.

Context sudah cukup untuk banyak project kecil. Berikutnya, kita lihat Zustand — library yang membuat cara berbagi state ini lebih ringkas.
