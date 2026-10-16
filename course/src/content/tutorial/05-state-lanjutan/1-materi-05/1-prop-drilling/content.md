---
type: lesson
title: Masalah prop drilling
template: baca
previews: false
terminal: false
focus: /project/app/header.tsx
---

# Masalah prop drilling

Pertemuan 04 mengajarkan: state diangkat ke parent, lalu dibagi turun lewat props. Itu bekerja bagus untuk dua atau tiga komponen. Sekarang kita lihat batasnya.

## Skenario: nama pengguna di pojok atas

Katakanlah project-mu punya data pengguna yang sedang login, dan nama itu harus tampil di pojok kanan atas menu — tepatnya di komponen `MenuProfil`. Posisi komponennya di dalam `Header`, dan `Header` di dalam `layout.tsx`:

```text
layout.tsx
└── Header          (header.tsx)
    └── MenuProfil  (menu-profil.tsx)  ← nama dibutuhkan di sini
```

Karena props hanya mengalir turun satu tingkat per langkah, `namaUser` harus diestafet: `layout.tsx` → `Header` → `MenuProfil`. Buka ketiga file di panel File dan perhatikan `header.tsx`:

```tsx
export default function Header({ namaUser }: { namaUser: string }) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="font-bold">Blog Saya</span>
      <MenuProfil namaUser={namaUser} />
    </header>
  );
}
```

`Header` sama sekali tidak memakai `namaUser` — dia hanya meneruskannya. Komponen ini menjadi "kurir": menerima paket, meneruskan ke bawah, tanpa membuka isinya.

## Kenapa ini jadi masalah

Estafet props seperti ini disebut **prop drilling** — "mengebor" props menembus lapisan komponen. Akibatnya:

- **Komponen tengah jadi kotor.** `Header` harus mendeklarasikan props yang bukan urusannya. Kalau lapisannya lima — bayangkan empat komponen jadi kurir.
- **Susah diubah.** Mengganti nama `namaUser` berarti menyentuh semua komponen di rantai, bukan hanya yang memakai.
- **Susah dilacak.** Saat membaca `MenuProfil`, kamu harus menelusuri ke atas untuk mencari tahu dari mana `namaUser` berasal.

Contoh nyata yang sering kena: data pengguna yang login, tema tampilan, bahasa antarmuka — hal-hal yang dibutuhkan banyak komponen di banyak kedalaman berbeda.

:::info{title="Prop drilling bukan selalu salah"}
Mengoper props satu-dua tingkat itu normal dan justru bagus — jelas terlihat dari mana data berasal. Prop drilling jadi masalah saat komponen tengah dipaksa membawa data yang tidak dia pakai, hanya untuk diteruskan.
:::

## Ringkasan

- ✅ Prop drilling = props dioper berlapis ke komponen dalam; komponen tengah jadi "kurir" yang tidak memakai datanya
- ✅ Terjadi karena props hanya mengalir turun — tidak bisa melompat ke cucu atau menembus lapisan
- ❌ Jangan biarkan banyak komponen membawa props yang tidak mereka pakai — rapuh dan susah dirawat

React punya jawaban resmi untuk ini: **Context** — saluran yang bisa dibaca langsung oleh komponen mana pun di bawahnya, tanpa lewat kurir. Lesson berikutnya.
