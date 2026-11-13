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

Komponen ini adalah Client Component, yaitu komponen yang berjalan di browser. `useEffect` menjalankan kode setelah komponen tampil. Kita menaruh request di sana agar:

- request dimulai setelah komponen tampil di browser;
- request tidak terkirim ulang setiap kali komponen dirender.

Array kosong `[]` berarti effect ini dijalankan saat komponen pertama kali tampil. Ini mirip pola membaca `localStorage` yang sudah kita pakai di pertemuan 06.

## Kenapa ada fungsi `muat`?

Fungsi effect tidak bisa ditulis sebagai fungsi `async`. Karena itu, kita membuat fungsi `muat` di dalam effect, lalu memanggilnya. Kata kunci `await` dipakai di dalam fungsi `muat` untuk menunggu jawaban API.

## Urutan kejadiannya

1. Komponen tampil. Nilai `sedangMemuat` masih `true`, jadi layar menampilkan "Memuat daftar tugas...".
2. Fungsi `muat()` meminta data lewat `fetch`.
3. Server mengirim JSON. `res.json()` membacanya, lalu `data.todos` berisi daftar Todo.
4. `setTodos(data.todos)` menyimpan daftar. Komponen dirender ulang dan menampilkan tugas.

State `sedangMemuat` memberi tahu pengguna bahwa jawaban server masih ditunggu. Tanpa state ini, halaman tampak kosong selama data belum datang.

## Coba di project

Buat komponen `DaftarTugas` seperti contoh, lalu tampilkan di halaman. Setelah data diterima, daftar Todo dari server akan muncul.

## Ringkasan

- ✅ `useEffect` menjalankan permintaan setelah komponen tampil.
- ✅ `sedangMemuat` memberi tahu bahwa data masih diminta dari server.
- ✅ `res.json()` membaca jawaban, lalu `setTodos` menyimpannya ke state.

Berikutnya, kita tangani dua keadaan gagal: server memberi jawaban error atau tidak bisa dihubungi.
