# Course — Website Kursus Interaktif

Website kursus Next.js Track yang interaktif — materi, editor kode, terminal,
dan preview langsung dalam satu halaman (mirip Tour of Go / StackBlitz Learn).

## Teknologi

- **[TutorialKit](https://tutorialkit.dev)** — framework open-source dari StackBlitz
  untuk membangun situs tutorial interaktif.
- **Astro 4 + React 18** — mesin website-nya (bukan Next.js). Lihat penjelasan di bawah.
- **WebContainers** — menjalankan project lesson (Next.js sungguhan) di browser
  peserta, tanpa install apa pun.

> Yang dipelajari peserta adalah Next.js — tapi kerangka situs kursusnya sendiri
> adalah Astro/TutorialKit. Project Next.js peserta hidup di `src/templates/nextjs/`.

## Astro itu apa?

**Astro adalah framework website — satu keluarga dengan Next.js**, tapi fokusnya
ke situs konten (blog, dokumentasi, course). Beda mendasarnya:

| | Next.js | Astro |
|---|---------|-------|
| Hasil default | App React penuh — JavaScript besar dikirim ke browser | **HTML statis** — tanpa JS sama sekali kalau tidak perlu |
| Interaktivitas | Semua halaman berupa komponen React | Hanya bagian yang butuh ("islands") yang pakai React |
| Cocok untuk | App yang dinamis | Situs konten + sedikit bagian interaktif |

Kenapa TutorialKit memakai Astro: situs kursus itu ~90% konten bacaan (HTML statis
= kencang & murah di-hosting), sedangkan bagian interaktifnya — editor kode,
terminal, preview — dibuat sebagai "pulau" React di dalamnya.

### "Katanya SEO Astro lebih bagus dari Next.js?" — miskonsepsi

SEO tidak ditentukan merek framework, tapi oleh **apakah HTML berisi konten
dikirim dari server**. Baik Next.js maupun Astro melakukannya — keduanya
sama-sama bagus untuk SEO. Yang buruk untuk SEO adalah React SPA/CSR
(HTML-nya kosong).

Keunggulan Astro hanya di **kecepatan**: dia mengirim nol JavaScript ke browser
secara default, sementara Next.js tetap mengirim bundle JS untuk interaktivitas.
Situs lebih ringan → Core Web Vitals lebih baik → keunggulan *tidak langsung*
untuk ranking Google.

Jadi pilihannya bukan "lebih bagus", tapi **alat sesuai pekerjaan**:

- **Astro** → situs konten (blog, docs, landing, course ini)
- **Next.js** → aplikasi web (dashboard, toko online, SaaS) — ekosistem dan
  lowongan kerja jauh lebih besar

### Cara install Astro

Astro **tidak diinstall global** — dia dependency project biasa, sama seperti
`next`. Di folder ini sudah tertulis di `package.json`, jadi cukup:

```bash
npm install   # menginstall astro + tutorialkit + semua dependency
npm run dev   # menjalankan 'astro dev' → http://localhost:4321
```

(Kalau suatu hari mau bikin project Astro dari nol: `npm create astro@latest`.)

## Menjalankan secara lokal

```bash
npm install   # sekali saja
npm run dev   # → http://localhost:4321
```

| Port | Apa |
|------|-----|
| `4321` | Website kursus ini (yang kamu buka di browser) |
| `3000` / `5173` | Server milik lesson (Next.js / Vite) — jalan di WebContainer, tampil di panel preview dalam halaman |

## Posisi di repo

Folder ini adalah **jalur website** — versi interaktif dari materi di
`../01-pengenalan/` (jalur repo, README + tombol StackBlitz). Keduanya memuat
materi yang sama tapi **tidak berbagi file** — edit materi = ubah dua tempat.
Pemetaan lengkapnya ada di README root repo.

## Struktur folder

```
course/
├── astro.config.ts                  ← integrasi tutorialkit() diaktifkan di sini
├── theme.css                        ← warna kustom (indigo) — dimuat otomatis TutorialKit
├── vercel.json                      ← header COOP/COEP wajib untuk WebContainers
│
├── src/content/
│   ├── config.ts                    ← daftarin koleksi 'tutorial' (schema TutorialKit)
│   └── tutorial/
│       ├── meta.md                  ← meta situs: judul, perintah default, i18n (lokalisasi UI)
│       │                            (tidak ada 'template' di sini — lihat bagian template di bawah)
│       │
│       └── 01-pengenalan/           ◄══ materi pertemuan 01 (PART)
│           ├── meta.md              ← type: part — DI SINI 'template: nextjs' ditulis
│           ├── 1-materi/            ← CHAPTER "Materi"
│           │   ├── 1-html-biasa/  ← lesson 1: HTML biasa + reload total
│           │   ├── 2-react-spa/   ← lesson 2: SPA & CSR (HTML kosong)
│           │   ├── 3-kenapa-nextjs/ ← lesson 3: SSR, hydration, kenapa Next.js
│           │   ├── 2-eksperimen-ssr-vs-csr/content.md     ← eksperimen (template: demo-spa)
│           │   └── 3-struktur-folder/content.md           ← tur folder (template: nextjs)
│           ├── 2-praktik/           ← CHAPTER "Praktik"
│           │   ├── 1-routing-folder/   + _solution/
│           │   └── 2-layout-metadata/  + _files/ + _solution/
│           └── 3-uji-pemahaman/     ← CHAPTER "Uji Pemahaman"
│               ├── 1-quiz/             + _files/ (Quiz.tsx, questions.ts)
│               └── 2-tugas/
│
├── src/templates/                   ◄══ project yang dimuat ke editor peserta
│   ├── nextjs/                      ← project Next.js (dipakai hampir semua lesson)
│   ├── demo-spa/                    ← React+Vite untuk eksperimen CSR (lesson 1.2)
│   └── baca/                        ← file contoh HTML untuk dibaca (lesson 1.1)
│
└── src/pages/pengumpulan.astro      ← halaman Giscus, di luar sistem lesson
```

## Cara kerja `template:`

Nilai `template` di frontmatter = **nama folder di `src/templates/`**. Saat lesson
dibuka, isi folder itu disalin ke workspace WebContainer peserta.

Pewarisannya dari atas ke bawah — yang terdekat dengan lesson menang:

```
tutorial/meta.md              → pengaturan global saja (TIDAK ada template di sini)
  └─ 01-pengenalan/meta.md    → template: nextjs      ← default untuk semua lesson di part ini
       └─ lesson/content.md   → template: demo-spa    ← override bila lesson butuh beda
```

Contoh nyata di pertemuan ini:

| Lesson | `template` di frontmatter | Project yang dimuat |
|--------|---------------------------|---------------------|
| 1.1 Kenapa Next.js? | `baca` | `src/templates/baca/` |
| 1.2 Eksperimen SSR vs CSR | `demo-spa` | `src/templates/demo-spa/` |
| 1.3 dst. | `nextjs` (atau warisan part) | `src/templates/nextjs/` |

Di dalam folder lesson sendiri ada dua subfolder opsional:

- `_files/` — file yang **ditambahkan/ditimpa** ke atas template untuk lesson itu
- `_solution/` — kunci jawaban, tampil saat peserta klik "Lihat solusi"

## Menambah pertemuan baru

1. Buat folder part baru: `src/content/tutorial/2-setup/`
2. Isi `meta.md` (`type: part`, `title`, `template: nextjs`)
3. Tambah chapter → lesson sesuai pola pertemuan 01
4. Pertemuan otomatis muncul di dropdown navigasi atas dan halaman `/`

## Deploy ke Vercel

`vercel.json` sudah berisi header COOP/COEP yang diwajibkan WebContainers.
Tinggal import folder `course/` ini ke Vercel — framework terdeteksi Astro otomatis.

## PR konfigurasi (manual)

- `src/pages/pengumpulan.astro` → ganti `GISCUS_REPO`, `GISCUS_REPO_ID`,
  `GISCUS_CATEGORY_ID` (dari https://giscus.app setelah repo public +
  Discussions aktif + app Giscus ter-install).
