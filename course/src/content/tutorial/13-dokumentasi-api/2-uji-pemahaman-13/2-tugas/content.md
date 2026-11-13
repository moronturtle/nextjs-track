---
type: lesson
title: "Tugas: membuat fitur dari dokumentasi"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: membuat fitur dari dokumentasi

Lanjutkan **project yang sama** dari pertemuan 01 sampai 12. Jangan membuat project atau repo baru.

## Yang dikerjakan

Di tugas penutup ini, kamu akan memakai dokumentasi API untuk membuat satu fitur. Lanjutkan tiga langkah berikut.

1. **Buka dokumentasi API.** Kunjungi [halaman `/docs`](https://nextjs-track-api.vercel.app/docs). Jika belum punya akun latihan, daftar lewat `POST /api/auth/register`. Jika sudah punya akun, login lewat `POST /api/auth/login`. Keduanya memerlukan `nama` dan `password`. Gunakan **Authorize** untuk mengirim token pada request berikutnya. Coba `GET` untuk membaca data. Hindari mengubah atau menghapus data yang bukan milikmu.

2. **Tambahkan fitur detail Todo.** Di dokumentasi, cari `GET /api/todos/{id}`. `{id}` adalah bagian alamat untuk memilih satu Todo. Baca parameter dan bentuk jawaban server. Lalu tambahkan fungsi `bacaTodo(id)` di `lib/todo-api.ts` dan pakai fungsi itu di `app/todo/[id]/page.tsx`, yaitu file halaman detail Todo. Tampilkan pesan memuat saat request berjalan, Todo jika berhasil, atau pesan jika server menjawab `404`.

3. **Catat request yang dipakai.** Di `README.md`, tambahkan bagian "API yang dipakai". Buat tabel berisi alamat, method, data yang dikirim, dan jawaban yang diterima untuk setiap fungsi di `lib/todo-api.ts`.

## Buktikan sendiri

- `GET /api/todos/{id}` membalas satu objek Todo jika ID tersebut ada di daftar milikmu. Pilih ID dari hasil GET daftar Todo.
- Halaman detail `/todo/{id}` menampilkan data yang sama melalui fungsi `bacaTodo(id)`.
- Halaman detail menampilkan pesan jika ID tidak ditemukan dan server menjawab `404`.
- Tabel di `README.md` sesuai dengan request yang dijalankan aplikasi.

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–12.
- [ ] `bacaTodo(id)` dibuat hanya dari membaca dokumentasi — dipakai di halaman detail.
- [ ] Halaman detail menampilkan loading, data, dan pesan saat `404`.
- [ ] README berisi tabel kontrak API yang cocok dengan `/docs`.
- [ ] Semua fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru. Nama branch utama bisa `main` atau `master`; sesuaikan perintah pertama dengan nama branch di repo-mu:

```bash
git checkout main && git pull
git checkout -b tugas-13
git add .
git commit -m "Tugas 13"
git push -u origin tugas-13
```

Buat pull request dari `tugas-13` ke branch utama (`main` atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 13](/pengumpulan?t=tugas-13)**

Setelah mentor menyetujui pull request, gabungkan perubahan ke branch utama. Lalu perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
