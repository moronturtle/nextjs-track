---
type: lesson
title: "Tugas: Mini Site Profil"
focus: /app/page.tsx
openInStackBlitz:
  projectTitle: "Tugas 01 — Mini Site Profil"
  projectDescription: "Mini site 3 halaman hasil latihan Next.js Track pertemuan 01"
---

# Tugas: Mini Site Profil

Waktunya evaluasi — kali ini **nggak dibimbing langkah demi langkah**. Kamu yang pegang kendali.

## Yang harus dibuat

Mini site tentang dirimu (atau tokoh favoritmu), minimal 3 route:

| Route | Isi |
|-------|-----|
| `/` | Perkenalan singkat + pembuka |
| `/tentang` | Cerita lebih panjang: latar belakang, hobi, dll. |
| `/blog` atau `/karya` | Daftar minimal 3 item (tulisan, project, karya) |

## Kriteria selesai

- [ ] Ketiga route bisa diakses lewat URL langsung
- [ ] Ada navigasi antar halaman pakai `<Link>` dari `next/link`
- [ ] Nav ditulis **sekali** di `app/layout.tsx` — bukan diulang tiap page
- [ ] `metadata` (title & description) sudah diubah, bukan default
- [ ] App jalan tanpa error

## Tips

- Workspace di editor ini bisa kamu pakai langsung — atau klik **"Buka di StackBlitz"** untuk menyimpan project-nya ke akun StackBlitz-mu
- Contoh nav ada di jawaban lesson sebelumnya — tapi coba tulis sendiri dulu
- `<Link>` dipakai begini: `import Link from "next/link"` lalu `<Link href="/tentang">Tentang</Link>`

## Cara mengumpulkan

Push project-mu ke repo GitHub, lalu kirim link-nya di halaman pengumpulan:

**[→ Kumpulkan tugas di sini](/pengumpulan)**

Belum bisa git? Kirim link StackBlitz project-mu di halaman yang sama.
