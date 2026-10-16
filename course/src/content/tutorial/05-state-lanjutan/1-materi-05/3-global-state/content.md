---
type: lesson
title: Global state dengan Context
template: baca
previews: false
terminal: false
focus: /project/app/menu.tsx
---

# Global state dengan Context

Gabungkan semua yang sudah kamu pelajari: `useState` menyimpan data, `Context` menyalurkannya ke mana saja. Keduanya bersatu jadi **global state** — data yang bisa dibaca dan diubah oleh banyak komponen di banyak halaman, dari satu sumber.

## Polanya: Provider memegang state

Lihat lagi `project/app/tema-context.tsx` dari lesson sebelumnya — sebenarnya dialah global state-nya: Provider menampung `useState`, lalu membagikan nilai **dan** fungsi pengubahnya lewat `value`.

Artinya pola umumnya selalu sama:

```text
context.tsx      ← "use client": createContext + Provider (berisi useState) + custom hook
layout.tsx       ← pasang <Provider> membungkus bagian yang butuh
komponen apa pun ← const { ... } = useTema() — baca atau ubah
```

## Satu sumber, banyak pembaca

Bukti kekuatannya ada di `project/app/menu.tsx` — komponen yang sama sekali berbeda halaman dengan tombol tema, tapi membaca sumber yang sama:

```tsx
"use client";

import { useTema } from "./tema-context";

export default function Menu() {
  const { gelap } = useTema();

  return (
    <nav className="flex gap-4 border-b p-4">
      {/* ...link navigasi... */}
      <span className="ml-auto text-sm">
        Tema: {gelap ? "Gelap" : "Terang"}
      </span>
    </nav>
  );
}
```

`TombolTema` di satu halaman menekan tombol → `Menu` di layout langsung ikut berubah. Saat `value` Provider berubah, **semua** komponen yang membacanya digambar ulang otomatis — satu sumber kebenaran, semua tampilan sinkron.

## Provider ditaruh di mana?

Letak Provider menentukan siapa yang bisa membaca — komponen hanya melihat Provider **di atasnya**:

| Provider dipasang di | Yang bisa membaca |
|---|---|
| `app/layout.tsx` | Seluruh halaman |
| `app/blog/layout.tsx` | Hanya halaman di bawah `/blog` |
| Di dalam satu `page.tsx` | Hanya isi halaman itu |

Pasang di tingkat terendah yang masih membungkus semua pemakainya — sama seperti patokan lifting state di pertemuan 04.

## Kapan TIDAK pakai Context

Context bukan pengganti semua state. Tetap pakai cara dari pertemuan 04 kalau:

- Data hanya dipakai satu komponen → `useState` biasa sudah cukup.
- Dipakai parent dan satu-dua anak → props + callback lebih jelas alurnya.
- Datanya berubah sangat sering (misalnya posisi mouse setiap gerakan) → tiap perubahan `value` menggambar ulang semua pembaca; untuk data seramai itu ada alat yang lebih efisien.

Context cocok untuk data yang **dipakai banyak komponen di banyak kedalaman**: tema, pengguna yang login, bahasa, keranjang belanja.

:::info{title="Kenal dulu: library state global"}
Di project besar kamu akan bertemu **Zustand**, **Redux**, atau **Jotai** — library khusus untuk mengelola global state, dengan fitur lebih dari Context polos. Context bawaan React sudah cukup untuk project seukuran tugasmu — tapi karena Redux paling sering muncul di kode orang lain, lesson berikutnya mengenalkan polanya.
:::

## Ringkasan

- ✅ Global state = `useState` di dalam Provider Context — satu sumber dibaca banyak komponen
- ✅ Semua pembaca `useContext` ikut digambar ulang saat `value` berubah — tampilan selalu sinkron
- ✅ Pasang Provider di tingkat terendah yang membungkus semua pemakai (layout untuk seluruh app)
- ❌ Context bukan pengganti `useState` biasa — state lokal tetap pakai `useState`, parent-anak dekat tetap pakai props

Context sudah menjawab kebutuhan global state kita. Satu lesson lagi untuk melihat cara populer lain di dunia nyata: **Redux**.
