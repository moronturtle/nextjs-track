---
type: lesson
title: Kenapa Next.js?
template: baca
previews: false
terminal: false
focus: /3-nextjs/app/page.tsx
---

# Kenapa Next.js?

Dari dua lesson sebelumnya:

| | Kelebihan | Masalah |
|---|---|---|
| HTML biasa | Isi halaman langsung ada → bisa dibaca Google | Reload total, kode ditulis berulang |
| React SPA (CSR) | Pindah halaman mulus seperti aplikasi | HTML awal kosong → Google tidak melihat isinya |

:::info{title="Istilah: MPA"}
 **MPA (Multi-Page Application)** — "aplikasi dengan banyak halaman" — karena setiap halaman adalah file `.html` tersendiri. MPA adalah kebalikan dari SPA yang hanya punya satu halaman.
:::

**Next.js = React + SSR (Server-Side Rendering)** — mengambil kelebihan keduanya: pindah halaman mulus seperti SPA, tapi isinya tetap bisa dibaca Google seperti HTML biasa.

## Kode React-nya sama — bedanya dijalankan di server

Komponen `Nav`, `Beranda`, `Tentang`, `Footer` yang kamu tulis di `main.jsx` kemarin dipakai juga di Next.js — kodenya tidak berubah. Yang berubah: React-nya dijalankan **di server**, sebelum hasilnya dikirim ke browser.

Lihat struktur `3-nextjs/` di panel File — ini bentuk project Next.js sungguhan:

```text
3-nextjs/app/
├── layout.tsx           ← membungkus SEMUA halaman
├── page.tsx             ← halaman /
├── tentang/page.tsx     ← halaman /tentang
└── dashboard/page.tsx   ← halaman /dashboard
```

Buka `app/tentang/page.tsx` — isinya **hanya konten halaman**, sama persis dengan komponen `Tentang` di `main.jsx` kemarin.

Lalu ke mana `<nav>` dan `<footer>`? Buka **`app/layout.tsx`** — keduanya ada di sana, ditulis **sekali**. File ini otomatis membungkus semua halaman: `{children}` di dalamnya adalah tempat isi halaman ditampilkan. Ingat masalah kode yang ditulis berulang di lesson 1? Di sinilah Next.js menjawabnya.

Folder `tentang/` juga bukan sekadar folder — namanya menentukan alamat halaman. `app/tentang/page.tsx` otomatis menjadi halaman di `/tentang`. Itulah cara kerja routing di Next.js.

Terakhir, perhatikan baris `const waktu` di `layout.tsx` — jamnya dihitung di server setiap ada request, persis seperti `{{WAKTU}}` di lesson 1. Bedanya: di sini yang dirender bukan satu placeholder teks, melainkan **seluruh komponen React**.

## SSR — server yang membuat halaman

![Alur SSR](/diagrams/ssr.svg)

Kontennya sudah menjadi HTML sebelum sampai browser → langsung tampil → Google bisa membacanya. Dan kode React-nya tetap ikut → setelah jalan, halaman menjadi interaktif seperti SPA.

:::info{title="Hydration"}
Bagian "React dipasang diam-diam" itu namanya **hydration** — HTML statis "dihidupkan" menjadi interaktif. Detailnya nanti. Yang penting: **konten sudah ada duluan sebelum React jalan**.
:::

## SEO — artinya "mudah ditemukan di Google"

Dari tadi kita bilang "Google bisa membaca". Istilah resminya: **SEO (Search Engine Optimization)** — usaha mengoptimasi website supaya halamannya muncul tinggi di hasil pencarian Google.

Penting atau tidaknya SEO tergantung jenis halamanmu:

- **Perlu SEO** → blog, toko online, portal berita, landing page. Halaman publik yang harus ditemukan orang yang belum tahu alamatmu.
- **Tidak perlu SEO** → dashboard internal, panel admin, aplikasi setelah login. Penggunanya sudah tahu alamatnya dan sudah masuk — tidak ada yang mencarinya di Google.

## SEO di Next.js — tinggal isi `metadata`

Hal paling dasar untuk SEO adalah memberi tahu Google **judul dan deskripsi** halamanmu. Di Next.js cukup satu objek `metadata`:

```tsx
// app/layout.tsx — berlaku untuk semua halaman
export const metadata = {
  title: "Toko Roti Kecil — Roti Segar Setiap Pagi",
  description: "Toko roti di Bandung. Semua roti dibuat segar setiap pagi.",
};
```

