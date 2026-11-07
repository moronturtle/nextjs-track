---
type: lesson
title: "Langkah 1: tambah dan selesaikan tugas"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 1: tambah dan selesaikan tugas

Kerangka folder sudah siap. Sekarang kita isi aplikasi dengan fitur utama: menambah tugas, menandai selesai, dan menghapus tugas.

## Peran tiap file

```text
app/todo/page.tsx                         → alamat /todo
app/todo/_components/todo-app.tsx         → menyusun komponen Todo
app/todo/_components/todo-form.tsx        → input tugas baru
app/todo/_components/todo-list.tsx        → menampilkan daftar
app/todo/_components/todo-item.tsx        → menampilkan satu tugas
contexts/todo-context.tsx                 → menyimpan daftar dan fungsi
data/todo.ts                              → contoh tugas awal
types/todo.ts                             → data yang dimiliki setiap Todo
```

`page.tsx` menyusun halaman. `TodoProvider` di Context menyimpan daftar tugas dan fungsi untuk mengubah daftar. Komponen Todo membaca daftar itu melalui hook `useTodos`.

## Bentuk data Todo

Buka `project/types/todo.ts`. Setiap tugas memiliki tiga data:

```ts
export type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
};
```

- `id` membedakan satu tugas dari tugas lain.
- `teks` menyimpan isi tugas.
- `selesai` menyimpan apakah tugas sudah dicentang.

Contoh daftar awal ada di `project/data/todo.ts`. Daftar ini membuat kita bisa mencoba aplikasi tanpa mengetik tugas dari awal.

## Provider mengubah daftar

Buka `project/contexts/todo-context.tsx`. Fungsi `ubahSelesai` menandai tugas selesai atau mengembalikannya menjadi belum selesai:

```tsx
const ubahSelesai = useCallback((id: number) => {
  setTodos((daftarLama) =>
    daftarLama.map((todo) =>
      todo.id === id ? { ...todo, selesai: !todo.selesai } : todo,
    ),
  );
}, []);
```

`map` memeriksa setiap tugas. Jika `id`-nya cocok, fungsi membuat objek tugas baru dengan nilai `selesai` yang dibalik. Tugas lain tetap seperti semula.

## Komponen anak meminta perubahan

`TodoApp` membaca fungsi dari Context lalu mengirimnya ke `TodoItem` lewat props. Saat kotak centang ditekan, `TodoItem` memanggil fungsi tersebut:

```tsx
<input
  type="checkbox"
  checked={todo.selesai}
  onChange={() => saatDicentang(todo.id)}
/>
```

Alurnya: pengunjung mencentang kotak → `TodoItem` memanggil `saatDicentang` → `TodoProvider` memperbarui daftar.

`TodoForm` menyimpan state teks yang sedang diketik. Teks itu hanya dipakai oleh form, jadi tidak perlu ditambahkan ke Context.

## Coba di project-mu

Lengkapi komponen di `app/todo/_components/` dan fungsi di `contexts/todo-context.tsx` mengikuti contoh di panel File. Buka `/todo`, lalu coba tambah, centang, dan hapus tugas. Pindah ke halaman detail lalu kembali; daftar Todo masih sama. Setelah reload, daftar kembali ke contoh awal. Kita simpan daftar di lesson berikutnya.

## Ringkasan

- ✅ `TodoProvider` menyimpan daftar dan fungsi untuk mengubahnya.
- ✅ `TodoForm` menyimpan teks yang sedang diketik.
- ✅ `TodoItem` menerima data serta fungsi lewat props.
- ✅ `map` membuat daftar baru saat status tugas berubah.
- ❌ Daftar belum tersimpan setelah halaman dimuat ulang.

Berikutnya, kita simpan daftar supaya tetap ada setelah reload.
