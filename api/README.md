# hsi-todo-api

API latihan untuk materi pertemuan 07–13. Dipakai murid untuk belajar `fetch`,
mengirim data, membaca status response, autentikasi JWT, dan dokumentasi API.

## Menjalankan di lokal

```bash
pnpm install
pnpm dev
```

API berjalan di `http://localhost:3001`. Tanpa variabel Upstash, data disimpan
di `.data/todos.json` sehingga semua endpoint tetap bisa dicoba.

## Endpoint

| Method   | Alamat                                                         | Keterangan                                                                     |
| -------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/todos?owner=<nama>`                                      | Daftar todo. Owner baru otomatis mendapat data awal.                           |
| `GET`    | `/api/todos?owner=<nama>&page=1&limit=5&q=<kata>&status=belum` | Pagination, pencarian, dan filter status.                                      |
| `POST`   | `/api/todos?owner=<nama>`                                      | Tambah todo. Body: `{"teks": "..."}` (minimal 3 karakter).                     |
| `PATCH`  | `/api/todos/<id>?owner=<nama>`                                 | Edit sebagian field: `teks`, `selesai`, atau keduanya.                         |
| `PUT`    | `/api/todos/<id>?owner=<nama>`                                 | Ganti seluruh field yang dapat diedit. Body wajib berisi `teks` dan `selesai`. |
| `DELETE` | `/api/todos/<id>?owner=<nama>`                                 | Delete todo; respons sukses `204` tanpa body.                                  |
| `POST`   | `/api/auth/register`                                           | Register. Body: `{"nama": "...", "password": "..."}` → akun dibuat + token.    |
| `POST`   | `/api/auth/login`                                              | Login. Body: `{"nama": "...", "password": "..."}` → balas `{token, nama}`.     |

Setelah login, `owner` diambil dari token (`Authorization: Bearer <token>`),
tidak perlu `?owner=` lagi.

## Status response Todo

- `POST` sukses membalas `201` dan data Todo yang dibuat.
- `PATCH` dan `PUT` sukses membalas `200` dan data Todo terbaru.
- `DELETE` sukses membalas `204` tanpa body.
- Request dengan body tidak valid membalas `400` dan `{ "error": "..." }`.
- `id` yang tidak ditemukan membalas `404` dan `{ "error": "..." }`.

Form di browser boleh memvalidasi lebih awal untuk memberi arahan kepada pengguna. API tetap
memeriksa ulang isi request sebelum menyimpan data.

## Dokumentasi

- `/docs` — Swagger UI.
- `/api/openapi.json` — spesifikasi OpenAPI.

## Deploy ke Vercel

Buat project Vercel baru dari repo ini dengan **Root Directory: `api`**, lalu
isi environment variables:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `JWT_SECRET`
