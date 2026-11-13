---
type: lesson
title: "Tugas: design system kecil"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: design system kecil

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 10. Jangan membuat project atau repo baru.

## Yang dibuat

Rapikan tampilan aplikasi Todo dengan design system kecil buatanmu sendiri:

- Buat `components/tombol.tsx` dengan minimal dua varian (misalnya `utama` dan `bahaya`) — class dasar ditulis sekali, warna dipilih lewat prop `varian` seperti di materi.
- Buat `components/lencana.tsx` untuk label status "Selesai" / "Belum" — atau komponen varian lain yang masuk akal di aplikasimu (misalnya komponen `Kartu` untuk bingkai konten).
- Terapkan komponen itu ke `todo-form.tsx`, `todo-item.tsx`, `todo-filter.tsx`, dan `todo-pagination.tsx` — ganti gaya lama (`todo.module.css` atau style inline) dengan class Tailwind yang konsisten.
- Pilih satu **warna utama** dan pakai di semua elemen interaktif (tombol utama, checkbox `accent-*`, tautan aktif) — satu keputusan warna, dipakai di mana-mana.
- Tetapkan juga satu skala teks: misalnya `text-sm` untuk isi, `text-lg font-semibold` untuk judul kartu — pakai konsisten di seluruh halaman Todo.

## Buktikan sendiri

- Ubah warna `utama` di `tombol.tsx` → semua tombol utama berubah sekaligus.
- Hover tombol → ada perubahan warna (`hover:`).
- Form yang sedang mengirim → tombol pudar (`disabled:opacity-50`).
- Daftar selesai → teks dicoret dan pudar (`line-through` + warna pudar).

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–10.
- [ ] Ada minimal satu komponen dengan prop `varian` yang dipakai di 3+ tempat.
- [ ] Satu warna utama dipakai konsisten di elemen interaktif.
- [ ] Komponen Todo memakai class Tailwind — tidak ada campuran style lama yang tertinggal setengah.
- [ ] State variant (`hover:`, `disabled:`) terlihat berfungsi.
- [ ] Semua fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-11
git add .
git commit -m "Tugas 11"
git push -u origin tugas-11
```

Buat pull request dari `tugas-11` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 11](/pengumpulan?t=tugas-11)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
