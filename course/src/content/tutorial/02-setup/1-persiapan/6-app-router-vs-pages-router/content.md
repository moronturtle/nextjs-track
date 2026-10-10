---
type: lesson
title: App Router dan Pages Router
template: baca
previews: false
terminal: false
focus: /project/app/about/page.tsx
---

# App Router dan Pages Router

Di pertemuan 01, kamu melihat bahwa folder di dalam `app/` menentukan alamat halaman. Route adalah jalur alamat yang menunjukkan halaman, misalnya `/tentang`. Cara Next.js mencocokkan alamat dengan halaman disebut **router**. App Router memakai folder `app/`; Pages Router adalah pola sebelumnya yang masih didukung.

Buka file contoh pada panel File, lalu cocokkan nama file dengan alamatnya.

## App Router: folder berisi `page.tsx`

Pada App Router, setiap route halaman memiliki file khusus bernama `page.tsx` di dalam folder route:

```text
app/
├── page.tsx                 → /
├── tentang/page.tsx         → /tentang
└── kontak/page.tsx          → /kontak
```

Contohnya, `app/tentang/page.tsx` menampilkan halaman di alamat `/tentang`. Nama file `page.tsx` tidak menjadi bagian URL.

App Router juga memakai `layout.tsx` untuk bagian yang digunakan bersama oleh beberapa halaman. `app/layout.tsx` adalah layout utama yang membungkus route di dalam `app/`.

## Pages Router: nama file menjadi route

Pada Pages Router, route halaman ditentukan oleh file di dalam folder `pages/`:

```text
pages/
├── index.tsx       → /
├── tentang.tsx     → /tentang
└── kontak.tsx      → /kontak
```

`pages/index.tsx` menjadi halaman utama. File `pages/tentang.tsx` menjadi halaman `/tentang`.

Pada pola ini, `pages/_app.tsx` digunakan untuk komponen bersama di halaman, sedangkan `pages/_document.tsx` mengatur struktur HTML awal.

## Mana yang dipakai?

App Router diperkenalkan pada Next.js 13 dan menjadi pilihan yang disarankan untuk project baru di panduan saat ini. Pages Router tetap didukung, jadi project lama tidak harus langsung dipindahkan.

Satu project boleh memiliki folder `app/` dan `pages/` selama masing-masing route berbeda. Jangan membuat dua file yang sama-sama menangani URL yang sama, misalnya `/tentang`, karena Next.js tidak bisa menentukan route mana yang harus dipakai.

| Alamat | App Router | Pages Router |
|---|---|---|
| Beranda | `app/page.tsx` | `pages/index.tsx` |
| Tentang | `app/tentang/page.tsx` | `pages/tentang.tsx` |
| Kontak | `app/kontak/page.tsx` | `pages/kontak.tsx` |

Project hasil setup tugas pertemuan 01 menggunakan App Router. Lanjutkan memakai folder `app/`; kamu tidak perlu membuat folder `pages/`.

## Ringkasan

- ✅ App Router menggunakan folder route dan file `page.tsx`.
- ✅ Pages Router menggunakan file halaman langsung di dalam `pages/`.
- ✅ Kedua router masih didukung, tetapi project baru dari `create-next-app` menggunakan App Router sebagai pilihan yang disarankan.
- ❌ Jangan membuat route yang sama di `app/` dan `pages/` sekaligus.

Materi selesai. Cek pemahamanmu di quiz, lalu lanjutkan project tugas pertemuan 01.
