---
type: lesson
title: Pertemuan 04 — useState
template: baca
previews: false
terminal: false
focus: /project/app/blog/[slug]/like-button.tsx
---

# useState — menyimpan nilai yang berubah

Di materi sebelumnya, kita membuat halaman dan mengatur cara berpindah halaman. Sekarang kita akan membuat penghitung sederhana. Angkanya berubah setiap kali tombol ditekan — tanpa memuat ulang halaman.

## Apa itu state?

**State** adalah nilai yang disimpan React untuk sebuah komponen. Contohnya angka penghitung yang akan kita buat.

Saat nilai state berubah, React memperbarui tampilan komponen. Jadi angka di layar ikut berubah.

Variabel biasa tidak cukup untuk melakukan ini. Misalnya, mengubah `let jumlah = 0` menjadi `let jumlah = 1` tidak memberi tahu React. React tidak tahu bahwa tampilan perlu diperbarui.

## Menyimpan nilai dengan `useState`

Ini kode lengkap penghitungnya:

```jsx
"use client";

import { useState } from "react";

export default function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <main>
      <h1>Penghitung</h1>
      <p>Jumlah: {jumlah}</p>
      <button onClick={() => setJumlah(jumlah + 1)}>Tambah</button>
      <button onClick={() => setJumlah(jumlah - 1)}>Kurang</button>
      <button onClick={() => setJumlah(0)}>Ulangi dari nol</button>
    </main>
  );
}
```

`useState(0)` menyiapkan nilai awal `0`. Hasilnya disimpan dalam dua nama:

- **`jumlah`** — nilai yang sedang ditampilkan.
- **`setJumlah`** — fungsi untuk memberi React nilai yang baru.

Saat tombol **Tambah** ditekan, `setJumlah(jumlah + 1)` memberi nilai baru kepada React. React lalu memperbarui angka di layar.

Saat tombol **Kurang** ditekan, angka berkurang satu. Tombol **Ulangi dari nol** mengubah angkanya kembali menjadi `0`.

:::tip{title="Coba di project-mu"}
Salin kode di atas ke file `components/penghitung.tsx`, lalu panggil `<Penghitung />` dari sebuah `page.tsx`. Jalankan dev server dan tekan tombolnya — angkanya berubah tanpa halaman dimuat ulang.
:::

`useState(0)` menyiapkan nilai awal `0`. Hasilnya disimpan dalam dua nama:

- **`jumlah`** — nilai yang sedang ditampilkan.
- **`setJumlah`** — fungsi untuk memberi React nilai yang baru.

Saat tombol **Tambah** ditekan, `setJumlah(jumlah + 1)` memberi nilai baru kepada React. React lalu memperbarui angka di layar.

Saat tombol **Kurang** ditekan, angka berkurang satu. Tombol **Ulangi dari nol** mengubah angkanya kembali menjadi `0`.

:::warning{title="Ubah nilai dengan fungsi set"}
Jangan menulis `jumlah = jumlah + 1`. React tidak akan tahu bahwa nilainya berubah. Gunakan `setJumlah(jumlah + 1)` supaya React memperbarui tampilan.
:::

## Memakai `useState` di project Next.js

File yang memakai `useState` harus diawali dengan `"use client"`. Ini aturan dari pertemuan 03. Baris tersebut memberi tahu Next.js bahwa komponen ini perlu berjalan di browser agar tombol bisa digunakan.

Contoh berikut membuat tombol suka. Buka `project/app/blog/[slug]/like-button.tsx` di panel File:

```tsx
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [jumlahSuka, setJumlahSuka] = useState(0);

  return (
    <button onClick={() => setJumlahSuka(jumlahSuka + 1)}>
      👍 {jumlahSuka}
    </button>
  );
}
```

Setiap `LikeButton` punya nilai sendiri. Menekan tombol suka di satu halaman tulisan tidak mengubah angka di halaman tulisan lain.

## Ringkasan

- ✅ State adalah nilai yang disimpan React dan dapat berubah
- ✅ `useState(0)` menyiapkan nilai awal; fungsi seperti `setJumlah` memberi nilai baru
- ✅ React memperbarui tampilan setelah fungsi `set` dipanggil
- ✅ File Next.js yang memakai `useState` harus diawali `"use client"`
- ❌ Jangan mengubah nilai state langsung dengan `=`

Kita sudah menyimpan nilai di satu komponen. Berikutnya, kita belajar membagikan nilai antara komponen.
