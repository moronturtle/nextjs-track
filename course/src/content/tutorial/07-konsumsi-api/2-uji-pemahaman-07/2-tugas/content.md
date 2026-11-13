---
type: lesson
title: "Tugas: Todo membaca dari server"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: Todo membaca dari server

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 06. Jangan membuat project atau repo baru.

Materi 07 memindahkan sumber data Todo dari `localStorage` ke API latihan. Sekarang terapkan di project-mu — pakai `owner` namamu sendiri supaya datamu terpisah dari murid lain.

## Langkah 1: buat lib/todo-api.ts

Buat file `lib/todo-api.ts` berisi `API_URL` (alamat dari mentor) dan fungsi `bacaTodos(owner)` seperti di materi. Fungsi ini memeriksa `res.ok` dan melempar error kalau server menjawab gagal.

## Langkah 2: sambungkan TodoProvider

Di `contexts/todo-context.tsx`:

- ganti pembacaan `localStorage` dengan `await bacaTodos("nama-kamu")` — pakai namamu, bukan `demo`;
- tambahkan state `sedangMemuat` dan `error`, lalu bagikan lewat Context;
- mutasi (`tambahTodo`, `ubahSelesai`, `hapusTodo`) tetap mengubah state lokal — pengiriman ke server baru di pertemuan 08;
- `lib/todo-storage.ts` dan `data/todo.ts` boleh dihapus kalau sudah tidak dipakai. `TODO_AWAL` tidak diperlukan lagi — data awal datang dari server.

## Langkah 3: tampilkan tiga keadaan

Di komponen yang membaca `useTodos()`:

- `sedangMemuat` → tampilkan "Memuat daftar tugas dari server...";
- `error` → tampilkan pesan errornya;
- selain itu → tampilkan daftar seperti biasa.

Lakukan juga di halaman detail `app/todo/[id]` — teks "Memuat..." seharusnya tidak lagi dibutuhkan dari state sendiri, cukup membaca dari Context.

## Buktikan sendiri

- Buka `http://localhost:3000/todo` — muncul "Memuat..." sekejap lalu daftar tugasmu.
- Buka alamat API `…/api/todos?owner=nama-kamu` di tab browser — datanya sama dengan yang tampil di halaman.
- Ubah `API_URL` ke alamat yang salah (misalnya port `9999`), refresh → pesan error tampil. Kembalikan setelah selesai.
- Tambah tugas lalu refresh — tugas itu hilang karena belum dikirim ke server. Itu normal untuk pertemuan ini.

## Periksa project

Pastikan halaman dan fitur dari tugas sebelumnya tetap berjalan. Lalu jalankan:

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–06.
- [ ] `lib/todo-api.ts` berisi `API_URL` dan `bacaTodos` yang memeriksa `res.ok`.
- [ ] `TodoProvider` memuat daftar dari API dengan `owner` namaku.
- [ ] Tiga keadaan (memuat, error, sukses) terlihat di halaman daftar dan detail.
- [ ] `localStorage` sudah tidak dipakai untuk daftar Todo.
- [ ] Saya membuktikan keadaan error dengan alamat yang salah.
- [ ] Halaman dan fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-07
git add .
git commit -m "Tugas 07"
git push -u origin tugas-07
```

Buat pull request dari `tugas-07` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 07](/pengumpulan?t=tugas-07)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
