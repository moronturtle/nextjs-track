---
type: lesson
title: "Langkah 1: daftar dan state"
template: baca
previews: false
terminal: false
focus: /project/app/todo/todo-app.tsx
---

# Langkah 1: daftar dan state

Kita mulai membangun. Tujuan langkah ini: halaman `/todo` menampilkan daftar tugas, dan kamu bisa menambah, mencentang, serta menghapus item — semuanya lewat `useState`.

## Tiga file, tiga tugas

```text
app/todo/
├── page.tsx        ← komponen server: menyusun halaman, memanggil <TodoApp />
├── todo-app.tsx    ← client: memegang state, form, dan daftar
└── todo-item.tsx   ← satu baris tugas (komponen anak)
```

`page.tsx` tetap komponen server — dia hanya menyusun halaman:

```tsx
import TodoApp from "./todo-app";

export default function TodoPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">Todo Saya</h1>
      <div className="mt-6">
        <TodoApp />
      </div>
    </main>
  );
}
```

Semua yang interaktif ada di `todo-app.tsx`, yang ditandai `"use client"`.

## Pemilik state: todo-app.tsx

Buka file-nya di panel File. Ada dua state dan tiga fungsi penting:

```tsx
"use client";

import { useState } from "react";
import TodoItem from "./todo-item";

type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, teks: "Belajar Next.js", selesai: true },
    { id: 2, teks: "Kerjakan tugas 05", selesai: false },
  ]);
  const [teks, setTeks] = useState("");

  const tambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teks.trim()) return;
    setTodos([...todos, { id: Date.now(), teks: teks.trim(), selesai: false }]);
    setTeks("");
  };

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));

  const hapus = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <div>
      <form onSubmit={tambah} className="flex gap-2">
        <input
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          placeholder="Tugas baru..."
          className="flex-1 rounded-lg border px-4 py-2"
        />
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
          Tambah
        </button>
      </form>
      <ul className="mt-4">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} saatToggle={toggle} saatHapus={hapus} />
        ))}
      </ul>
      <p className="mt-4 text-sm text-slate-600">
        {todos.filter((t) => !t.selesai).length} tugas tersisa
      </p>
    </div>
  );
}
```

Semua polanya sudah kamu kenal dari pertemuan 04 dan 05:

- **`type Todo`** — TypeScript mencatat bentuk satu tugas: `id`, `teks`, `selesai`.
- **`tambah`** — `e.preventDefault()` menghentikan reload bawaan form. `[...todos, baru]` membuat array baru — **tidak ada `push` langsung**.
- **`toggle`** — `map` menghasilkan array baru. Hanya item dengan `id` itu yang disalin dengan `selesai` dibalik.
- **`hapus`** — `filter` membuang item dengan `id` itu. Sama seperti `toggle` di tugas favorit 05.
- **`teks`** — controlled input: nilai input dipegang state, sama seperti `KotakCari`.

## Anaknya: todo-item.tsx

`TodoItem` hanya menerima props — sama seperti `KotakCari`, tidak perlu `"use client"` karena diimpor komponen client:

```tsx
type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoItem({
  todo,
  saatToggle,
  saatHapus,
}: {
  todo: Todo;
  saatToggle: (id: number) => void;
  saatHapus: (id: number) => void;
}) {
  return (
    <li className="flex items-center gap-2 py-2">
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatToggle(todo.id)}
      />
      <span className={todo.selesai ? "line-through text-slate-400" : ""}>
        {todo.teks}
      </span>
      <button onClick={() => saatHapus(todo.id)} className="ml-auto">
        ✕
      </button>
    </li>
  );
}
```

State `todos` ada di `TodoApp`. `TodoItem` hanya menampilkan dan memanggil callback — persis pola state antar komponen dari pertemuan 04.

## Coba di project-mu

Buat ketiga file di project tugasmu (folder `app/todo/`), jalankan dev server, buka `localhost:3000/todo`. Tambah tugas, centang, hapus — semuanya harus jalan. Tapi coba reload: **daftarmu hilang**. Itu masalah langkah berikutnya.

## Ringkasan

- ✅ `page.tsx` komponen server menyusun halaman; `todo-app.tsx` `"use client"` memegang state dan semua handler
- ✅ Tambah = `[...todos, baru]`, ubah = `map`, hapus = `filter` — array selalu dibuat baru
- ✅ `TodoItem` menerima props `todo` dan callback — anak tidak memiliki state sendiri
- ❌ State belum tersimpan — reload menghapus semua tugas

Lanjut ke langkah 2: simpan tugas ke `localStorage` supaya selamat dari reload.
