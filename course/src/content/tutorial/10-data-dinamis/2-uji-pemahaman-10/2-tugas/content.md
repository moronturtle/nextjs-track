---
type: lesson
title: "Tugas: pencarian dan pagination"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: pencarian dan pagination

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 09. Jangan membuat project atau repo baru.

## Yang dibuat

Naikkan daftar Todo-mu ke versi data dinamis — filter dan pemotongan data dilakukan server:

- `bacaTodos` di `lib/todo-api.ts` menerima `q`, `status`, `page`, `limit` dan menyusunnya dengan `URLSearchParams` seperti di materi.
- `TodoProvider` memegang `q`, `status`, `page` beserta `total` dan `totalHalaman` dari jawaban server. `muat` dijalankan ulang setiap parameter berubah, dengan debounce 300 ms.
- Kotak pencarian di atas daftar (controlled) mengubah `q`; tombol filter mengubah `status`; komponen `TodoPagination` mengubah `page`.
- `setQ`/`setStatus` mengembalikan `page` ke 1.
- Setelah tambah/centang/hapus sukses, panggil `muat()` untuk minta ulang daftar.
- Hasil pencarian kosong tetap menampilkan keadaan kosong yang jelas.

## Buktikan sendiri

- Ketik di kotak cari → request `?q=` berangkat setelah berhenti mengetik, bukan tiap huruf (lihat tab Network).
- Pilih "Belum selesai" → request berisi `status=belum`.
- Dengan `limit=5` dan 12 data awal, ada 3 halaman — tombol "Berikutnya" bekerja dan mati di halaman terakhir.
- Di halaman 3, ganti filter → daftar kembali ke halaman 1.
- Cari kata yang tidak ada → keadaan kosong tampil, `total` menampilkan 0.

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–09.
- [ ] `bacaTodos` mendukung `q`, `status`, `page`, `limit` lewat `URLSearchParams`.
- [ ] Pencarian memakai debounce — tidak satu request per huruf.
- [ ] Pagination berjalan dengan `totalHalaman` dari server.
- [ ] Mengganti pencarian/filter mengembalikan `page` ke 1.
- [ ] Keadaan kosong tampil saat pencarian tidak menemukan apa pun.
- [ ] Halaman dan fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-10
git add .
git commit -m "Tugas 10"
git push -u origin tugas-10
```

Buat pull request dari `tugas-10` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 10](/pengumpulan?t=tugas-10)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
