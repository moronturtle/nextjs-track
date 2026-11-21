---
type: lesson
title: "Edit dan delete Todo"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Langkah 3: edit dan delete Todo lewat API

Setelah menambahkan Todo berhasil, kita lanjut ke aksi berikutnya: mengubah Todo yang sudah ada dan menghapus Todo. Kita juga perlu cara untuk memilih Todo yang akan diubah atau dihapus.

API menggunakan `id` Todo di akhir alamat:

```text
/api/todos/123?owner=nami
```

Angka `123` adalah contoh `id`. Parameter `owner=nami` memilih daftar Todo yang sama seperti di materi sebelumnya.

## `PATCH` untuk mengedit sebagian data

Saat kamu mengubah status Todo lewat checkbox, hanya field `selesai` yang berubah. Kita kirim field `selesai` saja dengan method `PATCH`:

```ts
export async function editStatusTodo(
  owner: string,
  id: number,
  selesai: boolean,
): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selesai }),
  });

  return res.json();
}
```

Saat API berhasil, respons berisi Todo terbaru dengan status `200`. Kita gunakan data dari respons tersebut untuk memperbarui item di state, bukan menebak hasil edit sendiri.

## `PUT` untuk mengganti semua field yang dapat diedit

Untuk mengedit teks Todo, kita gunakan `PUT`. Body request harus berisi `teks` dan `selesai`, karena `PUT` mengganti seluruh field Todo yang dapat diedit:

```ts
export async function editTodo(
  owner: string,
  id: number,
  todo: { teks: string; selesai: boolean },
): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks: todo.teks, selesai: todo.selesai }),
  });

  return res.json();
}
```

Kalau hanya mengirim `teks` ke endpoint `PUT`, API membalas status `400`. Untuk mengirim satu field saja, gunakan `PATCH`.

## `DELETE` untuk menghapus Todo

Untuk menghapus Todo, kirim method `DELETE` ke alamat Todo yang ingin dihapus:

```ts
export async function deleteTodo(owner: string, id: number): Promise<void> {
  await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "DELETE",
  });
}
```

Ketika delete berhasil, API membalas status **`204 No Content`**. Status ini berarti request berhasil tetapi respons tidak memiliki body. Karena itu, fungsi `deleteTodo` tidak perlu memanggil `res.json()`.

## Perbarui daftar Todo setelah API membalas

Urutannya sama seperti saat menambahkan Todo: kirim request ke API, tunggu respons sukses, lalu perbarui daftar Todo di state.

```tsx
const toggleSelesai = useCallback(
  async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    const hasil = await api.editStatusTodo(OWNER, id, !target.selesai);
    setTodos((daftarLama) =>
      daftarLama.map((todo) => (todo.id === id ? hasil : todo)),
    );
  },
  [todos],
);

const deleteTodo = useCallback(async (id: number) => {
  await api.deleteTodo(OWNER, id);
  setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
}, []);
```

Komponen item Todo harus menangani Promise dari aksi edit, checkbox, dan delete. Jika request gagal, tampilkan pesan error dan jangan mengubah tampilan Todo.

Fungsi `toggleSelesai` membaca `todos`, jadi dependency `useCallback` berisi `[todos]`. Fungsi `deleteTodo` tidak perlu membaca `todos` dari closure; callback setter selalu menerima daftar Todo terbaru.

Di `todo-app.tsx` — komponen yang menyatukan form, filter, dan daftar Todo — ambil fungsi aksi dari Context lalu kirim sebagai props ke `TodoList`:

```tsx
function TodoApp() {
  const { todos, toggleSelesai, editTodo, deleteTodo } = useTodos();

  return (
    <TodoList
      todos={todos}
      saatDicentang={toggleSelesai}
      saatEdit={editTodo}
      saatDelete={deleteTodo}
    />
  );
}
```

Jika request gagal, jangan mengubah state terlebih dahulu. Tampilkan pesan error agar kamu tahu perubahan belum tersimpan di server.

## Periksa hasilnya

- Centang Todo. Di tab Network, pastikan request memakai `PATCH` dan body berisi `{ "selesai": true }` atau `{ "selesai": false }`.
- Edit teks Todo. Pastikan request memakai `PUT` dan body berisi `teks` serta `selesai`.
- Hapus Todo. Pastikan respons berstatus `204` dan tidak memiliki body.
- Refresh halaman. Edit, status checkbox, dan delete harus tetap tersimpan di server.

## Ringkasan

- ✅ `PATCH` mengedit field tertentu; `PUT` mengganti semua field yang dapat diedit.
- ✅ `DELETE` berhasil dengan status `204` tanpa body.
- ✅ State baru berubah setelah request API berhasil.
- ✅ Jika request gagal, tampilkan pesan dan pertahankan state sebelumnya.

Berikutnya kita bandingkan validasi HTML dengan React Hook Form, lalu pilih cara yang akan dipakai di project.
