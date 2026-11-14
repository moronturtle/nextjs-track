---
type: lesson
title: "Tugas: mengambil daftar Todo dari server"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: mengambil daftar Todo dari server

Lanjutkan **project yang sama** dari pertemuan 01 sampai 06. Jangan membuat project atau repo baru.

Di tugas ini, ubah aplikasi Todo agar mengambil daftar dari API, bukan dari `localStorage`. Gunakan `owner=nami` seperti di materi agar aplikasimu membaca daftar yang sama.

## Langkah 1: siapkan fungsi untuk membaca API

Buat file `lib/todo-api.ts`. File ini menyimpan alamat API dan fungsi `bacaTodos(owner)` untuk mengambil daftar Todo.

Gunakan alamat API untuk latihan di materi ini:

```ts
export const API_URL = "https://nextjs-track-api.vercel.app";
```

Fungsi `bacaTodos` mengirim permintaan GET. Setelah menerima jawaban, fungsi memeriksa `res.ok` dan mengambil daftar Todo.

## Langkah 2: sambungkan TodoProvider

Di `contexts/todo-context.tsx`, file yang membagikan data Todo ke halaman:

- ganti kode yang mengambil daftar dari `localStorage` dengan `await bacaTodos("nami")`;
- tambahkan state `sedangMemuat` dan `error`, lalu bagikan nilai tersebut lewat Context;
- biarkan `tambahTodo`, `ubahSelesai`, dan `hapusTodo` mengubah data di browser. Cara mengirim perubahan ke server akan dipelajari di pertemuan 08;
- hapus kode penyimpanan lama hanya jika file tersebut sudah tidak dipakai.

## Langkah 3: tampilkan tiga keadaan di halaman

Di komponen yang mengambil data lewat `useTodos()`:

- `sedangMemuat` → tampilkan "Memuat daftar tugas dari server...";
- `error` → tampilkan pesan error;
- jika data berhasil diambil → tampilkan daftar Todo.

Terapkan pengecekan yang sama di halaman detail `app/todo/[id]`. Halaman detail juga bisa mengambil state dari Context, jadi tidak perlu membuat state loading baru.

## Buktikan sendiri

- Buka `http://localhost:3000/todo`. Alamat ini membuka aplikasi Next.js yang berjalan di komputermu. Daftar Todo akan muncul setelah aplikasi mengambil data dari API.
- Buka `https://nextjs-track-api.vercel.app/api/todos?owner=nami` di tab browser. Daftar JSON yang muncul adalah data yang diambil aplikasi.
- Untuk mencoba pesan error, ubah sementara `API_URL` menjadi `http://localhost:9999`, lalu muat ulang halaman. Setelah mencoba, kembalikan alamat API yang benar.
- Tambah tugas lalu muat ulang halaman. Tugas baru belum tersimpan karena pada pertemuan ini aplikasi hanya mengambil data.

## Periksa project

Pastikan halaman dan fitur dari tugas sebelumnya masih berjalan. Lalu jalankan:

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–06.
- [ ] `lib/todo-api.ts` berisi `API_URL` dan `bacaTodos` yang memeriksa `res.ok`.
- [ ] `TodoProvider` mengambil daftar dari API dengan `owner=nami`.
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
