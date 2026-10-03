# 01 — Pengenalan Next.js & Ekosistemnya

> HTML itu apa → SPA itu apa → React & CSR → masalahnya apa → SSR → Next.js. Lalu struktur folder & routing.

## Tujuan belajar

Setelah pertemuan ini kamu bisa:

- Menjelaskan HTML, SPA, CSR, SSR, dan SEO dengan bahasa sendiri
- Membandingkan cara HTML biasa, React SPA, dan Next.js menampilkan halaman
- Mengenal ekosistem Next.js: App Router, Server Components, dan file conventions
- Membuat route statis baru sendiri

## Prasyarat

- Pernah menulis HTML dan sedikit JavaScript
- React dasar: tahu komponen dan JSX itu apa — nggak perlu jago
- Browser (buat StackBlitz), atau Node.js 20.9+ kalau mau jalanin di lokal

---

## Materi

### Bagian 1 — Kenalan dulu sama istilahnya

**HTML — fondasi semua halaman web**

HTML (HyperText Markup Language) = bahasa untuk menulis struktur halaman web: judul, paragraf, gambar, tombol, link. Browser membaca file `.html` lalu menampilkannya jadi halaman yang kamu lihat.

```html
<h1>Selamat Datang</h1>        <!-- judul besar -->
<p>Ini sebuah paragraf.</p>    <!-- teks biasa -->
<a href="/kontak">Kontak</a>   <!-- link -->
```

Yang penting diingat: **semua website ujung-ujungnya adalah HTML**. React dan Next.js juga menghasilkan HTML — bedanya cuma *siapa yang merangkai* dan *di mana*.

**SPA — satu HTML untuk semua halaman**

SPA (Single-Page Application) = pola bikin web di mana browser hanya memuat **satu** file HTML di awal. Setelah itu, "pindah halaman" tidak minta file baru — JavaScript yang mengganti isinya di tempat.

Lawan katanya: **MPA** (Multi-Page Application) — tiap halaman file sendiri, klik link = muat file baru dari awal. Website HTML biasa itu MPA.

Contoh SPA yang kamu kenal: Gmail, Twitter/X — klik-klik terus tapi layar nggak pernah reload penuh.

**React — library untuk membangun tampilan**

React = library JavaScript untuk membangun tampilan web dari potongan kecil bernama *komponen* — tombol, kartu, navbar — yang bisa dipakai ulang kayak lego.

React app umumnya dibuat sebagai **SPA**: server kirim wadah kosong + JavaScript, lalu React menggambar halaman **di browser kamu**. Cara ini namanya **CSR (Client-Side Rendering)** — *client* = browser kamu, *rendering* = proses menggambar halaman.

### Bagian 2 — Masalahnya: CSR dan SEO

CSR nyaman setelah halaman jalan — tapi ada dua masalah besar di awal.

**Masalah 1 — lambat dibuka pertama kali.** Layar kosong sambil nunggu JavaScript turun dan jalan. Di HP + sinyal lemot, terasa banget.

**Masalah 2 — SEO.**

**SEO (Search Engine Optimization)** = usaha supaya halamanmu gampang ditemukan Google dan muncul di hasil pencarian.

Cara kerja Google, versi singkat: dia kirim "robot" (namanya *crawler*) yang membaca file HTML halamanmu — judulnya apa, isinya apa — lalu mencatatnya. Kalau HTML-mu berisi konten, robot paham dan bisa menampilkannya di hasil pencarian.

Nah, masalah React SPA — yang robot baca cuma ini:

```html
<div id="root"></div>
<script src="/bundle.js"></script>
```

Kosong. Robot nggak sabar menunggu JavaScript jalan → kontenmu tidak tercatat → susah muncul di Google. Buat blog, toko online, atau halaman campaign — ini fatal.

### Bagian 3 — Solusinya: SSR, dan di situlah Next.js berdiri

**SSR (Server-Side Rendering)** = halaman digambar **di server**, bukan di browser. Server merangkai HTML lengkap berisi konten, baru dikirim.

**Next.js = React + SSR.** Tetap React — komponen, JSX, cara nulisnya sama — cuma proses menggambarnya pindah ke server:

```
kamu buka halaman
  → server: React digambar jadi HTML lengkap → dikirim
  → browser: langsung tampil → robot Google bisa baca ✅, user nggak nunggu ✅
  → React dipasang diam-diam → tombol & link jadi hidup ✅
  → klik halaman berikutnya: instan kayak SPA ✅
```

Langkah "React dipasang ke HTML yang sudah jadi" itu namanya *hydration* — nggak perlu dihafal, dibahas lagi di pertemuan 05.

### Tabel ringkas

| | HTML biasa (MPA) | React SPA (CSR) | Next.js (SSR) |
|---|---|---|---|
| Halaman digambar di mana | Server (file statis) | Browser kamu | Server, lalu "dihidupkan" di browser |
| Pertama dibuka | Langsung kelihatan | Kosong, nunggu JS | Langsung kelihatan |
| Pindah halaman | Reload total | Mulus | Mulus |
| Muncul di Google | Gampang | Susah | Gampang |
| Interaktif | Susah | Bisa | Bisa |
| Pindah halaman diatur oleh | File `.html` per halaman | `react-router` (pasang sendiri) | File-based (`app/`, bawaan) |

### Buktiin sendiri — dua trik

**Trik 1 — View Page Source.** Buka website apa pun → klik kanan → *View Page Source*. Kalau isi kontennya kelihatan = digambar di server. Kalau cuma ada `<div id="root">` kosong = React SPA.

