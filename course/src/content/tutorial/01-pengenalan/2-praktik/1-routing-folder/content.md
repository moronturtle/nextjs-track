---
type: lesson
title: "Praktik: bikin route /tentang"
focus: /app/page.tsx
previews:
  - port: 3000
    title: "Preview"
    pathname: /tentang
---

# Praktik: bikin route `/tentang`

Teori cukup — sekarang kamu yang bikin.

## Tugasmu

Bikin halaman baru yang bisa diakses di **`/tentang`**.

**Petunjuk:**

1. Di pohon file kiri, buat folder baru `app/tentang/`
2. Di dalamnya, buat file `page.tsx`
3. Isi dengan komponen halaman — contoh kerangkanya:

```tsx
export default function TentangPage() {
  return <h1>Tentang Kami</h1>;
}
```

4. Panel preview sudah di-set ke `/tentang` — kalau benar, halamanmu langsung muncul di sana. Kalau masih 404, cek lagi: nama folder `tentang`, nama file `page.tsx` (hurufnya harus persis).

## Yang sedang terjadi

Kamu baru saja membuktikan aturan paling penting di App Router: **folder = segmen URL, `page.tsx` = halaman**. Nggak ada konfigurasi routing tambahan — nggak perlu `react-router`, nggak perlu daftar route manual.

Mentok? Klik **Lihat solusi** di atas buat bandingkan — tapi coba sendiri dulu ya. 👊

Selanjutnya kita main sama layout dan metadata. 👉
