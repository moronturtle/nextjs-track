---
type: lesson
title: "Tugas: Todo membaca dari server"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: Todo membaca dari server

Lanjutkan **project yang sama** dari pertemuan 01 sampai 06. Jangan membuat project atau repo baru.

Di tugas ini, aplikasi Todo akan mengambil daftar dari API, bukan dari `localStorage`. Pakai nama sendiri pada `owner` supaya daftar latihanmu terpisah dari nama murid lain.

## Langkah 1: siapkan fungsi untuk membaca API

Buat file `lib/todo-api.ts`. File ini menyimpan alamat API dan fungsi `bacaTodos(owner)`.

Gunakan alamat API latihan yang sudah online:

```ts
export const API_URL = "https://nextjs-track-api.vercel.app";
```

Fungsi `bacaTodos` mengirim GET, memeriksa `res.ok`, lalu membaca daftar dari jawaban server.

## Langkah 2: sambungkan TodoProvider

Di `contexts/todo-context.tsx`, file yang membagikan state Todo ke halaman:

- ganti pembacaan `localStorage` dengan `await bacaTodos("nama-kamu")`; ganti teks itu dengan namamu;
- tambahkan state `sedangMemuat` dan `error`, lalu bagikan lewat Context;
- biarkan `tambahTodo`, `ubahSelesai`, dan `hapusTodo` mengubah state di browser. Mengirim perubahan ke server akan dipelajari di pertemuan 08;
- hapus kode penyimpanan lama hanya jika file tersebut sudah tidak dipakai.

## Langkah 3: tampilkan tiga keadaan di halaman

Di komponen yang membaca data lewat `useTodos()`:

- `sedangMemuat` → tampilkan "Memuat daftar tugas dari server...";
- `error` → tampilkan pesan error;
- jika tidak memuat dan tidak ada error → tampilkan daftar Todo.

Terapkan pengecekan yang sama di halaman detail `app/todo/[id]`. Halaman detail bisa memakai state dari Context, jadi tidak perlu membuat state loading kedua.

## Buktikan sendiri

- Buka `http://localhost:3000/todo` — ini alamat aplikasi Next.js lokalmu. Daftar tugas akan muncul setelah dibaca dari server.
- Buka `https://nextjs-track-api.vercel.app/api/todos?owner=nama-kamu` di tab browser. Ganti `nama-kamu` dengan nama yang kamu pakai. JSON yang muncul adalah data yang dibaca aplikasi.
- Untuk mencoba pesan error, ubah sementara `API_URL` menjadi `http://localhost:9999`, lalu muat ulang halaman. Kembalikan alamat API setelah percobaan.
- Tambah tugas lalu muat ulang halaman. Tugas baru belum tersimpan karena pertemuan ini hanya membaca data.

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
- [ ] Saya mencoba keadaan error dengan alamat API yang salah, lalu mengembalikan alamat yang benar.
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
