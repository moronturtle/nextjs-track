# Next.js Track

Kursus Next.js berbahasa Indonesia, tersedia dalam **dua jalur** dengan materi yang sama:

- **`01-pengenalan/`** — jalur repo: baca materi di README, coba kode lewat tombol **Open in StackBlitz**. Tanpa install apa pun di laptop.
- **`course/`** — jalur website interaktif (TutorialKit, di-deploy ke Vercel): materi + editor + preview dalam satu halaman, mirip Tour of Go.

## Cara pakai repo ini

1. Buka folder pertemuan dari daftar di bawah.
2. Baca `README.md` pertemuan itu — isinya tujuan belajar, materi, dan latihan.
3. Klik **Open in StackBlitz** pada folder `starter/` untuk langsung coding di browser. StackBlitz otomatis menjalankan `npm install` + `npm run dev`.
4. Kerjakan latihan yang ditandai komentar `TODO` di kode. Kalau mentok, bandingkan dengan `final/` (hasil akhir yang benar).
5. Cek pemahamanmu lewat `/quiz` di dalam app (interaktif, langsung tahu benar/salah) atau `quiz.md`, lalu kerjakan `tugas/`.

> **Mau jalanin di lokal?** Boleh banget:
> ```bash
> cd 01-pengenalan/starter
> npm install
> npm run dev
> ```
> Butuh Node.js **20.9+**.

## Daftar pertemuan

| # | Topik | Materi |
|---|-------|--------|
| 01 | Pengenalan Next.js & ekosistemnya, perbandingan dengan React SPA, struktur folder dan routing | [01-pengenalan](./01-pengenalan) |

> Pertemuan berikutnya menyusul — folder baru ditambahkan per pertemuan.

## Cara bertanya

- **Tanya materi/latihan** → lewat forum atau grup kursus. Sertakan nomor pertemuan + screenshot + langkah yang sudah dicoba.
- **Lapor typo, link mati, atau instruksi yang bikin bingung** → buka issue di repo ini (lihat [CONTRIBUTING.md](./CONTRIBUTING.md)).

## Struktur repo

```
nextjs-track/
├── README.md              ← kamu di sini
├── CONTRIBUTING.md
├── 01-pengenalan/         ← JALUR REPO — versi standalone pertemuan 01
│   ├── README.md          ← materi & latihan
│   ├── starter/           ← project untuk dicoba (Open in StackBlitz)
│   ├── demo-spa/          ← React SPA murni, buat perbandingan
│   ├── final/             ← hasil akhir latihan
│   ├── tugas/
│   └── quiz.md
├── course/                ← JALUR WEBSITE — situs kursus interaktif (TutorialKit)
│   └── src/content/tutorial/01-pengenalan/
│                          ← kode materi pertemuan 01 versi interaktifnya di sini
└── _template/             ← template folder untuk pertemuan baru
```

## Dua jalur, satu materi

Konten pertemuan yang sama ditulis dalam dua format. Pemetaannya:

| Jalur repo (`01-pengenalan/`) | Jalur course (`course/src/content/tutorial/01-pengenalan/`) |
|---|---|
| `README.md` (materi HTML→SPA→SSR→Next.js) | `1-materi/` (3 lesson: 1-html-biasa, 2-react-spa, 3-kenapa-nextjs) |
| `demo-spa/` (pembanding CSR) | `1-materi/4-eksperimen-ssr-vs-csr/` + `src/templates/demo-spa/` |
| Bagian struktur folder di `README.md` | `1-materi/5-struktur-folder/content.md` + `src/templates/nextjs/` |
| Latihan di `starter/` + kunci `final/` | `2-praktik/` (lesson `_files` + `_solution`) |
| `quiz.md` + route `/quiz` di starter | `3-uji-pemahaman/1-quiz/` |
| `tugas/` | `3-uji-pemahaman/2-tugas/` + `src/pages/pengumpulan.astro` |

> ⚠️ Keduanya **tidak berbagi file** — kalau edit materi, ubah di dua tempat.

Tiap `starter/`, `final/`, dan `demo-spa/` adalah **project mandiri** — punya `package.json` sendiri, bukan monorepo. Itu yang bikin tiap folder bisa langsung dibuka di StackBlitz.

## Catatan teknis

- Stack: **Next.js 16, React 19, TypeScript, Tailwind CSS 4** — semuanya App Router.
- Script `dev` dan `build` di semua project pakai flag `--webpack`. Ini sengaja: Turbopack (default Next.js 16) belum jalan di StackBlitz WebContainers. Di lokal kamu bebas pakai `next dev` biasa.
- Tidak ada `package-lock.json` — StackBlitz resolve dependency saat import, jadi selalu dapat versi terbaru yang kompatibel.
