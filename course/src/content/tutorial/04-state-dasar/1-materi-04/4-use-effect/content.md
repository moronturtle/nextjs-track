---
type: lesson
title: useEffect
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /demo-efek/
focus: /demo-efek/main.jsx
---

# useEffect — kode yang jalan setelah komponen tampil

:::tip{title="Lihat preview"}
Di panel Preview ada dua jam. Jam pertama — dari server — diam sejak halaman dimuat. Jam kedua **berdetak setiap detik**. Tidak ada yang kamu klik — komponen itu bekerja sendiri setelah tampil. Itu pekerjaan `useEffect`.
:::

`useState` menjawab "data berubah saat pengunjung beraksi". `useEffect` menjawab pertanyaan lain: "jalankan kode ini **setelah** komponen tampil". Cocok untuk urusan yang ada di luar React: timer, `localStorage`, judul tab (`document.title`), atau mengukur lebar layar.

## Bagian-bagian `useEffect`

Buka `demo-efek/main.jsx`:

```jsx
function Jam() {
  const [waktu, setWaktu] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setWaktu(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Sekarang pukul {waktu.toLocaleTimeString("id-ID")}</p>;
}
```

Tiga bagian penting:

1. **Fungsi pertama** — kode yang dijalankan React setiap kali effect aktif. Di sini: memasang `setInterval` yang memperbarui state tiap detik.
2. **`return () => ...`** — fungsi pembersih. React memanggilnya saat komponen dibuang dari layar, supaya timer tidak terus berjalan di komponen yang sudah tidak ada. Timer yang dibiarkan bisa menumpuk dan membuat aplikasi lambat.
3. **`[]` di akhir** — daftar **dependency**, yaitu aturan kapan effect diulang. Array kosong artinya "jalankan sekali saja setelah komponen tampil".

Daftar dependency mengatur jadwal effect:

```tsx
useEffect(fn);          // setiap render — jarang dipakai
useEffect(fn, []);      // sekali, setelah tampil pertama kali
useEffect(fn, [slug]);  // tiap nilai slug berubah
```

:::warning{title="Effect jalan dua kali di mode dev"}
Saat `npm run dev`, React sengaja menjalankan effect dua kali. Tujuannya membantumu menemukan effect yang lupa menulis fungsi pembersih. Ini hanya terjadi di mode pengembangan — di versi produksi effect jalan normal.
:::

## Contoh di project: like yang tersimpan

Ingat `LikeButton` dari lesson 1? Masalahnya: reload halaman, hitungan kembali nol. Dengan `useEffect` kita bisa menyimpannya ke `localStorage` — penyimpanan kecil di browser yang isinya tidak hilang walau halaman dimuat ulang. Lihat `project/app/blog/[slug]/like-button.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [suka, setSuka] = useState(0);

  // Baca simpanan saat halaman dibuka
  useEffect(() => {
    const tersimpan = localStorage.getItem(`suka-${slug}`);
    if (tersimpan) setSuka(Number(tersimpan));
  }, [slug]);

  // Simpan setiap kali hitungan berubah
  useEffect(() => {
    localStorage.setItem(`suka-${slug}`, String(suka));
  }, [suka, slug]);

  return (
    <button
      onClick={() => setSuka(suka + 1)}
      className="rounded-lg border px-4 py-2"
    >
      👍 {suka}
    </button>
  );
}
```

Dua effect, dua jadwal. Yang pertama jalan saat `slug` berubah (membaca simpanan). Yang kedua jalan tiap `suka` berubah (menulis simpanan). Nanti di project-mu: klik tombol, reload halaman — angkanya tidak hilang.

:::info{title="Bukan untuk mengambil data halaman"}
Di Next.js, mengambil data untuk halaman biasanya dilakukan di komponen server — HTML-nya tiba sudah berisi. `useEffect` dipakai untuk hal yang memang hanya ada di browser: `localStorage`, timer, ukuran layar, dan sejenisnya.
:::

## Ringkasan

- ✅ `useEffect(fn, deps)` menjalankan `fn` setelah komponen tampil — untuk urusan di luar React
- ✅ `[]` = sekali; `[x]` = tiap `x` berubah; tanpa array = tiap render
- ✅ `return () => ...` = pembersih saat komponen dibuang — wajib untuk timer dan pendengar event
- ❌ Jangan memakai effect untuk hal yang bisa dihitung langsung saat render — effect jalan setelah tampil, jadi hasilnya telat satu langkah

Materi pertemuan 04 selesai — quiz dulu, lalu lanjutkan project-mu di tugas.
