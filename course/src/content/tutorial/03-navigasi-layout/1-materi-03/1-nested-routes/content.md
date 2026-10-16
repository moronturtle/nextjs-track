---
type: lesson
title: Nested routes
template: baca
previews: false
terminal: false
focus: /project/app/blog/artikel-pertama/page.tsx
---

# Nested routes — halaman di dalam halaman

Di pertemuan 01 kamu belajar aturan utamanya: **nama folder di dalam `app/` menjadi alamat halaman**. Sampai sekarang semua halamanmu sejajar — `/tentang`, `/kontak`, `/profil`. Tidak ada yang bertingkat.

Website sungguhan tidak seperti itu. Lihat alamat sebuah blog: `/blog` untuk daftar tulisan, lalu `/blog/artikel-pertama` untuk membaca satu tulisan. Alamat kedua adalah bagian dari alamat pertama — seperti kamar di dalam rumah. Inilah yang disebut **nested route**, artinya "route di dalam route".

## Folder di dalam folder

Cara membuatnya sesuai dugaanmu: taruh folder route di dalam folder route.

```text
app/
├── page.tsx                      → /
├── tentang/page.tsx              → /tentang
└── blog/
    ├── page.tsx                  → /blog
    ├── artikel-pertama/
    │   └── page.tsx              → /blog/artikel-pertama
    └── belajar-nextjs/
        └── page.tsx              → /blog/belajar-nextjs
```

Buka file-file di `project/app/blog/` pada panel File. Isinya file halaman biasa — tidak ada yang baru. Yang bertingkat hanya alamatnya; `page.tsx` tetap berisi isi halaman seperti biasa.

Aturannya juga tidak berubah: setiap folder menambah satu potongan alamat yang dipisah `/`. Nama `page.tsx` sendiri tidak ikut ke alamat.

:::tip{title="Folder boleh tidak punya page.tsx"}
Kalau `app/blog/` tidak punya `page.tsx`, alamat `/blog` tidak bisa dibuka — tapi `/blog/artikel-pertama` tetap jalan, selama foldernya sendiri punya `page.tsx`. Folder tanpa `page.tsx` juga berguna untuk menampung file pendukung, misalnya komponen yang dipakai beberapa halaman.
:::

## Kapan dipakai?

Susun folder mengikuti susunan alamat yang kamu mau. Halaman-halaman yang masih satu topik masuk ke folder yang sama:

```text
app/
├── blog/             → semua halaman blog ada di sini
├── dashboard/        → semua halaman dashboard ada di sini
└── tentang/          → halaman yang berdiri sendiri
```

Rapi bukan satu-satunya keuntungan. Di lesson berikutnya kamu akan lihat: folder juga bisa membawa `layout.tsx` sendiri — jadi semua halaman blog bisa dibungkus tampilan khusus yang tidak dipakai halaman lain.

## Ringkasan

- ✅ Nested route = folder route di dalam folder route; tiap folder menambah satu potongan alamat
- ✅ `page.tsx` harus ada di setiap alamat yang ingin bisa dibuka
- ✅ Folder tanpa `page.tsx` tidak jadi halaman, tapi folder di dalamnya tetap bisa jadi halaman

Menulis satu folder untuk setiap tulisan blog itu boros — bagaimana kalau tulisanmu ada 100? Lesson berikutnya menjawabnya dengan **route dinamis**.
