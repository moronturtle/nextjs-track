---
type: lesson
title: "Tugas: blog mini di project-mu"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: blog mini di project-mu

Tugas ini adalah **lanjutan dari project yang sama** — project tugas pertemuan 01 dan 02, yang sudah berisi halaman `/tentang`, `/kontak`, dan menu navigasi di `app/layout.tsx`.

Kali ini kamu menambahkan bagian blog: daftar tulisan, halaman tulisan dinamis, layout khusus blog, menu yang menandai halaman aktif, dan satu tombol yang memindahkan halaman lewat kode.

## Yang dikerjakan

### 1. Buat daftar tulisan di `/blog`

Buat `app/blog/page.tsx` berisi judul dan daftar minimal 3 tulisan. Setiap item adalah `<Link>` ke alamat tulisannya:

```tsx
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-4 list-disc pl-5 underline">
        <li><Link href="/blog/belajar-nextjs">Belajar Next.js</Link></li>
        <li><Link href="/blog/hal-baru">Hal baru yang saya pelajari</Link></li>
        <li><Link href="/blog/target-tahun-ini">Target tahun ini</Link></li>
      </ul>
    </main>
  );
}
```

Judul tulisan bebas, tapi di `href` tulis dalam bentuk slug: huruf kecil, kata dipisah tanda hubung.

### 2. Buat halaman tulisan dinamis

Buat `app/blog/[slug]/page.tsx`. Satu file ini menangani semua alamat `/blog/...` — potongan alamatnya dibaca lewat `params`:

```tsx
export default async function TulisanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{slug}</h1>
      <p className="mt-4">Isi tulisan bebas — tulis satu paragraf apa saja.</p>
    </main>
  );
}
```

Buka `http://localhost:3000/blog` lalu klik tiap link di daftar — alamat berubah dan slug yang sesuai tampil di halaman.

### 3. Tambahkan layout khusus blog

Buat `app/blog/layout.tsx` — pembungkus tambahan yang hanya dipakai halaman blog. Contohnya menampilkan baris kecil "Bagian: Blog" dengan link kembali ke daftar:

```tsx
import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <p className="bg-slate-100 px-6 py-2 text-sm text-slate-600">
        Bagian: Blog —{" "}
        <Link href="/blog" className="underline">
          semua tulisan
        </Link>
      </p>
      {children}
    </section>
  );
}
```

Ingat aturannya: layout ini **tidak boleh** punya `<html>` atau `<body>` — itu hanya milik `app/layout.tsx`.

### 4. Ubah menu menjadi komponen yang menandai halaman aktif

Pindahkan `<nav>` dari `app/layout.tsx` ke file baru `app/menu.tsx`. File ini memakai `usePathname`, jadi harus diawali `"use client"` — contoh lengkapnya ada di lesson `useRouter` dan `usePathname`. Link yang `href`-nya sama dengan alamat yang sedang dibuka diberi style berbeda — tebal, warna lain, atau garis bawah, bebas.

Di `app/layout.tsx`, hapus `<nav>` yang lama lalu panggil `<Menu />` di posisi yang sama (dengan `import Menu from "./menu";` di atas).

### 5. Tambahkan satu tombol dengan `useRouter`

Di halaman mana pun — misalnya `app/tentang/page.tsx` — tambahkan komponen tombol `"use client"` yang menjalankan `router.push("/")`, seperti `TombolBeranda` di materi.

### 6. Periksa hasilnya

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

Kalau project-mu memakai pnpm atau Yarn, sesuaikan perintahnya seperti di tugas 02.

Lalu jalankan project dan uji lewat browser:

- `/blog` tampil dan semua link tulisan bisa diklik
- halaman tulisan menampilkan slug yang sesuai alamat
- baris "Bagian: Blog" hanya muncul di halaman blog — tidak di `/tentang` atau `/kontak`
- link menu ke halaman yang sedang dibuka terlihat berbeda dari link lain
- tombol `useRouter` benar-benar memindahkan halaman tanpa link diklik

## Kriteria selesai

- [ ] Project yang digunakan sama dengan tugas pertemuan 01 dan 02
- [ ] `/blog` berisi daftar tulisan dan tiap item adalah `<Link>`
- [ ] `app/blog/[slug]/page.tsx` menampilkan slug dari alamat
- [ ] `app/blog/layout.tsx` menambahkan elemen yang hanya tampil di halaman blog
- [ ] Menu menjadi komponen `"use client"` dengan `usePathname` — link aktif punya style berbeda
- [ ] Ada minimal satu tombol yang memakai `useRouter`
- [ ] `npm run lint` dan `npx tsc --noEmit` selesai tanpa error

## Cara mengumpulkan

Sama seperti tugas 02 — lewat **pull request** di repo yang sama. Mulai dari branch utama yang terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-03
```

Simpan dan push pekerjaanmu:

```bash
git add .
git commit -m "Tugas 03"
git push -u origin tugas-03
```

Buka repo di GitHub, buat pull request dari `tugas-03` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]` — contoh: `budi_https://github.com/budi/nama-repo/pull/4`.

**[→ Buka thread pengumpulan tugas 03](/pengumpulan?t=tugas-03)**

Jangan menekan tombol merge dulu — tunggu mentor memeriksa dan menyetujui PR-mu. Setelah di-approve, kamu sendiri yang menekan **Merge pull request**, lalu samakan branch utama di komputermu:

```bash
git checkout main && git pull
```
