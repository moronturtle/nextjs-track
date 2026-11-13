---
type: lesson
title: "Tugas: form dengan validasi"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: form dengan validasi

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 08. Jangan membuat project atau repo baru.

## Yang dibuat

Perbesar form tambah tugas menjadi form yang lebih lengkap — `TodoForm` sekarang punya **dua kolom**:

- `teks` — isi tugas, **controlled**, wajib diisi minimal 3 karakter.
- `catatan` — catatan opsional, **uncontrolled** (pakai `defaultValue` dan dibaca lewat `FormData` saat submit). Simpan catatan ini sebagai bagian teks — misalnya digabung `"Tugas — catatan"` — atau sebagai field baru kalau kamu menambahkannya ke tipe `Todo`.

Saat submit:

- periksa kedua kolom dulu; kalau `teks` tidak lolos, tampilkan pesan di bawah kolomnya dan request **tidak dikirim**;
- kalau lolos, kirim ke server seperti pertemuan 08 — tombol "Menyimpan...", ketikan selamat kalau gagal;
- **bonus:** saat server menjawab `400`, baca `error` dari body jawaban dan tampilkan pesannya (bukan pesan buatanmu sendiri).

## Buktikan sendiri

- Submit dengan `teks` kosong → pesan tampil, request tidak berangkat (cek di tab Network DevTools — tidak ada request POST).
- Submit dengan `teks` "ab" → sama.
- Submit dengan isi benar → tugas tersimpan di server.
- Matikan server API → submit → pesan gagal tampil dan ketikan tidak hilang.

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–08.
- [ ] Kolom `teks` adalah controlled input dengan validasi minimal 3 karakter.
- [ ] Kolom `catatan` adalah uncontrolled input yang dibaca lewat FormData saat submit.
- [ ] Pesan validasi tampil di bawah kolomnya; request tidak dikirim kalau tidak lolos.
- [ ] Jawaban `400` dari server dibaca dan pesannya ditampilkan (bonus).
- [ ] Halaman dan fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-09
git add .
git commit -m "Tugas 09"
git push -u origin tugas-09
```

Buat pull request dari `tugas-09` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 09](/pengumpulan?t=tugas-09)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