Keduanya inilah yang tampil saat halamanmu muncul di Google: `title` menjadi **judul hasil pencarian** (teks yang diklik orang untuk masuk ke halamanmu), `description` menjadi **ringkasan** di bawah judul itu. Karena halaman dirender di server, metadata ini ikut dalam HTML pertama — langsung terbaca Google. Setiap `page.tsx` juga bisa menulis `metadata`-nya sendiri, jadi tiap halaman bisa punya judul dan deskripsi berbeda.

:::warning{title="SSR bukan jaminan langsung masuk Google"}
SSR hanya membantu satu hal: isi halamanmu jadi bisa dibaca Google. Tapi supaya halamanmu benar-benar muncul di pencarian, Google harus tahu dulu bahwa situsmu ada. Bagaimana Google bisa tahu? Begitu ada satu link ke situsmu di mana pun di internet — di website orang lain, media sosial, atau forum — Google mengikuti link itu dan sampailah dia ke situsmu. Jadi mendaftarkan situs sebenarnya tidak wajib. Meski begitu, daftar ke **Google Search Console** sangat dianjurkan: halaman baru ditemukan lebih cepat, kamu bisa mengirim sitemap, dan dapat laporan kata kunci serta error.

Dan ingat — bisa dibaca bukan berarti langsung di peringkat atas. Urutan hasil pencarian ditentukan hal-hal lain: tulisanmu bagus dan unik atau tidak, banyak yang berkunjung atau tidak, ada website lain yang merekomendasikan situsmu atau tidak, dan seberapa ramai pesaing di kata kunci yang kamu bidik. Teknologi cuma membuka pintu — sisanya tetap kerja di konten dan promosi.
:::

## Kapan CSR, kapan SSR?

Aturan praktisnya sederhana: **lihat siapa yang harus bisa membaca halamanmu.**

- **Pilih SSR** untuk halaman yang harus mudah ditemukan lewat pencarian Google — isinya harus terbaca sejak HTML pertama diterima:
  - halaman produk dan kategori di toko online (e-commerce)
  - artikel blog, portal berita, halaman dokumentasi
  - landing page, halaman promo, profil bisnis
- **Pilih CSR** untuk halaman yang sangat interaktif dan tidak perlu dicari lewat Google — penggunanya datang langsung, biasanya sudah login:
  - dashboard admin, panel penjualan, grafik analitik
  - editor teks, kanvas gambar, aplikasi chat
  - keranjang belanja dan halaman checkout

## Next.js bisa dua-duanya — lihat buktinya di kode

Dalam satu project Next.js, kamu memutuskan **per halaman** mana yang dirender di mana:

- `app/page.tsx` dan `app/tentang/page.tsx` — komponen biasa → **dirender di server**: konten langsung tampil dan bisa dibaca Google.
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
| Yang membuat HTML halaman | Browser pengunjung | Server |
| Pertama kali terlihat | Menunggu JS di-download + jalan | Langsung (HTML sudah jadi) |
| Yang dilihat Google | `<div>` kosong | Konten lengkap |
| Beban kerja | Di perangkat pengunjung (lemot kalau HP-nya tidak kencang) | Di server (kamu yang kendalikan) |
| Koneksi lambat | Makin parah — JS belum selesai di-download | HTML kecil, tetap cepat |

## Jadi, kenapa Next.js?

1. **Interaktif seperti React** — komponen, state, dan seluruh ekosistem React bisa dipakai
2. **Kontennya bisa dibaca Google** — HTML-nya sudah jadi dari server
3. **Bisa memilih per halaman, bahkan per komponen** — SSR dan CSR dalam satu project
4. **Plus bonus-bonusnya** — routing dari struktur folder, optimasi gambar, API endpoint, deploy sekali klik (dibahas satu per satu di pertemuan berikutnya)

## Tabel ringkas

| | HTML biasa (MPA) | React SPA (CSR) | Next.js (SSR) |
|---|---|---|---|
| Halaman dibuat di mana | Server (file statis) | Browser kamu | Server, lalu "dihidupkan" di browser |
| Pertama dibuka | Langsung terlihat | Kosong, menunggu JS | Langsung terlihat |
| Pindah halaman | Reload total | Mulus | Mulus |
| Muncul di Google | Mudah | Sulit | Mudah |
| Interaktif | Sulit | Bisa | Bisa |

---

Sekarang kita lihat langsung project **Next.js** sungguhan — bagaimana routing, layout, dan halaman diatur lewat struktur foldernya. 👉
