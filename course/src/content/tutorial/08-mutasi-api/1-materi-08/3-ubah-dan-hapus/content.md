---
type: lesson
title: "Ubah dan hapus lewat API"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 3: centang dan hapus lewat server

Dua tombol terakhir — centang dan hapus — kita sambungkan dengan `PATCH` dan `DELETE`. Alamatnya berbeda dari POST: kali ini ada **`id` todo di ujung URL**, karena server perlu tahu data mana yang diubah.

## Dua fungsi baru di lib/todo-api.ts

```ts
export async function ubahTodo(
  owner: string,
  id: number,
  perubahan: { teks?: string; selesai?: boolean },
): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perubahan),
  });
  return res.json();
}

export async function hapusTodo(owner: string, id: number): Promise<void> {
  await kirimRequest(`/api/todos/${id}?owner=${owner}`, { method: "DELETE" });
}
```

Dua hal baru yang perlu diperhatikan:

- `PATCH /api/todos/3` — id `3` ada di URL, bukan di body. Body hanya berisi bagian yang berubah, misalnya `{ "selesai": true }`.
- `DELETE` sukses membalas **`204`** — "berhasil, tanpa isi". Karena itu `hapusTodo` tidak memanggil `res.json()`: tidak ada isi untuk dibaca. Kalau dipaksa, `res.json()` akan error.

:::info{title="PATCH atau PUT?"}
API latihan menerima keduanya dan berperilaku sama. Beda teorinya: `PUT` mengganti seluruh data dengan yang dikirim, `PATCH` hanya mengubah bagian yang dikirim. Untuk mengubah `selesai` saja, `PATCH` lebih pas — kita tidak perlu mengirim ulang `teks`.
:::

## Provider: urutannya sama dengan tambahTodo

```tsx
const ubahSelesai = useCallback(async (id: number) => {
  const target = todos.find((todo) => todo.id === id);
  if (!target) return;
  const hasil = await api.ubahTodo(OWNER, id, { selesai: !target.selesai });
  setTodos((daftarLama) => daftarLama.map((todo) => (todo.id === id ? hasil : todo)));
}, [todos]);

const hapusTodo = useCallback(async (id: number) => {
  await api.hapusTodo(OWNER, id);
  setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
}, []);
```

- `ubahSelesai` mengirim nilai kebalikan dari status sekarang (`!target.selesai`), lalu menyimpan jawaban server ke daftar. Karena membaca `todos`, dependency `useCallback`-nya sekarang `[todos]` — beda dengan pertemuan 06 yang dependency-nya kosong.
- `hapusTodo` cukup menunggu server sukses, lalu membuang todo itu dari daftar.

Kalau request gagal — misalnya todo sudah dihapus orang lain sehingga server menjawab `404` — errornya terlempar ke komponen yang memanggil. Untuk sekarang kita biarkan terlihat di console; di tugas kamu bisa menampilkan pesannya seperti di `TodoForm`.

## Buktikan sendiri

- Centang satu tugas → refresh → centangnya tetap. Hapus satu tugas → refresh → tetap hilang. Sekarang perubahanmu sungguh tersimpan di server.
- Buka alamat API-mu di tab browser (`/api/todos?owner=namamu`) — isi daftarnya persis seperti yang terlihat di halaman.

## Ringkasan

- ✅ `PATCH /api/todos/:id` — `id` di URL, bagian yang berubah di body.
- ✅ `DELETE` sukses membalas `204` tanpa isi — jangan panggil `res.json()`.
- ✅ Pola yang sama dengan POST: kirim → tunggu sukses → ubah state dengan jawaban server.
- ✅ `useCallback` yang membaca `todos` perlu dependency `[todos]`.

Aplikasi Todo-mu sekarang full CRUD — semua perubahan bertahan di server. Selanjutnya quiz, lalu tugas.
