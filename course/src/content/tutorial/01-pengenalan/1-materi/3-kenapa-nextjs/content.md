---
type: lesson
title: Kenapa Next.js?
template: baca
previews: false
terminal: false
focus: /3-nextjs/app/page.tsx
---

# Kenapa Next.js?

Dari dua lesson tadi:

| | Kelebihan | Masalah |
|---|---|---|
| HTML biasa | Isi halaman langsung ada → bisa dibaca Google | Reload total, kode ditulis berulang |
| React SPA (CSR) | Pindah halaman mulus seperti aplikasi | HTML awal kosong → Google tidak melihat isinya |

:::info{title="Istilah: MPA"}
Cara HTML biasa ini sering disebut **MPA (Multi-Page Application)** — "aplikasi banyak halaman" — karena setiap halaman adalah file `.html` tersendiri. Dia kebalikan dari SPA yang hanya punya satu halaman.
:::

**Next.js = React + SSR (Server-Side Rendering)** — mengambil kelebihan keduanya, membuang kekurangannya.

## Kodenya sama, tempat jalannya beda

Lihat struktur `3-nextjs/` di panel File — ini bentuk project Next.js sungguhan:

```text
3-nextjs/app/
├── layout.tsx           ← membungkus SEMUA halaman
├── page.tsx             ← halaman /
├── tentang/page.tsx     ← halaman /tentang
└── dashboard/page.tsx   ← halaman /dashboard
```

Buka `app/tentang/page.tsx` — isinya **hanya konten halaman**, sama persis dengan komponen `Tentang` di `main.jsx` kemarin. Ke mana perginya `<nav>` dan `<footer>`? Mereka tinggal di **`app/layout.tsx`** — ditulis **sekali** dan otomatis membungkus semua halaman. Ingat masalah kode diulang di lesson 1? Di Next.js itulah jawabannya.

Dan folder `tentang/` itu sendiri menentukan alamatnya — `app/tentang/page.tsx` menjadi halaman `/tentang`. Itulah routing di Next.js.

Di `layout.tsx` ada juga baris `const waktu` — jam dihitung di server **setiap ada request ke halaman mana pun**, persis seperti `{{WAKTU}}` di lesson 1. Bedanya: di sini yang di-render bukan satu placeholder teks, melainkan **seluruh komponen React**.

## SSR — server yang menggambar

![Alur SSR](/diagrams/ssr.svg)

Kontennya sudah menjadi HTML sebelum sampai browser → langsung tampil → Google bisa membacanya. Dan kode React-nya tetap ikut → setelah jalan, halaman menjadi interaktif seperti SPA.

:::info{title="Hydration"}
Bagian "React dipasang diam-diam" itu namanya **hydration** — HTML statis "dihidupkan" menjadi interaktif. Detailnya nanti. Yang penting: **konten sudah ada duluan sebelum React jalan**.
:::

## SEO — artinya "mudah ditemukan di Google"

Dari tadi kita bilang "Google bisa membaca". Istilah resminya: **SEO (Search Engine Optimization)** — usaha membuat halamanmu mudah ditemukan orang yang mencari di Google.

Penting atau tidaknya SEO tergantung jenis halamanmu:

- **Perlu SEO** → blog, toko online, portal berita, landing page. Halaman publik yang harus ditemukan orang yang belum tahu alamatmu.
- **Tidak perlu SEO** → dashboard internal, panel admin, aplikasi setelah login. Penggunanya sudah tahu alamatnya dan sudah masuk — tidak ada yang mencarinya di Google.

## Kapan CSR, kapan SSR?

Aturan praktisnya sederhana:

- **SSR** untuk halaman yang isinya harus dibaca Google dan tampil seketika — halaman produk, artikel, profil toko.
- **CSR** untuk halaman yang sangat interaktif dan tidak perlu dicari — dashboard penuh grafik, editor teks, keranjang belanja.

## Next.js bisa dua-duanya — lihat buktinya di kode

Dalam satu project Next.js, kamu memutuskan **per halaman** mana yang dirender di mana:

- `app/page.tsx` dan `app/tentang/page.tsx` — komponen biasa → **di-render di server**: konten langsung tampil dan bisa dibaca Google.
- `app/dashboard/page.tsx` — diawali `'use client'` di baris pertama → **React-nya berjalan di browser**: untuk halaman yang sangat interaktif.

Buka `3-nextjs/app/dashboard/page.tsx` — dashboard penjualan dengan tombol yang menambah angka. Interaksi seperti ini harus hidup di browser, jadi ditandai `'use client'` — **inilah CSR di dalam Next.js**:

```tsx
"use client"; // ← penanda: komponen ini hidup di browser

const [terjual, setTerjual] = useState(0);
```

Contoh nyata di satu toko online: **halaman katalog produk** dirender di server (perlu ditemukan Google), sementara **dashboard penjualan pemilik toko** berjalan di client (penuh klik dan grafik, tidak perlu SEO). Keduanya hidup di satu project Next.js yang sama.

## CSR vs SSR — head to head

Sebagai perbandingan, ini alur CSR (yang kamu lihat di lesson sebelumnya):

![Alur CSR](/diagrams/csr.svg)

| | CSR (React SPA) | SSR (Next.js) |
|---|---|---|
| Yang menggambar halaman | Browser pengunjung | Server |
| Pertama kali terlihat | Menunggu JS di-download + jalan | Langsung (HTML sudah jadi) |
| Yang dilihat Google | `<div>` kosong | Konten lengkap |
| Beban kerja | Di device pengunjung (lemot kalau HP-nya tidak kencang) | Di server (kamu yang kendalikan) |
| Koneksi lambat | Makin parah — JS belum selesai di-download | HTML kecil, tetap cepat |

## Jadi, kenapa Next.js?

1. **Interaktif seperti React** — komponen, state, dan seluruh ekosistem React bisa dipakai
2. **Kontennya bisa dibaca Google** — HTML-nya sudah jadi dari server
3. **Bisa memilih per halaman, bahkan per komponen** — SSR dan CSR dalam satu project
4. **Plus bonus-bonusnya** — routing dari struktur folder, optimasi gambar, API endpoint, deploy sekali klik (dibahas satu per satu di pertemuan berikutnya)

## Tabel ringkas

| | HTML biasa (MPA) | React SPA (CSR) | Next.js (SSR) |
|---|---|---|---|
| Halaman digambar di mana | Server (file statis) | Browser kamu | Server, lalu "dihidupkan" di browser |
| Pertama dibuka | Langsung terlihat | Kosong, menunggu JS | Langsung terlihat |
| Pindah halaman | Reload total | Mulus | Mulus |
| Muncul di Google | Mudah | Sulit | Mudah |
| Interaktif | Sulit | Bisa | Bisa |

---

Sekarang kita **buktikan sendiri** semua klaim ini — pakai React SPA dan Next.js yang berjalan sungguhan. 👉
