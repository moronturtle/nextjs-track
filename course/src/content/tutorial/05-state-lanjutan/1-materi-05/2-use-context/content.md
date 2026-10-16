---
type: lesson
title: useContext
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /demo-tema/
focus: /demo-tema/main.jsx
---

# useContext — saluran langsung ke komponen dalam

Prop drilling dari lesson sebelumnya punya jawaban resmi di React: **Context**. Context adalah "saluran" — kamu memasang nilai di atas, dan komponen mana pun di bawahnya bisa membacanya langsung, tanpa dioper lewat props berlapis.

:::tip{title="Coba di preview"}
Klik tombol **Ganti ke Gelap** di panel Preview. Seluruh tampilan berubah — padahal kalau kamu buka `demo-tema/main.jsx`, komponen `Konten` di tengah tidak membawa props apa pun. Tombol di dalamnya membaca dan mengubah tema langsung dari context.
:::

## Tiga bagian context

```jsx
// 1. Buat salurannya — sekali, di file terpisah
const TemaContext = React.createContext(null);

function App() {
  const [gelap, setGelap] = useState(false);

  return (
    // 2. Pasang nilainya di atas — semua komponen di dalam Provider bisa membaca
    <TemaContext.Provider value={{ gelap, setGelap }}>
      <Konten />
    </TemaContext.Provider>
  );
}

function Konten() {
  // komponen tengah — tidak tahu apa-apa soal tema, tidak bawa props
  return (
    <section>
      <TombolTema />
    </section>
  );
}

function TombolTema() {
  // 3. Komponen dalam membaca langsung — tak peduli berapa lapis kedalamannya
  const { gelap, setGelap } = React.useContext(TemaContext);
  return (
    <button onClick={() => setGelap(!gelap)}>
      {gelap ? "Ganti ke Terang" : "Ganti ke Gelap"}
    </button>
  );
}
```

Perhatikan `Konten`: dia benar-benar kosong dari urusan tema. Tidak seperti `Header` si kurir di lesson sebelumnya, tidak ada props yang lewat — `TombolTema` meloncat langsung ke saluran.

## Di project Next.js-mu

Pola yang sama dipakai di `app/`, hanya dibagi ke file terpisah. Buka `project/app/tema-context.tsx` — file yang memegang context biasanya sekaligus menyediakan Provider-nya:

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type Tema = { gelap: boolean; setGelap: (v: boolean) => void };

const TemaContext = createContext<Tema | null>(null);

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [gelap, setGelap] = useState(false);

  return (
    <TemaContext.Provider value={{ gelap, setGelap }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const tema = useContext(TemaContext);
  if (!tema) throw new Error("useTema hanya bisa di dalam TemaProvider");
  return tema;
}
```

Dua hal dari file ini:

- File ini memakai `useState` dan `useContext`, jadi wajib `"use client"`.
- `useTema()` adalah **custom hook** — fungsi buatanmu sendiri yang membungkus `useContext` supaya pemakaiannya satu baris dan ada pesan error jelas kalau dipakai di luar Provider. Ini pola yang sangat umum dipakai project React.

Pemasangannya di `project/app/layout.tsx` — root layout server membungkus semua halaman dengan komponen client `TemaProvider`, dan `children` tetap diteruskan apa adanya:

```tsx
<body>
  <TemaProvider>{children}</TemaProvider>
</body>
```

Sekarang komponen mana pun — `Menu`, tombol di halaman tulisan, apa pun — tinggal `const { gelap } = useTema()` tanpa satu props pun dioper.

## Ringkasan

- ✅ Context = saluran: `createContext` membuatnya, `Provider` memasang nilainya, `useContext` membacanya
- ✅ Komponen tengah bebas dari props yang bukan urusannya — tidak ada lagi kurir
- ✅ File context biasanya sekaligus menyediakan `Provider` + custom hook seperti `useTema`
- ❌ `useContext` hanya membaca dari `Provider` terdekat di atasnya — dipakai di luar Provider berarti nilai default-nya (di sini `null`)

Context sudah jalan. Tapi kapan sebaiknya dipakai, dan kapan tetap pakai `useState` biasa? Itu bahasan lesson terakhir.
