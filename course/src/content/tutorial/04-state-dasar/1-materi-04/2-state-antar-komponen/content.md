---
type: lesson
title: State antar komponen
template: baca
previews: false
terminal: false
focus: /project/app/blog/daftar-tulisan.tsx
---

# State antar komponen

`useState` menyimpan data di dalam satu komponen. Tapi komponen jarang hidup sendiri — komponen saling memanggil, dan state sering perlu dipakai bersama.

React punya aturan arus data yang tegas: **data mengalir satu arah, dari parent ke anak, lewat props**. Kebalikannya — anak memberi tahu parent — dilakukan lewat **callback**: parent menyerahkan fungsi sebagai props, anak memanggilnya.

## Turun lewat props, naik lewat callback

Contoh yang akan kita pakai di tugas: kotak pencarian di atas daftar tulisan blog. Tiga file di panel File:

```text
app/blog/
├── page.tsx            ← server: daftar judul tulisan
├── daftar-tulisan.tsx  ← client: pemilik state + filter
└── kotak-cari.tsx      ← anak: kotak input yang "dikendalikan" parent
```

**`kotak-cari.tsx`** — komponen anak. Dia tidak punya state sendiri; nilai input dan cara mengubahnya datang dari parent lewat props:

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
      className="w-full rounded-lg border px-4 py-2"
    />
  );
}
```

Perhatikan dua props-nya:

- `nilai` — teks yang tampil di input, **dikirim turun** dari parent.
- `saatBerubah` — fungsi yang dipanggil anak setiap kali pengunjung mengetik, **mengirim kabar naik** ke parent.

Input yang nilainya dipegang state parent seperti ini disebut **controlled input** — input "dikendalikan" React, bukan menyimpan teksnya sendiri.

**`daftar-tulisan.tsx`** — parent-nya. State `cari` tinggal di sini:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import KotakCari from "./kotak-cari";

export default function DaftarTulisan({
  daftar,
}: {
  daftar: string[];
}) {
  const [cari, setCari] = useState("");

  const hasil = daftar.filter((slug) => slug.includes(cari));

  return (
    <div>
      <KotakCari nilai={cari} saatBerubah={setCari} />
      <ul className="mt-4 list-disc pl-5 underline">
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

Alurnya: pengunjung mengetik → `KotakCari` memanggil `saatBerubah(teks)` → `setCari` jalan → state berubah → `DaftarTulisan` digambar ulang → `hasil` yang terfilter ikut baru.

Dan `page.tsx` tetap komponen server — daftar judul dikirim ke komponen client sebagai props:

```tsx
const TULISAN = ["belajar-nextjs", "hal-baru", "target-tahun-ini"];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <DaftarTulisan daftar={TULISAN} />
    </main>
  );
}
```

:::info{title="Kenapa kotak-cari.tsx tidak perlu &quot;use client&quot;"}
File yang diimpor oleh komponen `"use client"` ikut dijalankan di browser. `KotakCari` tidak memakai hook apa pun — dia cuma menerima props dan mengembalikan JSX — jadi tidak perlu menandai dirinya sendiri.
:::

## Ringkasan

- ✅ Data mengalir satu arah: parent → anak lewat props
- ✅ Anak memberi kabar ke parent dengan memanggil fungsi yang dikirim lewat props (callback)
- ✅ Pemilik state adalah parent; anak cukup "dikendalikan" lewat props
- ❌ Anak tidak bisa mengubah state parent secara langsung — hanya lewat callback yang diberikan parent

Tapi bagaimana kalau dua komponen **sejajar** — bukan parent-anak — butuh state yang sama? Lesson berikutnya: **lifting state up**.
