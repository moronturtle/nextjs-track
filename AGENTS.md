# AGENTS

## Gaya penulisan materi (WAJIB)

Semua teks materi (`course/src/content/**/*.md`) ditulis seperti mentor yang sedang ngobrol dengan murid awam — bukan dokumentasi, bukan tulisan AI.

- Bahasa Indonesia natural, kalimat pendek, satu ide per paragraf.
- Tulis seolah menjelaskan ke orang yang baru pertama kali dengar istilahnya.
- DILARANG frasa kaku/AI seperti: "memenuhi syarat teknis", "faktor di luar teknologi", "menjelajah", "implementasi", "utilisasi".
- DILARANG slang/kasar: "kayak", "mikir", "bandingin", "ilang", "beneran", "nggak" (pakai "tidak").
- DILARANG kiasan kabur: "menggambar halaman" (pakai "membuat/menampilkan"), "buta di mata Google" (pakai "tidak bisa dibaca Google"), "tinggal di file" (pakai "ada di file").
- Istilah teknis (SEO, CSR, SSR, MPA, hydration, crawler) HARUS dijelaskan saat pertama muncul — langsung, dalam kalimat yang sama atau callout.
- Rujukan harus eksplisit: jangan "dua-duanya", "dia", "itu" kalau konteksnya kabur — sebutkan benda/konsepnya.
- Kalau menyebut file, jelaskan perannya ("`layout.tsx` — bingkai semua halaman"), bukan cuma namanya.
- Setiap klaim harus bisa dibuktikan murid di demo/preview — jangan menyuruh "lihat kedipnya" kalau kedipnya tidak selalu kelihatan.
- Struktur lesson: pengamatan → penjelasan → bukti → ringkasan ✅/❌ → transisi ke lesson berikutnya.
- Callout yang tersedia: `:::tip`, `:::info`, `:::warning`, `:::danger` dengan `{title="..."}`.

## Struktur project

- `course/` — aplikasi TutorialKit (Astro). Build: `npm run build`.
- Lesson: `course/src/content/tutorial/<part>/<chapter>/<lesson>/content.md` + `_files/` (file yang tampil di panel).
- Template runtime: `course/src/templates/` — `baca` (server.js ringan, tanpa deps) untuk lesson bacaan; `nextjs` untuk lesson yang butuh Next.js jalan.
- Frontmatter lesson: `template`, `focus`, `previews` (false = tanpa preview), `terminal` (false = tanpa terminal). `title` WAJIB ada di tiap objek preview (disembunyikan via CSS).

## Catatan teknis

- `npm install`/`npm run dev` di set sebagai command global di `meta.md` — template `nextjs` berat (npm install real), `baca` ringan.
- File lesson dimuat dari endpoint `*-files.json` — kalau editor kosong tapi tree muncul, biasanya dev server stale setelah rename folder; restart `astro dev`.
- Curl TIDAK tersedia di WebContainers — pakai `node` + `fetch`.
- Babel/vendor besar membuat export StackBlitz gagal (HTTP 400) — jaga payload template kecil.
