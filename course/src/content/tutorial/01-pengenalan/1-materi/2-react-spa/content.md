---
type: lesson
title: React SPA
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /2-react-spa/index.html
focus: /2-react-spa/index.html
---

# React SPA

Jawaban atas masalah reload total: **SPA (Single-Page Application)**. Browser hanya memuat **satu** file HTML di awal — setelah itu, JavaScript yang mengganti isi halaman setiap kali kamu "pindah". Tidak ada reload lagi.

Contoh yang kamu pakai setiap hari: Gmail, Twitter/X. Dan library paling populer untuk membuat SPA: **React**.

## Lihat sendiri HTML-nya

Buka `2-react-spa/index.html` di panel File — inilah yang dikirim server ke browser:

```html
<body>
  <div id="root"></div>   ← KOSONG. Cuma wadah.
  <script src="main.js"></script>   ← kontennya disiapkan di sini
</body>
```

**Isinya kosong.** Lalu di mana konten "Tentang Kami"-nya? Buka **`2-react-spa/main.jsx`** — di situlah dia berada, di dalam JavaScript. JavaScript inilah yang nanti "menggambar" halaman di browser kamu.

## Kenapa ada dua file: `main.jsx` dan `main.js`?

Browser tidak mengerti sintaks JSX — dia hanya mengerti JavaScript biasa. Maka `main.jsx` (kode yang kamu tulis) harus **diterjemahkan** dulu menjadi `main.js` (kode yang dijalankan browser), dan `index.html` memuat `main.js` itulah.

Di proyek nyata, penerjemahan ini dikerjakan otomatis oleh alat bernama **bundler** — misalnya Vite atau Next.js. Kamu cukup menulis `main.jsx`, sisanya diurus alat tersebut. Buka `main.js` kalau penasaran seperti apa bentuk JSX setelah diterjemahkan.

## Masalah "kode diulang" juga terjawab

Ingat `<nav>` dan `<footer>` yang harus ditulis ulang di setiap file HTML? Di React, keduanya menjadi **komponen** — cukup ditulis sekali, lalu dipakai di mana-mana dengan menulis `<Nav />` atau `<Footer />`. Inilah kekuatan React yang kedua: bagian halaman dibuat sekali, dipakai berulang.

:::tip{title="Coba sekarang"}
Di preview sebelah, tunggu sampai konten muncul — kamu akan melihat urutannya: kosong → "Memuat..." → halaman tampil. Lalu klik **"Beranda" ↔ "Tentang"**: isi halaman berganti seketika, tanpa reload.
:::

Sekarang perhatikan **jam di bagian bawah halaman** saat kamu klik-klik menu tadi: angkanya **tidak berubah**. Bandingkan dengan lesson 1 — di sana setiap klik mengubah jamnya. Artinya apa? **Tidak ada permintaan baru ke server sama sekali.** Kedua halaman itu sudah ada di dalam JavaScript sejak awal — browser hanya menukar tampilannya.

Cara kerja ini namanya **CSR (Client-Side Rendering)** — *client* = browser kamu, dan dialah yang me-render halaman.

:::info{title="Istilah bonus: Virtual DOM"}
Nanti kalau kamu membaca artikel React, kamu akan sering menemukan istilah **Virtual DOM** — teknik internal React untuk mengganti isi halaman dengan cepat. Untuk sekarang cukup tahu bahwa "penukaran tampilan tanpa reload" tadi itulah yang dikerjakannya. Detailnya dibahas di pertemuan tentang React.
:::

## Masalahnya: Google tidak bisa membaca

Ingat di lesson sebelumnya — Google membaca file HTML yang dikirim server. Di sini, file itu isinya `<div>` kosong, dan Google tidak menunggu JavaScript menggambar isinya. Untuk blog, toko online, atau halaman promosi — ini fatal: kontenmu tidak tercatat di Google.

## Ringkasan

- ✅ Pindah halaman mulus — terasa seperti aplikasi, tidak ada reload
- ✅ Kode komponen tidak diulang — cukup ditulis sekali
- ❌ Pertama dibuka: **layar kosong** sambil menunggu JavaScript di-download dan dijalankan
- ❌ **Google sulit membaca** — yang Google lihat hanya `<div>` kosong

Jadi posisinya sekarang begini: HTML biasa isinya bisa dibaca Google, tapi pindah halamannya kasar — setiap klik harus reload total. SPA kebalikannya: pindah halamannya mulus, tapi isinya tidak bisa dibaca Google. *"Adakah cara yang bisa dua-duanya — pindah halaman mulus seperti aplikasi, DAN isinya tetap bisa dibaca Google?"* — ada. Di lesson berikutnya. 👉
