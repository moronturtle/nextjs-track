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

| Method | Alamat | Keterangan |
| --- | --- | --- |
| `GET` | `/api/todos?owner=<nama>` | Daftar todo. Owner baru otomatis mendapat data awal. |
| `GET` | `/api/todos?owner=<nama>&page=1&limit=5&q=<kata>&status=belum` | Pagination, pencarian, dan filter status. |
| `POST` | `/api/todos?owner=<nama>` | Tambah todo. Body: `{"teks": "..."}` (minimal 3 karakter). |
| `PATCH` | `/api/todos/<id>?owner=<nama>` | Ubah `teks` atau `selesai`. |
| `PUT` | `/api/todos/<id>?owner=<nama>` | Sama seperti PATCH. |
| `DELETE` | `/api/todos/<id>?owner=<nama>` | Hapus todo. |
| `POST` | `/api/auth/register` | Register. Body: `{"nama": "...", "password": "..."}` → akun dibuat + token. |
| `POST` | `/api/auth/login` | Login. Body: `{"nama": "...", "password": "..."}` → balas `{token, nama}`. |

Setelah login, `owner` diambil dari token (`Authorization: Bearer <token>`),
tidak perlu `?owner=` lagi.

## Dokumentasi

- `/docs` — Swagger UI.
- `/api/openapi.json` — spesifikasi OpenAPI.

## Deploy ke Vercel

Buat project Vercel baru dari repo ini dengan **Root Directory: `api`**, lalu
isi environment variables:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `JWT_SECRET`
