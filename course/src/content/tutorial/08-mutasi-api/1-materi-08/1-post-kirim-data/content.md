---
type: lesson
title: "POST: kirim data ke API"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 08 — Kirim perubahan Todo ke server

Di pertemuan 07, aplikasi berhasil mengambil daftar Todo dari server. Namun, jika kamu menambahkan Todo, perubahan baru tersimpan di browser. Setelah halaman di-refresh, Todo tersebut hilang karena server belum menerimanya.

Di pertemuan ini, kita ubah alur aplikasi agar perubahan Todo dikirim ke API. Kita mulai dengan `POST` untuk menambah Todo, lalu belajar cara form menunggu jawaban server.

**Yang kamu pelajari di pertemuan ini:**

- `POST` untuk membuat Todo baru.
- `PATCH` untuk mengedit sebagian data Todo.
- `PUT` untuk mengedit semua field Todo yang dapat diubah.
- `DELETE` untuk menghapus Todo.
- Validasi form dan cara menampilkan error dari API.

## Kenali method API

API Todo mengikuti pola REST sederhana. URL menunjukkan resource yang dituju (data Todo), sedangkan method HTTP menunjukkan aksi yang diminta:

| Method   | Kegunaan                                     | Contoh                  |
| -------- | -------------------------------------------- | ----------------------- |
| `GET`    | Mengambil daftar atau detail Todo            | `GET /api/todos`        |
| `POST`   | Membuat Todo baru                            | `POST /api/todos`       |
| `PATCH`  | Edit sebagian field (bagian data) Todo       | `PATCH /api/todos/123`  |
| `PUT`    | Mengganti semua field Todo yang dapat diedit | `PUT /api/todos/123`    |
| `DELETE` | Hapus Todo                                   | `DELETE /api/todos/123` |

`PATCH` dan `PUT` sama-sama untuk mengedit data, tetapi cara kerjanya berbeda. `PATCH` hanya mengirim field yang berubah. `PUT` mengirim semua field yang dapat diedit.

**CRUD** adalah singkatan dari Create, Read, Update, dan Delete. Untuk Todo, artinya membuat, mengambil, mengedit, dan menghapus data. `PATCH` dan `PUT` sama-sama dipakai untuk aksi Update.

## Kenali file yang akan kita sentuh

Kita lanjutkan project Todo dari pertemuan sebelumnya. Untuk mengirim data, bagian yang paling sering kita buka adalah:

```text
app/
└── todo/
    └── _components/
        ├── todo-form.tsx    # form untuk menambah Todo
        ├── todo-list.tsx    # menampilkan daftar Todo
        ├── todo-item.tsx    # satu baris Todo
        └── todo-app.tsx     # menyatukan form dan daftar Todo
contexts/
└── todo-context.tsx        # state Todo yang dipakai beberapa halaman
lib/
└── todo-api.ts             # fungsi untuk mengirim request ke API
types/
└── todo.ts                 # bentuk data Todo
```

`todo-form.tsx` mengurus input dan tombol. `todo-list.tsx` menampilkan Todo, sedangkan `todo-item.tsx` menampilkan satu Todo. `todo-app.tsx` menyatukan form dan daftar. `todo-context.tsx` menyimpan state Todo dan menyediakan fungsi untuk mengirim perubahan ke API. `todo-api.ts` berisi fungsi `fetch` yang kita tambahkan di lesson ini.

## Kirim Todo dengan POST

Saat kamu menambah Todo, aplikasi mengirim teksnya di **body** request. Body adalah bagian request yang membawa data. Header `Content-Type` memberi tahu server bahwa body tersebut berformat JSON.

```ts
const res = await fetch(
  "https://nextjs-track-api.vercel.app/api/todos?owner=nami",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks: "Belajar mengirim data" }),
  },
);
```

- `method: "POST"` meminta server membuat Todo baru.
- `JSON.stringify(...)` mengubah objek JavaScript menjadi teks JSON.
- Header `Content-Type: application/json` memberi tahu server format data di body.
- `owner=nami` memilih daftar Todo yang sama seperti di pertemuan 07.

## Baca jawaban server

Kalau request berhasil, API membalas status **`201` Created** dan mengirim data Todo yang baru dibuat. Nilai `id` dan `selesai: false` ditentukan oleh server:

```json
{ "id": 1731552000123, "teks": "Belajar mengirim data", "selesai": false }
```

Jangan hanya melihat apakah request sudah terkirim. Periksa juga respons dari server:

| Status | Arti di API Todo                                               |
| ------ | -------------------------------------------------------------- |
| `201`  | Todo baru berhasil dibuat                                      |
| `200`  | Edit berhasil; respons berisi Todo terbaru                     |
| `204`  | Delete berhasil; respons tidak memiliki body                   |
| `400`  | Isi request tidak sesuai, misalnya teks kurang dari 3 karakter |
| `404`  | Todo dengan `id` tersebut tidak ditemukan                      |
| `500`  | Server mengalami masalah                                       |

`fetch` tidak otomatis melempar error saat API membalas status `400` atau `404`. Karena itu, kita perlu memeriksa `res.ok`. Jika server membalas status gagal, kita baca pesan error dari API dan menampilkan pesan itu di form.

## Bungkus request di `lib/todo-api.ts`

File `lib/todo-api.ts` menyimpan alamat API dan fungsi untuk mengirim request. Di sini kita menambahkan fungsi `tambahTodo`. Fungsi ini memeriksa apakah server membalas sukses sebelum mengembalikan data:

```ts
import type { Todo } from "@/types/todo";

export const API_URL = "https://nextjs-track-api.vercel.app";

async function kirimRequest(
  alamat: string,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(`${API_URL}${alamat}`, init);

  if (!res.ok) {
    let pesan = `Request gagal (${res.status})`;
    const data = await res.json().catch(() => null);
    if (data && data.error) {
      pesan = data.error;
    }
    throw new Error(pesan);
  }

  return res;
}

export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });

  return res.json();
}
```

`RequestInit` adalah tipe bawaan untuk opsi `fetch` — di dalamnya kita mengisi `method`, `headers`, dan `body`.

Ketika teks terlalu pendek, API membalas status `400` dan pesan error. Fungsi `kirimRequest` membaca pesan error dari respons, lalu melempar error agar form bisa menampilkan alasan request gagal.

## Coba request di browser

Buka DevTools, pilih tab **Network**, lalu tambahkan Todo dari form. Pilih request `POST /api/todos` untuk melihat method, isi body request, status `201`, dan respons JSON.

## Ringkasan

- ✅ `POST` membuat Todo baru; teksnya dikirim dalam body JSON.
- ✅ API membalas `201` dengan Todo baru yang sudah memiliki `id`.
- ✅ `fetch` perlu memeriksa `res.ok` karena status gagal tidak otomatis melempar error JavaScript.
- ✅ File `lib/todo-api.ts` memisahkan request API dari komponen form.

Berikutnya kita sambungkan form dengan fungsi API dan menunggu jawaban server sebelum mengubah daftar Todo.
