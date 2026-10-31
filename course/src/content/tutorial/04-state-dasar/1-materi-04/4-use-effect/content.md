---
type: lesson
title: useEffect
template: baca
previews: false
terminal: false
focus: /project/app/blog/[slug]/like-button.tsx
---

# useEffect — menjalankan kode setelah komponen tampil

Bayangkan komponen jam yang berdetak sendiri — waktunya diperbarui setiap detik tanpa ada yang menekan tombol. Kode yang berjalan "setelah komponen tampil" seperti itu ditulis di `useEffect`.

`useState` menyimpan nilai yang bisa berubah. `useEffect` menjalankan kode setelah komponen tampil. Kode ini berguna untuk hal yang perlu berhubungan dengan browser, seperti timer atau `localStorage` — tempat menyimpan teks di browser agar tetap ada setelah halaman dimuat ulang.

## Melihat cara kerja `useEffect`

Ini kode jam yang berdetak setiap detik:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Jam() {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setWaktu(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>Sekarang pukul {waktu.toLocaleTimeString("id-ID")}</p>;
}
```

:::tip{title="Coba di project-mu"}
Salin kode `Jam` di atas ke file `components/jam.tsx`, lalu panggil `<Jam />` dari sebuah `page.tsx`. Jam akan berdetak setiap detik — dan semua itu terjadi tanpa kamu menekan apa pun.
:::

Perhatikan tiga hal:

1. `setInterval` menjalankan isi fungsi setiap 1.000 milidetik, atau satu detik. Di contoh ini, waktu diperbarui setiap detik.
2. `return () => clearInterval(timer)` menghentikan timer saat komponen tidak lagi dipakai. Ini mencegah timer terus berjalan tanpa perlu.
3. `[]` adalah daftar nilai yang diperiksa React. Karena daftar ini kosong, effect dijalankan saat komponen pertama kali tampil, bukan setiap kali waktu berubah.

Daftar tersebut disebut **dependency array** — daftar nilai yang menentukan kapan effect perlu dijalankan lagi.

```tsx
useEffect(fn, []);         // saat komponen pertama kali tampil
useEffect(fn, [slug]);     // saat slug berubah
useEffect(fn, [suka, slug]); // saat suka atau slug berubah
```

:::warning{title="Mengapa effect terlihat berjalan dua kali?"}
Saat mode pengembangan aktif, React dapat menjalankan effect, membersihkannya, lalu menjalankannya lagi. React melakukan ini untuk memeriksa apakah fungsi pembersih sudah benar. Pastikan timer dihentikan dengan `clearInterval`.
:::

## Menyimpan jumlah suka

Di lesson pertama, tombol suka selalu mulai dari nol. Kita bisa membaca jumlah sebelumnya dari `localStorage` saat komponen tampil.

Buka `project/app/blog/[slug]/like-button.tsx`:

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

  return <button onClick={tambahSuka}>👍 {jumlahSuka}</button>;
}
```

Effect membaca jumlah suka saat halaman tulisan tampil. Saat tombol ditekan, `tambahSuka` menaikkan angka dan menyimpan angka baru. Kita menyimpan langsung saat tombol ditekan karena penyimpanan terjadi akibat klik.

Coba tekan tombol beberapa kali, lalu muat ulang halaman tulisan yang sama. Angka suka tetap ada karena browser menyimpannya.

:::info{title="Kapan memakai useEffect?"}
Di Next.js, data untuk membuat halaman biasanya dibaca di komponen server. `useEffect` lebih cocok untuk kode yang perlu berjalan di browser setelah komponen tampil, misalnya membaca `localStorage` atau memasang timer.
:::

## Ringkasan

- ✅ `useEffect` menjalankan kode setelah komponen tampil
- ✅ `[]` berarti effect dijalankan saat komponen pertama kali tampil
- ✅ `[nilai]` berarti effect dijalankan lagi saat nilai tersebut berubah
- ✅ Hentikan timer dengan fungsi pembersih, seperti `clearInterval`
- ❌ Jangan memakai `useEffect` untuk menghitung nilai yang bisa dihitung langsung dari state

Materi pertemuan 04 selesai. Kerjakan quiz, lalu gunakan state dan effect di tugas.
