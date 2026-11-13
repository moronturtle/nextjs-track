---
type: lesson
title: "Tugas: semua perubahan lewat server"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: semua perubahan lewat server

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 07. Jangan membuat project atau repo baru.

Di tugas 07, daftar Todo sudah dibaca dari server tapi tambah/centang/hapus masih hilang setelah refresh. Sekarang sambungkan ketiganya ke API — setelah tugas ini aplikasimu full CRUD.

## Langkah 1: lengkapi lib/todo-api.ts

Tambahkan `tambahTodo`, `ubahTodo`, dan `hapusTodo` seperti di materi. Ketiganya memakai `kirimRequest` yang sama: periksa `res.ok`, lempar error kalau gagal. `hapusTodo` tidak memanggil `res.json()` karena jawaban `204` tidak punya isi.

## Langkah 2: sambungkan aksi di TodoProvider

Ubah `tambahTodo`, `ubahSelesai`, dan `hapusTodo` menjadi `async` dengan urutan: kirim ke server → sukses → baru ubah state dengan jawaban server. Ingat: `ubahSelesai` yang membaca `todos` perlu dependency `[todos]` di `useCallback`-nya.

## Langkah 3: rapikan pengalaman pengguna

- `TodoForm`: state `sedangMengirim` dan `error` seperti di materi — tombol "Menyimpan..." saat request berjalan, ketikan tidak hilang kalau gagal.
- Tampilkan pesan kalau centang atau hapus gagal — caranya bebas: pesan kecil di bawah daftar, atau `alert`. Yang penting pengguna tahu request-nya gagal, bukan diam saja.

## Buktikan sendiri

- Tambah tugas → refresh → tugas tetap ada.
- Centang dan hapus → refresh → perubahan tetap.
- Matikan server API → tambah tugas → pesan gagal tampil dan ketikan tidak hilang.
- Buka `/api/todos?owner=namamu` di tab browser — isi daftar di server sama dengan layar.

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–07.
- [ ] `lib/todo-api.ts` punya `bacaTodos`, `tambahTodo`, `ubahTodo`, `hapusTodo` dengan pemeriksaan `res.ok`.
- [ ] Tambah, centang, dan hapus tersimpan di server — tetap ada setelah refresh.
- [ ] Form menampilkan "Menyimpan..." saat request berjalan dan pesan saat gagal.
- [ ] Ketikan di form tidak hilang kalau request gagal.
- [ ] `DELETE` tidak memanggil `res.json()`.
- [ ] Halaman dan fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-08
git add .
git commit -m "Tugas 08"
git push -u origin tugas-08
```

Buat pull request dari `tugas-08` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 08](/pengumpulan?t=tugas-08)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
