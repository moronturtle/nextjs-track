---
type: lesson
title: "Swagger UI dan Try it out"
template: baca
previews: false
terminal: false
---

# Swagger UI — dokumentasi yang bisa dicoba

File `openapi.json` itu untuk mesin dan pembaca tekun. Untuk manusia, ada **Swagger UI** — halaman yang membaca file OpenAPI yang sama dan menampilkannya sebagai dokumentasi interaktif. API latihan kita menyediakannya di **`/docs`**: `http://localhost:3001/docs`.

## Membaca halaman /docs

Setiap endpoint tampil sebagai satu kotak berwarna sesuai methodnya:

- 🟩 hijau `GET`, 🟦 biru `POST`, 🟧 oranye `PATCH`, 🟥 merah `DELETE`.

Buka kotak `GET /api/todos` — di dalamnya terbaca semua yang tadi ada di JSON: daftar parameter (`q`, `status`, `page`, `limit`) beserta tipe dan nilai yang diizinkan, lalu daftar response per kode beserta contoh body-nya.

## Try it out: kirim request langsung dari dokumen

Ini bagian yang paling berguna. Di dalam kotak endpoint ada tombol **Try it out** — mengubah dokumentasi menjadi form pengirim request sungguhan:

1. Klik **Try it out** di `POST /api/auth/login`.
2. Isi body: `{"nama": "budi"}` → klik **Execute**.
3. Di bawahnya muncul jawaban nyata: kode `200` dan `{token, nama}` — dari server betulan.

Kamu baru saja login tanpa menulis fetch sama sekali. Ini cara developer mengecek API sebelum menulis satu baris kode pun.

## Authorize: token untuk endpoint terproteksi

Di bagian atas halaman ada tombol **Authorize** — karena spec menyatakan `bearerAuth`, Swagger tahu API ini menerima token:

1. Salin `token` dari jawaban login tadi.
2. Klik **Authorize** → tempel token → **Authorize** lagi.
3. Sekarang semua request dari Try it out otomatis membawa `Authorization: Bearer <token>` — sama seperti `kirimRequest` di aplikasimu.

## Menjawab pertanyaan tanpa membaca kode

Dengan `/docs`, pertanyaan-pertanyaan ini terjawab sendiri:

- "Method apa yang dipakai untuk mengubah sebagian todo?" → `PATCH /api/todos/{id}`.
- "Nilai apa saja yang boleh untuk `status`?" → `semua`, `belum`, `selesai` — terlihat dari dropdown enum-nya.
- "Apa isi body POST yang wajib?" → `teks`, bertanda `required`.
- "Apa yang terjadi kalau id tidak ada?" → `404`, ada contoh pesannya.

Dokumentasi yang baik menjadikan pertanyaan "bagaimana cara pakai API ini?" terjawab tanpa menunggu balasan chat dari backend developer.

## Buktikan sendiri

- Di `/docs`, coba `POST /api/auth/login` dengan `{"nama": "ab"}` → jawabannya `400` beserta pesan error — persis yang materi bilang.
- Login dengan nama benar → Authorize dengan tokennya → `GET /api/todos` → daftar milikmu tampil.
- `DELETE` todo yang tidak ada → `404` dengan `{"error": "Todo tidak ditemukan"}`.

## Ringkasan

- ✅ Swagger UI menampilkan `openapi.json` sebagai dokumentasi interaktif di `/docs`.
- ✅ **Try it out** mengirim request sungguhan — cara cepat memahami API sebelum menulis kode.
- ✅ **Authorize** menempelkan token ke semua percobaan — seperti `kirimRequest` versi dokumentasi.
- ✅ Jawaban "cara pakai API" ada di dokumen, bukan di kepala orang lain.

Selanjutnya quiz dan tugas — tugas terakhir track ini: membuktikan kamu bisa memakai API hanya dengan membaca dokumentasinya.
