---
type: lesson
title: Masalah prop drilling
template: baca
previews: false
terminal: false
focus: /project/app/header.tsx
---

# Masalah prop drilling

Pertemuan 04 mengajarkan: state dinaikkan ke parent, lalu dibagi turun lewat props. Cara itu bagus untuk dua atau tiga komponen. Sekarang kita lihat batasnya.

## Skenario: nama pengguna di pojok atas

Katakanlah project-mu punya data pengguna yang sedang login. Nama itu harus tampil di pojok kanan atas menu — tepatnya di komponen `MenuProfil`. Posisi `MenuProfil` ada di dalam `Header`, dan `Header` ada di dalam `layout.tsx`:

```text
layout.tsx
└── Header          (header.tsx)
    └── MenuProfil  (menu-profil.tsx)  ← nama dibutuhkan di sini
```

Props hanya bisa mengalir turun satu tingkat per langkah. Jadi `namaUser` harus dioper berantai: `layout.tsx` → `Header` → `MenuProfil`. Buka ketiga file di panel File dan perhatikan `header.tsx`:

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

`Header` sama sekali tidak memakai `namaUser` — dia hanya meneruskannya ke bawah. Komponen ini jadi perantara: menerima data, meneruskan, tanpa pernah memakainya.

## Kenapa ini jadi masalah

Props yang dioper berlapis-lapis seperti ini disebut **prop drilling**. Akibatnya:

- **Komponen tengah ikut kotor.** `Header` harus menulis props yang bukan urusannya. Kalau lapisannya ada lima, empat komponen jadi perantara.
- **Susah diubah.** Mengganti nama `namaUser` berarti mengedit semua komponen di rantai — bukan hanya yang memakai.
- **Susah dilacak.** Saat membaca `MenuProfil`, kamu harus menelusuri ke atas untuk mencari tahu dari mana `namaUser` berasal.

Contoh nyata yang sering kena: data pengguna yang login, tema tampilan, bahasa aplikasi — hal-hal yang dibutuhkan banyak komponen di banyak tingkat berbeda.

:::info{title="Prop drilling bukan selalu salah"}
Mengoper props satu-dua tingkat itu normal dan justru bagus — jelas terlihat dari mana data berasal. Prop drilling jadi masalah saat komponen tengah dipaksa membawa data yang tidak dia pakai, hanya untuk diteruskan lagi.
:::

## Ringkasan

- ✅ Prop drilling = props dioper berlapis ke komponen dalam; komponen tengah jadi perantara yang tidak memakai datanya
- ✅ Terjadi karena props hanya mengalir turun — tidak bisa melompat ke cucu
- ❌ Jangan biarkan banyak komponen membawa props yang tidak mereka pakai — rapuh dan susah dirawat

React punya jawaban resmi untuk masalah ini: **Context** — cara membaca data langsung dari atas, tanpa dioper lewat props. Lesson berikutnya.
