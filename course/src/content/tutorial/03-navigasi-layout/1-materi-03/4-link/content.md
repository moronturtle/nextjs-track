---
type: lesson
title: Komponen Link
template: baca
previews: false
terminal: false
focus: /project/app/layout.tsx
---

# Link — pindah halaman tanpa reload

Di tugas 02 kamu sudah memasang `<Link>` dari `next/link` di menu navigasi. Kenapa tidak pakai `<a>` biasa? Jawabannya kembali ke dua masalah dari pertemuan 01:

| | Kelebihan | Masalah |
|---|---|---|
| HTML biasa | Isi halaman langsung ada → bisa dibaca Google | Pindah halaman = reload total |
| React SPA | Pindah halaman mulus tanpa reload | HTML awal kosong → tidak bisa dibaca Google |

`<Link>` mengambil kelebihan dua-duanya. Halaman **pertama** yang dibuka tetap tiba sebagai HTML lengkap dari server — isinya bisa dibaca Google. Tapi saat pengunjung mengklik `<Link>`, Next.js mengganti isi halaman langsung di browser — tanpa reload penuh, seperti SPA. Alamat di address bar tetap berubah dengan benar, dan tombol back browser tetap berfungsi.

## Bedanya di kode nyaris tidak terlihat

Buka `project/app/layout.tsx` di panel File. Menu navigasinya berisi `Link` seperti ini:

```tsx
<nav className="flex gap-4 border-b p-4">
  <Link href="/">Beranda</Link>
  <Link href="/tentang">Tentang</Link>
  <Link href="/blog">Blog</Link>
</nav>
```

Kalau ditulis dengan `<a href="/tentang">`, tampilannya sama persis — bedanya baru terasa saat diklik.

:::tip{title="Buktikan di project-mu"}
Jalankan dev server, buka halaman mana pun, lalu buka tab **Network** di DevTools browser. Klik link menu:

- Link `<a>` biasa → terlihat dokumen HTML baru dimuat dari awal.
- `<Link>` → tidak ada dokumen HTML baru; hanya data halaman tujuan yang diambil.

Kalau belum yakin, ganti sementara satu `<Link>` di menu menjadi `<a>`, ulangi percobaan di atas, lalu kembalikan.
:::

## Link hanya untuk alamat di dalam project

`<Link>` mengatur pindah halaman di dalam project-mu sendiri. Untuk tujuan di luar website — misalnya `https://github.com/namamu` — tetap pakai `<a>` biasa, karena halaman luar memang harus dimuat dari awal. Contohnya ada di `project/app/kontak/page.tsx`.

## Prefetch — kenapa klik terasa seketika

Ada satu hal lagi yang dikerjakan `<Link>` tanpa kamu sadari: **prefetch**, artinya "mengambil lebih dulu". Saat sebuah `<Link>` tampil di layar, Next.js diam-diam menyiapkan halaman tujuannya. Saat kamu klik, isinya sudah siap — jadi pindahnya terasa seketika. Semuanya otomatis, tidak perlu diatur.

## Ringkasan

- ✅ `<Link>` = pindah halaman di dalam project tanpa reload penuh; halaman pertama tetap HTML lengkap
- ✅ Prefetch otomatis menyiapkan halaman tujuan sebelum diklik — klik terasa seketika
- ✅ `<a>` tetap dipakai untuk alamat di luar project-mu
- ❌ Jangan pakai `<Link>` untuk link keluar — halaman luar tidak bisa disiapkan Next.js

`<Link>` bekerja saat pengunjung mengklik. Tapi kadang yang memindahkan halaman adalah kode, bukan klik — dan menu perlu tahu alamat yang sedang dibuka. Lesson terakhir pertemuan ini: `useRouter` dan `usePathname`.
