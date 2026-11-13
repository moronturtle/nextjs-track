---
type: lesson
title: "Tugas: hidup dari dokumentasi"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: hidup dari dokumentasi

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 12. Jangan membuat project atau repo baru.

## Yang dikerjakan

Tugas penutup track ini melatih kebiasaan developer nyata: **memakai API hanya berbekal dokumentasinya**.

1. **Jelajahi `/docs`.** Buka halaman dokumentasi API (`http://localhost:3001/docs` atau alamat dari mentor). Lewat Try it out, jalankan sendiri: login → Authorize dengan token → `GET`, `POST`, `PATCH`, `DELETE`. Saksikan kode `200`/`201`/`204`/`400`/`404` datang dari server betulan.

2. **Tambahkan satu fitur hanya dari dokumen.** Di `docs`, cari cara membaca **satu todo** — `GET /api/todos/{id}` dengan parameter `id` di path. Tanpa melihat materi lama, tambahkan ke `lib/todo-api.ts` fungsi `bacaTodo(id)` lalu pakai di halaman detail `app/todo/[id]/page.tsx`: saat halaman dibuka, ambil todo itu dari server (loading → data / pesan error kalau `404`).

3. **Tulis kontrakmu sendiri.** Di `README.md`, tambahkan bagian "API yang dipakai" berisi tabel kecil: endpoint, method, apa yang dikirim, apa yang kembali — untuk semua pemanggilan di `lib/todo-api.ts`-mu. Ini dokumen kontrak versimu sendiri.

## Buktikan sendiri

- `GET /api/todos/1` lewat Try it out → `200` + satu objek todo.
- Detail `/todo/1` di aplikasimu menampilkan teks yang sama — diambil lewat `bacaTodo(1)`.
- `/todo/999` → pesan "Todo tidak ditemukan" (server `404`).
- README berisi tabel endpoint yang cocok dengan `/docs`.

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

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-13
git add .
git commit -m "Tugas 13"
git push -u origin tugas-13
```

Buat pull request dari `tugas-13` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 13](/pengumpulan?t=tugas-13)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
