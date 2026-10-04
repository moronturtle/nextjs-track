# Next.js Track

Kursus Next.js berbahasa Indonesia, tersedia dalam **dua jalur** dengan materi yang sama:

- **`01-pengenalan/`** — jalur repo: baca materi di README, lalu jalankan project di laptopmu sendiri. (Tombol **Open in StackBlitz** sementara tidak bisa menjalankan `next dev` — bug di Next.js-nya, bukan di project. Folder `demo-spa/` yang pakai Vite tetap aman dibuka di StackBlitz.)
- **`course/`** — jalur website interaktif (TutorialKit, di-deploy ke Vercel): materi + editor + preview dalam satu halaman, mirip Tour of Go.

## Cara pakai repo ini

1. Buka folder pertemuan dari daftar di bawah.
2. Baca `README.md` pertemuan itu — isinya tujuan belajar, materi, dan latihan.
3. Jalankan folder `starter/` **di lokal**: `cd 01-pengenalan/starter`, lalu `npm install`, lalu `npm run dev`. Butuh Node.js **20.9+**.
4. Kerjakan latihan yang ditandai komentar `TODO` di kode. Kalau mentok, bandingkan dengan `final/` (hasil akhir yang benar).
5. Cek pemahamanmu lewat `/quiz` di dalam app (interaktif, langsung tahu benar/salah) atau `quiz.md`, lalu kerjakan `tugas/`.

> **Kenapa tidak lewat StackBlitz?** `next dev` saat ini error di WebContainers (`InvariantError` — bug di dalam Next.js, bukan di project). Tombol Open in StackBlitz di tiap pertemuan dibiarkan untuk berjaga-jaga kalau nanti sudah diperbaiki.

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
│   ├── starter/           ← project untuk dicoba (jalankan di lokal)
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
| `README.md` (materi HTML→SPA→SSR→Next.js) | `1-materi/` (4 lesson: 1-html-biasa, 2-react-spa, 3-kenapa-nextjs, 4-struktur-folder) |
| Latihan di `starter/` + kunci `final/` | Tugas di `2-uji-pemahaman/2-tugas/` (dikerjakan di lokal, bukan di browser) |
| `quiz.md` + route `/quiz` di starter | `2-uji-pemahaman/1-quiz/` |
| `tugas/` | `2-uji-pemahaman/2-tugas/` + `src/pages/pengumpulan.astro` |

> ⚠️ Keduanya **tidak berbagi file** — kalau edit materi, ubah di dua tempat.

Tiap `starter/`, `final/`, dan `demo-spa/` adalah **project mandiri** — punya `package.json` sendiri, bukan monorepo. Masing-masing bisa di-`npm install` dan dijalankan terpisah.

## Catatan teknis

- Stack: **Next.js 16, React 19, TypeScript, Tailwind CSS 4** — semuanya App Router.
- `next dev` saat ini **error di StackBlitz/WebContainers** (baik Next 15 maupun 16 — bug `InvariantError` di dalam framework). Kerjakan project Next.js di lokal.
- Tidak ada `package-lock.json` — sengaja, supaya `npm install` selalu resolve versi terbaru yang kompatibel.
