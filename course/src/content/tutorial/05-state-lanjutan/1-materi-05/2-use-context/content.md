---
type: lesson
title: Membaca data dengan Context
template: baca
previews: false
terminal: false
focus: /project/context/tema-context.tsx
---

# Membaca data dengan Context

Di lesson sebelumnya, `Header` harus meneruskan nama pengguna ke `MenuProfil`, walaupun `Header` tidak memakai nama itu.

React punya cara untuk menghindari penerusan props seperti itu. Namanya **Context**. Context membagikan nilai ke komponen-komponen di bawahnya.

## Tiga bagian Context

Contoh kita memakai tema terang atau gelap:

1. `createContext` membuat tempat untuk membagikan nilai.
2. `Provider` menyediakan nilai untuk komponen di bawahnya.
3. `useContext` membaca nilai tersebut dari komponen.

Sebelum membaca isinya, perhatikan dulu tempat file-file disimpan:

```text
app/            ← khusus routing: page.tsx dan layout.tsx
components/     ← komponen yang dipakai oleh bagian lain
context/        ← Context dan Provider
```

Buka `project/context/tema-context.tsx` di panel File:

```tsx
"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Tema = {
  gelap: boolean;
  ubahTema: () => void;
};

const TemaContext = createContext<Tema | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [gelap, setGelap] = useState(false);

  function ubahTema() {
    setGelap((nilaiLama) => !nilaiLama);
  }

  return (
    <TemaContext.Provider value={{ gelap, ubahTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const tema = useContext(TemaContext);
  if (tema === null) {
    throw new Error("useTema harus dipakai di dalam TemaProvider");
  }
  return tema;
}
```

Mari baca bagian pentingnya:

- **`gelap`** menyimpan pilihan tema saat ini.
- **`ubahTema`** membalik pilihan tema.
- **`TemaContext.Provider`** membagikan `gelap` dan `ubahTema` ke komponen yang ada di dalamnya.
- **`useTema()`** adalah fungsi kecil agar komponen mudah membaca Context. Fungsi ini juga memberi pesan jika komponen tidak berada di dalam Provider.

File ini diawali dengan `"use client"` karena memakai `useState` dan `useContext`. Kedua hook tersebut berjalan di Client Component.

`import type { ReactNode }` mengambil tipe `ReactNode` dari React. `ReactNode` adalah tipe untuk isi yang bisa ditampilkan di dalam komponen — teks, elemen, atau komponen lain. Kata `type` berarti hanya tipenya yang diambil, bukan kode yang dijalankan.

## Pakai Context di tombol

Buka `project/components/tombol-tema.tsx`. Tombol membaca dan mengubah tema lewat `useTema()`:

```tsx
"use client";

import { useTema } from "@/context/tema-context";

export default function TombolTema() {
  const { gelap, ubahTema } = useTema();

  return (
    <button onClick={ubahTema}>
      {gelap ? "Ganti ke terang" : "Ganti ke gelap"}
    </button>
  );
}
```

`TombolTema` tidak menerima `gelap` atau `ubahTema` lewat props. Tombol membaca keduanya langsung dari Context.

Tanda `@/` di baris import menunjuk ke folder utama project. Jadi `@/context/tema-context` berarti file `tema-context.tsx` di dalam folder `context`. Dengan `@/`, import tidak berubah walaupun file yang mengimpor dipindah ke folder lain.

## Pasang Provider

Komponen hanya bisa membaca Context jika berada di dalam Provider. Buka `project/app/layout.tsx` — root layout yang memasang Provider untuk halaman project:

```tsx
<body>
  <TemaProvider>{children}</TemaProvider>
</body>
```

Karena `TemaProvider` membungkus `{children}`, halaman yang ditampilkan di dalamnya dapat memakai `useTema()`.

:::tip{title="Coba di project-mu"}
Buat ketiga file ini di project-mu, lalu jalankan `npm run dev`. Tekan tombol di halaman — tulisan di tombol berubah mengikuti tema yang dibaca dari Context. Tambahkan komponen lain yang memanggil `useTema()`; nilai yang sama langsung terbaca tanpa props.
:::

## Ringkasan

- ✅ `createContext` membuat Context, `Provider` membagikan nilai, dan `useContext` membaca nilai.
- ✅ Komponen di bawah Provider dapat membaca nilai tanpa menerima props satu per satu.
- ✅ Provider harus membungkus komponen yang ingin membaca Context.
- ❌ Komponen di luar Provider tidak dapat membaca nilai Context yang disediakan Provider tersebut.

Context menghindari penerusan props yang panjang. Berikutnya, kita lihat contoh satu nilai yang dipakai oleh menu dan halaman — inilah salah satu bentuk **global state**.
