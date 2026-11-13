---
type: lesson
title: "Tugas: alur login lengkap"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: alur login lengkap

Lanjutkan **project yang sama** dari tugas pertemuan 01 sampai 11. Jangan membuat project atau repo baru.

## Yang dibuat

Ganti pemisahan data `?owner=` dengan alur login JWT sungguhan:

- `lib/auth.ts` — `daftar(nama, password)` memanggil `POST /api/auth/register`, `masuk(nama, password)` memanggil `POST /api/auth/login`; keduanya menyimpan `token` di `localStorage`; `bacaToken()` membacanya; `keluar()` menghapusnya.
- `lib/todo-api.ts` — `kirimRequest` menambahkan `Authorization: Bearer <token>` bila token ada; **hapus semua `?owner=`** dan argumen `owner` dari `bacaTodos`, `tambahTodo`, `ubahTodo`, `hapusTodo`.
- `app/login/page.tsx` + `app/login/_components/form-login.tsx` — form nama + password dengan mode `masuk`/`daftar` → token tersimpan → `window.location.assign("/todo")`; error `400`/`401`/`409` dari server ditampilkan apa adanya.
- `TodoProvider` — hapus konstanta `OWNER`; sesuaikan pemanggilan fungsi API.
- `TodoApp` — gerbang: tanpa token tampilkan ajakan login + tautan ke `/login`; tombol **Keluar** menghapus token dan kembali ke `/login`.
- `kirimRequest` memberi pesan ramah untuk `401` ("Sesi berakhir. Silakan login kembali.").

## Buktikan sendiri

- `/todo` tanpa login → ajakan masuk tampil.
- Daftar `budi` + password → langsung masuk. Daftar `budi` lagi → `409` "nama sudah dipakai".
- Login `budi` dengan password salah → `401` "nama atau password salah".
- Login benar → tambah tugas → request POST membawa `Authorization` di tab Network.
- Keluar → daftar sebagai `siti` → daftar kosong karena data siti berbeda.
- Ubah satu huruf token di Local Storage → refresh → pesan "Sesi berakhir".

## Periksa project

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–11.
- [ ] `?owner=` sudah tidak dipakai — identitas datang dari token.
- [ ] Register (`nama`+`password`) dan login keduanya menyimpan token; semua request membawa `Authorization`.
- [ ] Form punya mode masuk/daftar; error `400`/`401`/`409` ditampilkan.
- [ ] Gerbang `/todo` dan tombol Keluar berfungsi.
- [ ] Jawaban `401` menampilkan pesan yang bisa dimengerti.
- [ ] Semua fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-12
git add .
git commit -m "Tugas 12"
git push -u origin tugas-12
```

Buat pull request dari `tugas-12` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 12](/pengumpulan?t=tugas-12)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
