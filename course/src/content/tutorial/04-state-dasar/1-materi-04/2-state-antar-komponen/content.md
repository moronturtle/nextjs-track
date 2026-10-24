---
type: lesson
title: State antar komponen
template: baca
previews: false
terminal: false
focus: /project/app/blog/daftar-tulisan.tsx
---

# Membagikan state antar komponen

Di lesson sebelumnya, angka penghitung disimpan di satu komponen. Bagaimana kalau satu komponen menyimpan teks pencarian, lalu komponen lain menampilkan hasilnya?

Contohnya kotak pencarian dan daftar tulisan blog. Keduanya perlu memakai teks yang sama.

## Parent dan anak

Komponen yang menampilkan komponen lain disebut **parent** (induk). Komponen yang ditampilkan di dalamnya disebut **anak**.

Di contoh ini, `DaftarTulisan` adalah parent. `KotakCari` adalah anak.

```text
app/blog/
├── page.tsx            ← halaman blog
├── daftar-tulisan.tsx  ← parent: menyimpan teks pencarian
└── kotak-cari.tsx      ← anak: menampilkan kotak input
```

## Parent mengirim data lewat props

**Props** adalah data atau fungsi yang dikirim parent kepada anak. Buka `project/app/blog/kotak-cari.tsx` di panel File:

```tsx
export default function KotakCari({
  nilai,
  saatBerubah,
}: {
  nilai: string;
  saatBerubah: (teks: string) => void;
}) {
  return (
    <input
      value={nilai}
      onChange={(e) => saatBerubah(e.target.value)}
      placeholder="Cari tulisan..."
    />
  );
}
```

`nilai` berisi teks yang tampil di kotak. `saatBerubah` adalah fungsi yang dipanggil saat seseorang mengetik.

Kotak input tidak menyimpan teksnya sendiri. Parent mengirim teks turun lewat `nilai`. Saat ada teks baru, anak memanggil fungsi `saatBerubah` untuk memberi tahu parent.

Pola ini disebut **controlled input** — nilai kotak input dikendalikan oleh state di React.

## Parent menyimpan state

Buka `project/app/blog/daftar-tulisan.tsx`. File ini menyimpan teks pencarian dan mengirimkannya ke `KotakCari`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import KotakCari from "./kotak-cari";

export default function DaftarTulisan({ daftar }: { daftar: string[] }) {
  const [cari, setCari] = useState("");

  const hasil = daftar.filter((slug) => slug.includes(cari));

  return (
    <div>
      <KotakCari nilai={cari} saatBerubah={setCari} />

      <ul>
        {hasil.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

`daftar` adalah daftar teks. Setiap teks adalah alamat pendek sebuah tulisan blog, misalnya `belajar-nextjs`. Tanda `string[]` pada kode berarti “daftar berisi teks”. `filter` memilih tulisan yang alamatnya memuat teks pencarian.

Perhatikan baris `<KotakCari nilai={cari} saatBerubah={setCari} />`:

- `cari` dikirim ke kotak input. Karena itu, teks yang diketik tampil di kotak.
- `setCari` juga dikirim. Saat anak memanggil fungsi ini, state parent berubah.

Alurnya seperti ini:

1. Pengunjung mengetik di kotak.
2. `KotakCari` memanggil `saatBerubah` dengan teks baru.
3. `setCari` mengubah state di `DaftarTulisan`.
4. React memperbarui tampilan dan menampilkan hasil pencarian yang cocok.

`page.tsx` tetap menjadi halaman server. Halaman ini mengirim daftar tulisan ke `DaftarTulisan`:

```tsx
import DaftarTulisan from "./daftar-tulisan";

const TULISAN = ["belajar-nextjs", "hal-baru", "target-tahun-ini"];

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <DaftarTulisan daftar={TULISAN} />
    </main>
  );
}
```

:::info{title="Kenapa kotak-cari.tsx tidak perlu &quot;use client&quot;?"}
`KotakCari` tidak memakai `useState` atau hook lain. Karena `KotakCari` dipakai oleh `DaftarTulisan` yang sudah memakai `"use client"`, file anak ini tidak perlu menambahkan baris tersebut.
:::

## Ringkasan

- ✅ Parent mengirim data ke anak lewat props
- ✅ Anak memberi tahu parent dengan memanggil fungsi yang dikirim lewat props
- ✅ State disimpan di parent karena parent dan anak sama-sama memerlukan nilainya
- ❌ Anak tidak mengubah state parent secara langsung

Sekarang state sudah dipakai oleh parent dan anak. Berikutnya, kita lihat cara berbagi state antara dua komponen anak.
