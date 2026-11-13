---
type: lesson
title: "fetch pertama"
template: baca
previews: false
terminal: false
focus: /project/components/daftar-tugas.tsx
---

# Langkah 1: fetch pertama di komponen

Sekarang kita pakai `fetch` di dalam komponen dan menampilkan hasilnya. Buka `project/components/daftar-tugas.tsx` di panel File:

```tsx
"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

export default function DaftarTugas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    async function muat() {
      const res = await fetch("http://localhost:3001/api/todos?owner=demo");
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

## Kenapa fetch ada di dalam useEffect?

Dua alasan:

- `fetch` mengirim request ke internet — kerja ini milik browser, jadi dijalankan setelah komponen tampil, bukan saat React menyusun tampilan.
- Kalau `fetch` dipanggil langsung di badan komponen, request dikirim **di setiap render** — daftar berubah → render ulang → kirim request lagi → berubah lagi, begitu terus.

`useEffect` dengan `[]` artinya "jalankan sekali setelah komponen pertama tampil" — persis seperti saat membaca `localStorage` di pertemuan 06.

## Kenapa ada fungsi muat di dalamnya?

`useEffect` tidak menerima fungsi `async` langsung, jadi kita membuat fungsi `muat` di dalamnya lalu memanggilnya. Di dalam `muat` barulah `await` boleh dipakai.

## Urutan kejadiannya

1. Komponen tampil → `sedangMemuat` masih `true` → layar menampilkan "Memuat daftar tugas...".
2. `muat()` berjalan → `fetch` mengirim request → server menjawab.
3. `res.json()` mengubah teks JSON menjadi objek → `data.todos` berisi array Todo.
4. `setTodos(data.todos)` → render ulang → `sedangMemuat` sudah `false` → daftar tampil.

State `sedangMemuat` adalah cara kita mengatakan "tunggu, jawaban server belum datang". Tanpa state itu, layar langsung menampilkan daftar kosong padahal data sedang diperjalanan.

## Coba di project-mu

Buat komponen `DaftarTugas` seperti contoh, lalu pasang di sebuah halaman. Kamu akan melihat "Memuat..." sekejap, lalu daftar tugas muncul. Itu bukti request-mu sampai ke server dan kembali.

## Ringkasan

- ✅ `fetch` dipanggil di dalam `useEffect` supaya request terkirim sekali, setelah komponen tampil.
- ✅ `sedangMemuat` menandai "jawaban server belum datang" supaya layar tidak menampilkan daftar kosong palsu.
- ✅ Jawaban server dibaca lewat `res.json()`, lalu disimpan ke state.

Tapi ada yang belum dijawab: kalau servernya mati atau alamatnya salah, apa yang terjadi? Itu bahasan lesson berikutnya.
