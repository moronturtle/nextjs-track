---
type: lesson
title: "Tugas: Todo tersimpan di server"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: kirim semua perubahan ke server

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 07. Jangan membuat project atau repo baru.

Di tugas 07, aplikasi sudah mengambil daftar Todo dari server. Sekarang lengkapi fitur tambah, edit, centang, dan delete agar semua perubahan tersimpan di server.

## Langkah 1: lengkapi fungsi API

Di `lib/todo-api.ts`, siapkan fungsi untuk membaca, membuat, mengedit, dan melakukan delete Todo. Semua fungsi memakai alamat `https://nextjs-track-api.vercel.app` dan `owner=nami` seperti di materi.

- `POST` membuat Todo dan membaca data baru dari respons `201`.
- `PATCH` mengedit status `selesai` saja.
- `PUT` mengedit Todo dengan mengirim `teks` dan `selesai`.
- Gunakan method `DELETE` untuk delete Todo. Respons suksesnya `204` tanpa body, jadi jangan memanggil `res.json()`.
- Periksa `res.ok`. Jika gagal, baca pesan error API lalu lempar error agar form dapat menampilkannya.

## Langkah 2: sambungkan aksi ke TodoProvider

Buat aksi di provider menunggu jawaban API. Perbarui state hanya setelah API menjawab sukses. Kalau request gagal, pertahankan state lama dan beri tahu pengguna.

Saat mengedit teks, gunakan `PUT` dengan semua field yang dapat diedit. Saat checkbox berubah, gunakan `PATCH` karena hanya `selesai` yang berubah.

## Langkah 3: gunakan React Hook Form

Pasang React Hook Form:

```bash
npm install react-hook-form
```

Gunakan library tersebut di `TodoForm` untuk:

- Menolak input kosong.
- Menolak teks yang setelah di-trim kurang dari 3 karakter.
- Menampilkan pesan validasi di dekat input.
- Menampilkan pesan error dari API jika request gagal.
- Menampilkan status "Mengirim..." saat request berjalan.
- Mengosongkan input hanya setelah API menjawab sukses.

Validasi di API tetap wajib. Validasi React Hook Form membantu pengguna, tetapi request langsung ke API tetap bisa melewati form.

## Buktikan sendiri

- Input kosong atau teks kurang dari 3 karakter ditolak sebelum request dikirim.
- Tambah Todo yang valid. Refresh halaman dan pastikan Todo tetap ada karena datanya tersimpan di server.
- Edit teks Todo, centang, lalu delete. Refresh dan pastikan semua perubahan tetap tersimpan di server.
- Coba body yang tidak valid lewat Network atau dokumentasi API. Pastikan API membalas `400` dan aplikasi menampilkan pesan yang dapat dipahami.
- Periksa tab Network: tambah memakai `POST`, edit teks memakai `PUT`, checkbox memakai `PATCH`, dan delete memakai `DELETE` dengan status `204`.

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] `lib/todo-api.ts` menangani GET, POST, PUT, PATCH, dan DELETE serta memeriksa `res.ok`.
- [ ] `DELETE` tidak memanggil `res.json()`.
- [ ] Form memakai React Hook Form dengan pesan validasi yang jelas.
- [ ] Form menampilkan status saat mengirim dan pesan jika API menolak request.
- [ ] Tambah, edit, centang, dan delete tersimpan di server, bukan hanya di browser — setelah halaman di-refresh, data masih muncul karena diambil ulang dari API.
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
