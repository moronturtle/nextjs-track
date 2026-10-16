---
type: lesson
title: useRouter dan usePathname
template: baca
previews: false
terminal: false
focus: /project/app/menu.tsx
---

# useRouter dan usePathname

`<Link>` bekerja saat pengunjung mengkliknya. Tapi ada dua kebutuhan yang tidak bisa dijawab `<Link>`:

1. **"Link mana yang sedang aktif?"** — menu perlu tahu alamat yang sedang dibuka supaya bisa memberi tanda pada link itu.
2. **"Pindah halaman lewat kode"** — misalnya setelah form disimpan, pengunjung langsung dipindahkan ke halaman terima kasih. Tidak ada yang diklik — kodenya yang memindahkan.

Keduanya dijawab oleh dua **hook** dari `next/navigation`. Hook adalah fungsi React yang namanya diawali `use` — dia memberi komponen kemampuan tambahan. Kali ini kemampuannya: membaca dan mengatur navigasi.

## Syaratnya: komponen harus `"use client"`

Selama ini komponenmu dijalankan di server — itulah kenapa HTML-nya tiba lengkap di browser. Tapi klik dan pindah halaman terjadi di browser pengunjung, jadi hook navigasi hanya hidup di sana. File yang memakai hook harus menandai dirinya dengan `"use client"` di baris pertama. Komponen seperti ini disebut **Client Component**.

## `usePathname` — membaca alamat yang sedang dibuka

Buka `project/app/menu.tsx` di panel File:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={pathname === href ? "font-bold underline" : ""}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex gap-4 border-b p-4">
      {link("/", "Beranda")}
      {link("/tentang", "Tentang")}
      {link("/kontak", "Kontak")}
      {link("/blog", "Blog")}
    </nav>
  );
}
```

`usePathname()` mengembalikan alamat yang sedang dibuka — misalnya `"/blog"`. Di contoh ini, link yang `href`-nya sama dengan `pathname` diberi huruf tebal dan garis bawah. Hasilnya: pengunjung selalu tahu sedang ada di halaman mana, karena menu itu ikut ditandai.

`app/layout.tsx` tinggal memanggil `<Menu />` di tempat `<nav>` yang lama. Layout sendiri tetap komponen server biasa. Ini pola yang umum: hanya bagian yang butuh interaksi yang ditandai `"use client"`, selebihnya tetap di server.

## `useRouter` — pindah halaman dari kode

`useRouter()` memberi objek untuk mengatur navigasi lewat kode. Yang paling sering dipakai: `router.push("/alamat")` — memindahkan pengunjung ke alamat itu.

Buka `project/app/tombol-beranda.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function TombolBeranda() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="rounded-lg bg-slate-900 px-4 py-2 text-white"
    >
      Kembali ke Beranda
    </button>
  );
}
```

`onClick` hanya hidup di browser — makanya komponen ini juga `"use client"`. Komponen ini dipakai di `app/tentang/page.tsx` sebagai `<TombolBeranda />`; halamannya tetap komponen server, hanya tombolnya yang client.

`useRouter` juga punya `router.back()` (kembali satu halaman) dan `router.replace("/alamat")` (pindah tanpa menambah riwayat tombol back). Kenal dulu saja — dipakai saat butuh.

:::warning{title="Impor dari next/navigation"}
Di App Router, kedua hook ini diimpor dari `next/navigation`. Di internet kamu mungkin menemukan `next/router` — itu milik Pages Router (pola lama dari pertemuan 02) dan tidak berfungsi di dalam `app/`.
:::

## Ringkasan

- ✅ `usePathname()` = alamat yang sedang dibuka — cocok untuk menandai menu aktif
- ✅ `useRouter()` = pindah halaman lewat kode — `router.push("/tujuan")`, misalnya setelah form disimpan
- ✅ Keduanya diimpor dari `next/navigation` dan hanya jalan di komponen `"use client"`
- ❌ `next/router` adalah versi Pages Router — jangan dipakai di App Router

Materi pertemuan 03 selesai. Saatnya uji pemahaman di quiz, lalu kerjakan tugasnya di project-mu.