**Trik 2 — matikan JavaScript.** Di Chrome: `Ctrl+Shift+P` → ketik *"Disable JavaScript"* → reload. Halaman jadi kosong total = CSR (tanpa JS nggak ada apa-apa). Halaman tetap tampil tapi tombol mati = SSR.

Di repo ini sudah disiapkan `demo-spa/` — React SPA murni buat dibandingkan langsung dengan `starter/` (Next.js). Buka dua-duanya, coba dua trik di atas.

### Ekosistem Next.js

Sekarang kamu tahu Next.js = React + SSR. Tapi dia lebih dari itu — ini "kotak perkakas"-nya:

- **App Router** — sistem routing modern Next.js (default sekarang). Semua materi di track ini pakai App Router.
- **Server Components** — komponen React yang digambar di server. Default di `app/` — detailnya di pertemuan 04.
- **`next/image` & `next/font`** — optimisasi gambar & font otomatis. Pertemuan 07.
- **Route Handlers (`route.ts`)** — bikin REST API di project yang sama, tanpa backend terpisah. Pertemuan 06.
- **Vercel** — platform deploy buatan tim Next.js (paling mulus, tapi Next.js bisa jalan di mana pun ada Node.js). Pertemuan 08.

### Struktur folder

```
starter/
├── app/
│   ├── layout.tsx      ← bingkai bersama semua halaman (navbar, footer, dsb.)
│   ├── page.tsx        ← halaman "/"
│   ├── globals.css     ← CSS global (Tailwind di-import di sini)
│   └── quiz/           ← bonus dari mentor: quiz interaktif di /quiz
├── public/             ← file statis: gambar, favicon
├── next.config.ts      ← konfigurasi Next.js
├── package.json        ← daftar dependency & script
└── tsconfig.json       ← konfigurasi TypeScript
```

### File conventions — nama file yang punya "kekuatan khusus"

Di dalam `app/`, nama file menentukan perilaku route:

| File | Fungsi |
|------|--------|
| `page.tsx` | UI halaman — **file inilah yang bikin route bisa diakses** |
| `layout.tsx` | UI bersama yang membungkus `page.tsx` dan semua route di bawahnya |
| `loading.tsx` | UI loading otomatis saat halaman sedang disiapkan |
| `error.tsx` | Penangkap error per segmen — error di satu halaman nggak merusak seluruh app |
| `not-found.tsx` | Halaman 404 |
| `route.ts` | API endpoint (bukan halaman) |

> Folder tanpa `page.tsx` **nggak bisa diakses** sebagai URL — berguna buat naro komponen pembantu di dalam `app/` tanpa bikin route baru.

### Routing = struktur folder

Folder di dalam `app/` langsung memetakan ke URL:

```
app/page.tsx                → /
app/tentang/page.tsx        → /tentang
app/blog/page.tsx           → /blog
app/blog/[slug]/page.tsx    → /blog/apa-saja   (dinamis — pertemuan 03)
```

`page.tsx` cuma file biasa yang export satu komponen default:

```tsx
// app/tentang/page.tsx
export default function TentangPage() {
  return <h1>Tentang Kami</h1>;
}
```

Layout juga file biasa — `children` adalah halaman yang sedang diakses:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```

---

## Coba sekarang

**Starter** (kerjakan latihan di sini):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/USERNAME/REPO/tree/main/01-pengenalan/starter)

**Demo SPA** (React murni — buat perbandingan view source & disable JS):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/USERNAME/REPO/tree/main/01-pengenalan/demo-spa)

**Final** (hasil akhir — jangan diintip sebelum nyoba):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/USERNAME/REPO/tree/main/01-pengenalan/final)

> **Catatan StackBlitz:** script `dev` pakai `next dev --webpack` karena Turbopack belum didukung WebContainers. Kalau jalanin di lokal, boleh diganti `next dev` biasa — lebih cepat.

## Latihan

Kerjakan di `starter/`. Tiap langkah ditandai komentar `TODO` di `app/page.tsx`:

1. **Eksperimen dulu** — buka `demo-spa/` dan `starter/` di dua tab StackBlitz. View source keduanya, lalu matikan JavaScript dan reload. Bedanya apa? (Ini jawaban langsung dari materi Bagian 2–3.)
2. **Pemanasan** — edit teks di `app/page.tsx`, simpan, lihat perubahannya langsung di preview (hot reload).
3. **Route `/tentang`** — bikin `app/tentang/page.tsx` berisi halaman tentang sederhana.
4. **Route `/blog`** — bikin `app/blog/page.tsx` berisi daftar 3 judul artikel (hardcode dulu).
5. **Route `/kontak`** — bikin `app/kontak/page.tsx` berisi info kontak.
6. **Bonus** — ubah `title` dan `description` di `metadata` pada `app/layout.tsx`, cek di tab browser.

**Cara verifikasi:** ketik URL-nya langsung di preview StackBlitz, misal `/tentang`. Kalau halamannya muncul, routing-mu benar. Kalau 404, cek lagi nama folder & file-nya — harus persis `page.tsx` di dalam folder `tentang/`.

## Tugas & Quiz

- 🧠 **Quiz interaktif** — buka `/quiz` di starter yang sedang jalan. Jawab, langsung tahu benar/salah + skor. (Versi teks ada di [quiz.md](./quiz.md).)
- 📋 [Tugas pertemuan 01](./tugas/README.md) — mini site profil 3 halaman

## Selanjutnya

**02 — Setup Project & Tools:** kamu akan belajar `create-next-app` dari nol, menyiapkan ESLint + Prettier biar kode konsisten, dan memahami bedanya `pages/` vs `app/` — dua paradigma routing yang masih sering kamu temui di project lama.
