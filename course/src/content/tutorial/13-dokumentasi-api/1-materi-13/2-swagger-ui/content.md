---
type: lesson
title: "Swagger UI dan Try it out"
template: baca
previews: false
terminal: false
---

# Swagger UI — mencoba API dari browser

**Swagger UI** adalah halaman yang membaca dokumen OpenAPI lalu menampilkan daftar endpoint dalam bentuk yang bisa dicoba. Buka dokumentasi API latihan di:

```text
https://nextjs-track-api.vercel.app/docs
```

## Mengenali daftar endpoint

Setiap endpoint menampilkan method dan alamatnya. Contohnya, `GET /api/todos` untuk membaca daftar dan `POST /api/todos` untuk menambahkan Todo.

Klik `GET /api/todos`. Kamu akan melihat parameter seperti `owner`, `q`, `status`, `page`, dan `limit`, serta kode jawaban yang mungkin dikirim server.

## Try it out: kirim request dari halaman dokumentasi

Tombol **Try it out** membuka kolom untuk mengisi request. Kita akan mendapatkan token agar request berikutnya bisa memakai identitas akun.

1. Jika belum punya akun latihan, buka `POST /api/auth/register`. Klik **Try it out**, lalu isi `{"nama":"budi","password":"rahasia123"}`.
2. Klik **Execute**. Jika nama belum pernah dipakai, server membalas `201` dan mengirim token.
3. Jika akun sudah ada, gunakan `POST /api/auth/login` dengan nama dan password yang sama. Login berhasil membalas `200` dan token.

Kita bisa mencoba API dari browser tanpa menulis kode `fetch`.

## Authorize: pakai token pada request

Tombol **Authorize** membantu Swagger UI mengirim token pada request:

1. Salin nilai `token` dari jawaban register atau login.
2. Klik **Authorize**, tempel token, lalu klik **Authorize** lagi.
3. Coba `GET /api/todos`. Request akan membawa header `Authorization: Bearer <token>`. Server memakai nama di token untuk memilih daftar Todo.

## Cari jawaban di dokumentasi

Detail endpoint di `/docs` membantu menjawab pertanyaan seperti:

- Bagaimana mengubah sebagian isi Todo? Gunakan `PATCH /api/todos/{id}`.
- Nilai apa yang boleh dikirim untuk `status`? `semua`, `belum`, atau `selesai`.
- Apa yang dikirim saat menambahkan Todo? Body JSON berisi `teks`.
- Apa jawaban server jika Todo tidak ditemukan? Status `404`.

Biasakan membaca dokumentasi sebelum menebak alamat atau isi request.

## Buktikan sendiri

- Coba login dengan `{"nama":"budi","password":"salah123"}`. Jika password tidak cocok, server membalas `401` dengan pesan bahwa nama atau password salah.
- Gunakan token hasil register atau login, lalu jalankan `GET /api/todos`. Daftar Todo untuk akun tersebut akan muncul.
- Sebelum mencoba `POST` atau `DELETE`, periksa body dan ID yang kamu isi. Request Try it out dikirim ke API live dan bisa mengubah data.

## Ringkasan

- ✅ Swagger UI menampilkan daftar endpoint dan cara memakainya.
- ✅ **Try it out** mengirim request sungguhan dari browser.
- ✅ **Authorize** menambahkan token ke request yang dicoba.
- ✅ Periksa request sebelum menekan **Execute**, karena API ini menyimpan data latihan.

Selanjutnya, kerjakan quiz dan tugas. Di tugas, kamu akan menambahkan fitur dengan mengikuti dokumentasi API.
