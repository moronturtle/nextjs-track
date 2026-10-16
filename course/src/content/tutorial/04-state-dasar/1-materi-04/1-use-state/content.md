---
type: lesson
title: useState
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /demo-state/
focus: /demo-state/main.jsx
---

# useState — data yang bisa berubah

Sampai pertemuan 03, semua halamanmu statis — isinya sudah tetap sejak ditulis. Sekarang kita buat halaman yang **bereaksi terhadap pengunjung**.

:::tip{title="Coba di preview"}
Klik tombol **Tambah** beberapa kali di panel Preview. Angkanya berubah — tapi perhatikan jam server di bawah halaman: tetap sama. Artinya halaman tidak memuat ulang; JavaScript yang mengubah tampilannya.
:::

## State itu apa?

**State** adalah data yang bisa berubah selama aplikasi berjalan — dan setiap kali berubah, React menggambar ulang komponennya dengan nilai terbaru. Angka counter di demo tadi adalah state.

Variabel biasa tidak bisa dipakai untuk ini. Kalau kamu menulis `let count = 0` lalu mengubahnya, React tidak tahu ada perubahan — layar tidak ikut diperbarui. React hanya menggambar ulang saat **state** berubah.

## `useState`

Buka `demo-state/main.jsx` di panel File:

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <h1>Counter</h1>
      <p>Nilai: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </main>
  );
}
```

`useState(0)` mengembalikan sepasang hal:

- **`count`** — nilai state saat ini. `0` di dalam kurung adalah nilai awalnya.
- **`setCount`** — satu-satunya cara yang benar untuk mengubahnya.

Saat tombol diklik, `setCount(count + 1)` memberi tahu React: "state berubah, gambar ulang". React menjalankan ulang fungsi `App`, dan `{count}` di layar menampilkan nilai baru.

:::warning{title="Jangan ubah langsung"}
`count = count + 1` mengubah variabelnya, tapi React tidak tahu — layar tidak berubah. Selalu lewat `setCount`. Anggap `count` itu hasil cetakan tiap render: hanya bisa dibaca, tidak bisa ditulis.
:::

## Di project Next.js-mu

Hook seperti `useState` hanya hidup di browser — ingat aturan dari pertemuan 03: file yang memakai hook harus diawali `"use client"`. Contoh tombol suka untuk halaman tulisan — lihat `project/app/blog/[slug]/like-button.tsx`:

```tsx
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [suka, setSuka] = useState(0);

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

Halaman `app/blog/[slug]/page.tsx` tetap komponen server biasa — dia tinggal memanggil `<LikeButton />`. Setiap komponen `LikeButton` punya state-nya sendiri: menekan tombol di satu tulisan tidak mengubah hitungan di tulisan lain.

:::info{title="Tentang file demo"}
Demo di preview memakai React versi `React.createElement` (lihat `demo-state/main.js`) supaya jalan tanpa install — sama seperti demo SPA di pertemuan 01. `main.jsx` adalah versi JSX-nya yang persis seperti yang kamu tulis di project.
:::

## Ringkasan

- ✅ State = data yang bisa berubah; saat berubah, React menggambar ulang komponen
- ✅ `const [nilai, setNilai] = useState(awal)` — nilai dibaca, `setNilai` mengubahnya
- ✅ File yang memakai `useState` wajib `"use client"`; page boleh tetap komponen server yang memanggilnya
- ❌ Jangan mengubah state tanpa fungsi `set`-nya — layar tidak ikut berubah

State di satu komponen sudah bisa. Tapi bagaimana kalau dua komponen perlu data yang sama? Lesson berikutnya: **state antar komponen**.
