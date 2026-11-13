---
type: lesson
title: "Kirim token di header"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Langkah 2: token di header `Authorization`

Token sudah tersimpan. Sekarang setiap request ke `/api/todos` harus membawanya — bukan di URL, tapi di header bernama `Authorization` dengan format `Bearer <token>`:

```text
Authorization: Bearer eyJhbGciOi...
```

`Bearer` artinya "pembawa" — siapa pun yang membawa token sah ini dianggap pemiliknya. Itulah kenapa token diperlakukan seperti kunci: disimpan baik-baik, tidak disebar.

## Satu tempat untuk semua request

Keuntungan `kirimRequest` yang kamu buat di pertemuan 07: header hanya perlu ditambahkan **di satu tempat**. Buka `project/lib/todo-api.ts`:

```ts
async function kirimRequest(alamat: string, init?: RequestInit): Promise<Response> {
  const token = bacaToken();
  const res = await fetch(`${API_URL}${alamat}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Server menjawab ${res.status}`);
  }
  return res;
}
```

Perhatikan yang berubah:

- `bacaToken()` dibaca dari `localStorage` tepat sebelum request — token yang baru login langsung terpakai.
- Header `Authorization` hanya ditambah **kalau token ada** — tanpa token, request tetap jalan seperti dulu.
- `...init?.headers` mempertahankan header lain seperti `Content-Type` untuk POST/PATCH.

## `?owner=` pensiun

Karena token sudah membawa nama pemilik, server **tidak perlu** `?owner=` lagi — dia membaca `owner` dari isi token. Fungsi-fungsi `lib/todo-api.ts` menjadi lebih pendek:

```ts
export async function bacaTodos(opsi: {...} = {}): Promise<DaftarTodos> {
  const params = new URLSearchParams();
  if (opsi.q) params.set("q", opsi.q);
  if (opsi.status && opsi.status !== "semua") params.set("status", opsi.status);
  if (opsi.page) params.set("page", String(opsi.page));
  if (opsi.limit) params.set("limit", String(opsi.limit));

  const res = await kirimRequest(`/api/todos?${params}`);
  return res.json();
}

export async function tambahTodo(teks: string): Promise<Todo> {
  const res = await kirimRequest("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });
  return res.json();
}
```

Tidak ada lagi argumen `owner` di mana-mana. Siapa kamu ditentukan oleh token — bukan oleh teks di URL yang bisa diketik bebas.

## Yang juga berubah di Provider

`TodoProvider` tidak lagi punya konstanta `OWNER` — panggilan menjadi `api.bacaTodos({q, status, page})`, `api.tambahTodo(teks)`, dan seterusnya. Selebihnya identik dengan pertemuan 10.

## Kalau token salah atau kedaluwarsa?

Server memverifikasi setiap request. Token yang diubah, kedaluwarsa, atau tidak dikenal → server membalas **`401 Unauthorized`**. Di aplikasi nyata, itu saatnya mengarahkan pengguna kembali ke halaman login. Kita sambungkan di lesson berikutnya.

:::tip{title="API kita memaafkan"}
Server latihan masih menerima `?owner=` sebagai cadangan supaya lesson lama tetap jalan. Di aplikasi produksi, endpoint terproteksi biasanya **menolak** request tanpa token — jawabannya 401.
:::

## Buktikan sendiri

Login, lalu buka DevTools → Network → request `GET /api/todos`. Di bagian **Request Headers** ada `Authorization: Bearer eyJ...`. Hapus `token` dari Local Storage, muat ulang — header menghilang dan server memakai owner cadangan.

## Ringkasan

- ✅ `Authorization: Bearer <token>` menggantikan `?owner=` — ditambah sekali di `kirimRequest`.
- ✅ Server membaca identitas dari token; argumen `owner` hilang dari semua fungsi API.
- ✅ Token tidak valid/kedaluwarsa → `401` → kembali ke login.
- ✅ Header hanya ditambah kalau token ada — request publik tetap jalan.

Selanjutnya: halaman login sungguhan — pengguna mendaftar sekali lalu masuk dengan nama + password, token tersimpan, daftar tugas terbuka.
