---
type: lesson
title: Nested routes
template: baca
previews: false
terminal: false
focus: /project/app/blog/artikel-pertama/page.tsx
---

# Nested routes — halaman bertingkat

Di pertemuan 01 kamu belajar aturan utamanya: **nama folder di dalam `app/` menjadi alamat halaman**. Sejauh ini semua halamanmu sejajar — `/tentang`, `/kontak`, `/profil`.

Website sungguhan jarang datar seperti itu. Alamatnya bertingkat: `/blog` berisi daftar tulisan, lalu `/blog/artikel-pertama` untuk membuka satu tulisan. Bagian `/blog/artikel-pertama` adalah "anak" dari `/blog` — inilah yang disebut **nested route** (route bersarang: route di dalam route).

## Folder di dalam folder

Caranya persis seperti dugaanmu — taruh folder route di dalam folder route:

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

Buka file-file di `project/app/blog/` pada panel File. Isinya komponen halaman biasa — tidak ada yang spesial. Yang bertingkat hanya alamatnya; file `page.tsx` tetap berisi isi halaman seperti biasa.

Aturannya tidak berubah: setiap tingkat folder menambah satu potongan alamat yang dipisah `/`, dan nama `page.tsx` tidak ikut ke URL.

:::tip{title="Folder boleh tanpa page.tsx"}
Kalau `app/blog/` tidak punya `page.tsx`, alamat `/blog` tidak bisa dibuka — tapi `/blog/artikel-pertama` tetap jalan selama foldernya sendiri punya `page.tsx`. Folder tanpa `page.tsx` juga aman untuk mengelompokkan file pendukung, misalnya komponen yang dipakai beberapa halaman.
:::

## Kapan dipakai?

Susun folder mengikuti susunan alamat yang kamu mau. Halaman yang menjadi bagian suatu section masuk ke folder section itu:

```text
app/
├── blog/             → semua halaman blog tinggal di sini
├── dashboard/        → semua halaman dashboard tinggal di sini
└── tentang/          → halaman lepas
```

Keuntungannya bukan cuma alamat rapi — di lesson berikutnya kamu akan lihat bahwa folder juga bisa membawa `layout.tsx` sendiri, jadi satu section bisa punya bingkai khusus.

## Ringkasan

- ✅ Nested route = folder route di dalam folder route; tiap tingkat menambah satu potongan alamat
- ✅ `page.tsx` tetap wajib ada di tingkat yang ingin bisa dibuka — tanpa file itu, alamatnya tidak hidup
- ✅ Folder tanpa `page.tsx` tidak jadi route, tapi anak-anaknya tetap bisa jadi route

Menulis satu folder untuk setiap tulisan blog masih boros — bagaimana kalau tulisanmu ada 100? Lesson berikutnya menjawab itu dengan **route dinamis**.
