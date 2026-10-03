---
type: lesson
title: "Praktik: layout & metadata"
focus: /app/layout.tsx
previews:
  - port: 3000
    title: "Preview"
---

# Praktik: layout & metadata

Di lesson ini, route `/tentang` dari tadi sudah ada. Sekarang dua tugas sekaligus — keduanya sekaligus kenalan sama `layout.tsx` lebih dalam.

## Tugas 1 — bikin route `/kontak`

Sama kayak tadi: buat `app/kontak/page.tsx` berisi info kontak (email, GitHub, bebas). Cek di preview dengan membuka `/kontak`.

## Tugas 2 — ubah identitas situs lewat metadata

Buka `app/layout.tsx`, temukan objek `metadata`:

```tsx
export const metadata: Metadata = {
  title: "Latihan Next.js",
  description: "Project latihan Next.js Track",
};
```

Ubah `title` dan `description` jadi milikmu, misal `title: "Situs Andi"`. Simpan — lalu lihat **judul tab browser** di preview berubah. Ini yang Google baca & tampilkan di hasil pencarian — ingat materi SEO tadi.

## Yang sedang terjadi

- `layout.tsx` membungkus SEMUA halaman — tulis nav/footer sekali di sini, tampil di mana-mana (kita pakai itu di tugas akhir)
- `metadata` = identitas halaman di mata browser & Google — salah satu bentuk nyata kenapa SSR ramah SEO
- Bonus: `page.tsx` juga bisa punya `metadata` sendiri — coba tambahkan di `app/kontak/page.tsx` (judul tab berubah per halaman!)

Selesai dua-duanya? Lanjut — saatnya ujian kecil. 👉
