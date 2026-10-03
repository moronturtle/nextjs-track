# Tugas 01 — Mini Site Profil

Bikin mini site tentang dirimu sendiri (atau tokoh favoritmu) pakai Next.js App Router. Kerjakan di `starter/` atau project baru.

## Yang harus dibuat

Minimal 3 route:

| Route | Isi |
|-------|-----|
| `/` | Perkenalan singkat + foto/teks pembuka |
| `/tentang` | Cerita lebih panjang: latar belakang, hobi, dll. |
| `/blog` atau `/karya` | Daftar minimal 3 item (tulisan, project, karya) |

## Kriteria selesai

- [ ] Ketiga route bisa diakses lewat URL langsung (bukan cuma dari home)
- [ ] Ada navigasi untuk pindah antar halaman — pakai `<Link>` dari `next/link` (contohnya di `final/app/layout.tsx`; kalau pakai `<a>` akan kena peringatan ESLint)
- [ ] Nav ditulis **sekali** di `app/layout.tsx`, bukan diulang di tiap page — ini yang dinilai!
- [ ] `metadata` (title & description) diubah, bukan default
- [ ] App jalan tanpa error di StackBlitz atau lokal

## Nilai plus (opsional)

- Route tambahan: `/kontak`, `/galeri`, bebas
- Tiap `page.tsx` punya `metadata` sendiri (cek title berubah di tab browser)
- Styling rapi pakai Tailwind

## Cara mengumpulkan

Kirim link StackBlitz project-mu (Share → copy link) atau link repo GitHub-mu ke mentor lewat jalur yang ditentukan.
