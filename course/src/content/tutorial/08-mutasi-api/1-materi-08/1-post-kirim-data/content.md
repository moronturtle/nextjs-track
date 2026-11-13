---
type: lesson
title: "Pertemuan 08 — Mengirim data"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 08 — Mengirim data ke server

Di pertemuan 07 kamu membuktikan sendiri: tugas baru hilang setelah refresh karena `tambahTodo` hanya mengubah state. Pertemuan ini kita kirim perubahan itu ke server — setelah ini, tambah, centang, dan hapus bertahan selamanya.

## GET membaca, method lain mengubah

Selama ini `fetch` kita selalu memakai method `GET` — membaca data. Untuk mengubah data, HTTP menyediakan method lain:

| Method | Artinya | Di API latihan |
| --- | --- | --- |
| `GET` | ambil data | `GET /api/todos` |
| `POST` | buat data baru | `POST /api/todos` |
| `PATCH` / `PUT` | ubah data yang ada | `PATCH /api/todos/3` |
| `DELETE` | hapus data | `DELETE /api/todos/3` |

Empat operasi ini sering disebut **CRUD** — Create, Read, Update, Delete.

## Cara mengirim data: body + header

Untuk `POST`, kita mengirim isi data di **body** — bagian request yang berisi muatan. Dua hal wajib ada:

```ts
const res = await fetch("http://localhost:3001/api/todos?owner=demo", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ teks: "Belajar mengirim data" }),
});
```

- `method: "POST"` — memberi tahu server bahwa request ini membuat data baru.
- `headers: { "Content-Type": "application/json" }` — memberi tahu server bahwa isi body berupa JSON. Tanpa header ini, server tidak tahu cara membaca body yang kita kirim.
- `JSON.stringify(...)` — objek JavaScript diubah menjadi teks JSON, kebalikan dari `res.json()` saat membaca.

## Jawaban server punya arti

Kalau request sukses, server membalas dengan status **`201`** — artinya "data baru berhasil dibuat" — beserta todo yang baru dibuat, lengkap dengan `id` yang dibuat server:

```json
{ "id": 1731552000123, "teks": "Belajar mengirim data", "selesai": false }
```

Kalau body tidak lengkap — misalnya `teks` kosong atau kurang dari 3 karakter — server membalas **`400`** dengan pesan penyebabnya:

```json
{ "error": "teks wajib diisi dan minimal 3 karakter" }
```

`400` artinya "request-mu sampai, tapi isinya tidak bisa diproses". Beda dengan `404` (alamat tidak ada) dan `500` (server bermasalah). Membaca kode ini adalah cara kita tahu kenapa request gagal — nanti di lesson 4 kita menampilkan pesannya ke pengguna.

## Tambahkan ke lib/todo-api.ts

Buka `project/lib/todo-api.ts` — fungsi `tambahTodo` membungkus request POST tadi:

```ts
export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const res = await fetch(`${API_URL}/api/todos?owner=${owner}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });

  if (!res.ok) {
    throw new Error(`Server menjawab ${res.status}`);
  }

  return res.json();
}
```

Pola yang kamu kenal dari GET tetap dipakai: `await fetch`, periksa `res.ok`, baca `res.json()`. Yang baru hanya `method`, `headers`, dan `body`.

## Ringkasan

- ✅ CRUD = `GET` baca, `POST` buat, `PATCH`/`PUT` ubah, `DELETE` hapus.
- ✅ Mengirim data butuh `method`, header `Content-Type: application/json`, dan body berupa `JSON.stringify`.
- ✅ `201` = data dibuat, `400` = isi request salah, `404` = tidak ditemukan.
- ✅ Fungsi API tetap mengikuti pola fetch → periksa `res.ok` → `res.json()`.

Berikutnya kita sambungkan `tambahTodo` ke form — dan menampilkan pesan error dari server ke pengguna.
