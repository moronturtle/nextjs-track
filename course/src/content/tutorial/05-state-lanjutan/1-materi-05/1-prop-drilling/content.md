---
type: lesson
title: Pertemuan 05 — Prop drilling
template: baca
previews: false
terminal: false
focus: /project/components/header.tsx
---

# Saat props harus diteruskan berulang

Di pertemuan 04, kita belajar mengirim data dari parent ke anak lewat props. Cara ini cocok kalau hanya perlu melewati satu atau dua komponen.

Sekarang bayangkan nama pengguna yang sudah masuk ke website perlu tampil di menu halaman. Data nama dibuat di `layout.tsx`, tetapi tulisan nama ditampilkan oleh `MenuProfil`.

Susunan komponennya seperti ini:

```text
layout.tsx
└── Header
    └── MenuProfil  ← menampilkan nama pengguna
```

`Header` berada di antara `layout.tsx` dan `MenuProfil`. Karena props hanya dikirim dari parent ke anak, `layout.tsx` harus mengirim nama ke `Header`. Lalu `Header` harus mengirim nama yang sama ke `MenuProfil`.

## Lihat aliran datanya

Buka tiga file di panel File:

- `app/layout.tsx` — membuat nilai nama dan mengirimkannya ke `Header`.
- `components/header.tsx` — menerima nama, lalu meneruskannya ke `MenuProfil`.
- `components/menu-profil.tsx` — menerima nama dan menampilkannya.

Perhatikan tempat file-nya. `layout.tsx` tetap di `app/` karena file itu bagian dari routing. `Header` dan `MenuProfil` ada di `components/` — folder untuk komponen yang dipakai oleh bagian lain. Aturan gampangnya: `app/` untuk `page.tsx` dan `layout.tsx`, `components/` untuk komponen.

Di `components/header.tsx`, perhatikan bahwa `Header` tidak menggunakan nama itu untuk tampilannya sendiri:

```tsx
export default function Header({ namaUser }: { namaUser: string }) {
  return (
    <header>
      <span>Blog Saya</span>
      <MenuProfil namaUser={namaUser} />
    </header>
  );
}
```

`Header` hanya menerima `namaUser` lalu mengirimnya lagi ke `MenuProfil`.

Kalau ada banyak komponen di antara sumber data dan pemakainya, semua komponen perantara harus menerima dan meneruskan props yang sama. Cara meneruskan props melalui banyak komponen seperti ini disebut **prop drilling**.

## Kapan prop drilling terasa merepotkan?

Prop drilling bukan selalu masalah. Mengirim props ke anak secara langsung adalah cara yang wajar.

Prop drilling mulai merepotkan kalau:

- Banyak komponen perantara harus meneruskan data yang tidak mereka pakai.
- Nama atau bentuk data berubah, sehingga banyak file perlu ikut diedit.
- Kamu harus membuka banyak file untuk mencari asal data.

Contoh data yang mungkin dibutuhkan banyak bagian website adalah nama pengguna, tema warna, atau bahasa tampilan.

:::tip{title="Coba di project-mu"}
Salin ketiga file ini ke project-mu, lalu jalankan `npm run dev`. Ganti nilai `namaUser` di `layout.tsx` dari `"Budi"` ke namamu. Nama baru muncul di `MenuProfil` — melewati `Header` yang tidak memakainya.
:::

## Ringkasan

- ✅ Props mengirim data dari parent ke anak.
- ✅ Meneruskan props melalui banyak komponen disebut prop drilling.
- ✅ Props tetap cocok untuk hubungan parent-anak yang dekat.
- ❌ Jangan membuat komponen perantara menerima props yang tidak dipakainya jika rantainya sudah panjang.

Berikutnya, kita pelajari Context. Context membantu komponen membaca data tanpa harus meneruskan props melalui setiap komponen perantara.
