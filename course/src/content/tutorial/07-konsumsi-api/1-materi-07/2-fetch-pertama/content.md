---
type: lesson
title: "fetch pertama"
template: baca
previews: false
terminal: false
focus: /project/components/daftar-tugas.tsx
---

# Langkah 1: ambil data di komponen

Kita akan mengambil daftar Todo dari API dan menampilkannya di halaman. Buka `project/components/daftar-tugas.tsx` — file komponen yang menampilkan daftar tugas:

```tsx
"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

export default function DaftarTugas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    async function muat() {
      const res = await fetch(
        "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
      );
      const data = await res.json();
      setTodos(data.todos);
      setSedangMemuat(false);
    }
    muat();
  }, []);

  if (sedangMemuat) return <p>Memuat daftar tugas...</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.teks}</li>
      ))}
    </ul>
  );
}
```

## Kenapa fetch dipanggil di dalam useEffect?

Komponen ini adalah Client Component, yaitu komponen yang berjalan di browser. `useEffect` menjalankan kode setelah komponen tampil. Kita menaruh permintaan di sana agar:

- permintaan dimulai setelah komponen tampil di browser;
- permintaan tidak dikirim ulang setiap kali React memperbarui tampilan komponen.

Array kosong `[]` membuat effect ini dijalankan setelah komponen pertama kali tampil. Polanya mirip saat kita mengambil data dari `localStorage` di pertemuan 06.

## Kenapa ada fungsi `muat`?

Fungsi yang diberikan ke `useEffect` tidak bisa langsung ditulis sebagai fungsi `async`. Jadi, kita membuat fungsi `muat` di dalamnya, lalu memanggil fungsi tersebut. Di dalam `muat`, kita memakai `await` untuk menunggu jawaban API.

## Urutan kejadiannya

1. Komponen tampil. Nilai `sedangMemuat` masih `true`, jadi halaman menampilkan "Memuat daftar tugas...".
2. Fungsi `muat()` meminta data lewat `fetch`.
3. Server mengirim JSON. `res.json()` membacanya, lalu `data.todos` berisi daftar Todo.
4. `setTodos(data.todos)` menyimpan daftar. React memperbarui tampilan dan menampilkan tugas.

State `sedangMemuat` memberi tahu pengguna bahwa aplikasi masih menunggu jawaban server. Tanpa state ini, halaman tampak kosong selama data belum datang.

## Coba di project

Buat komponen `DaftarTugas` seperti contoh, lalu tampilkan di halaman. Daftar Todo dari server akan muncul setelah data diterima.

## Ringkasan

- ✅ `useEffect` menjalankan permintaan setelah komponen tampil.
- ✅ `sedangMemuat` memberi tahu bahwa aplikasi masih menunggu data dari server.
- ✅ `res.json()` membaca jawaban, lalu `setTodos` menyimpannya ke state.

Berikutnya, kita tangani dua keadaan gagal: server mengirim status gagal atau browser tidak bisa terhubung ke server.
