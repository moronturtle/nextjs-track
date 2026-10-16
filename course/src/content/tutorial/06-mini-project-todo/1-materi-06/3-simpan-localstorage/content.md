---
type: lesson
title: "Langkah 2: simpan ke localStorage"
template: baca
previews: false
terminal: false
focus: /project/app/todo/todo-app.tsx
---

# Langkah 2: simpan ke localStorage

Reload halaman `/todo`-mu — semua tugas hilang. State `useState` hidup di memori: saat halaman dibuat ulang, daftarnya kembali ke nilai awal. Supaya tugas selamat, kita simpan ke `localStorage` — penyimpanan kecil di browser yang kamu pakai untuk tombol suka di pertemuan 04.

## Dua effect, dua arah

Pola dari `LikeButton` dipakai lagi — hanya isinya yang array. Di `todo-app.tsx`, tambahkan `useEffect` dan ubah nilai awal `useState`:

```tsx
"use client";

import { useEffect, useState } from "react";
import TodoItem from "./todo-item";

type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoApp() {
  // Nilai awal: dua contoh — ditimpa simpanan begitu effect pertama jalan
  const [todos, setTodos] = useState<Todo[]>([]);
  const [teks, setTeks] = useState("");

  // SEKALI saat tampil: baca simpanan
  useEffect(() => {
    const tersimpan = localStorage.getItem("todos");
    if (tersimpan) setTodos(JSON.parse(tersimpan));
  }, []);

  // TIAP todos berubah: tulis simpanan
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ...tambah, toggle, hapus sama persis seperti sebelumnya
}
```

Dua fungsi baru:

- **`JSON.stringify(todos)`** — `localStorage` hanya menyimpan teks, jadi array diubah jadi string JSON dulu.
- **`JSON.parse(tersimpan)`** — saat membaca, string JSON diubah kembali menjadi array sungguhan.

Sekarang: tambah tugas → reload → tugas tetap ada. Effect kedua menulis ulang seluruh daftar setiap kali `todos` berubah — sederhana dan cukup untuk ukuran ini.

:::warning{title="Efek samping kecil yang normal"}
Saat halaman pertama dibuka, sekejap daftar tampak kosong lalu terisi — effect membaca `localStorage` setelah render pertama selesai. Di aplikasi sungguhan ini ditangani dengan tampilan "memuat"; untuk project kita, kedip sekejap itu wajar.
:::

## Bonus yang tidak terlihat: data bisa dibaca halaman lain

Ada efek samping yang lebih penting. State `useState` di `todo-app.tsx` tidak bisa dibaca oleh halaman lain — begitu pindah ke `/todo/42`, komponen itu punya memorinya sendiri dan `todos`-mu tidak ikut. Tapi `localStorage` adalah milik browser, bukan milik komponen — **halaman mana pun bisa membacanya**.

Itulah kunci langkah berikutnya: halaman detail `/todo/42` akan membaca daftar dari `localStorage`, mencari tugas dengan `id` 42, dan menampilkannya — tanpa perlu Context, tanpa prop drilling.

## Coba di project-mu

Tambahkan dua `useEffect` di `todo-app.tsx` dan ubah nilai awal `useState` menjadi `[]` (contoh tugas bawaan boleh dihapus — kamu bisa mengetiknya sendiri sekarang). Tambah beberapa tugas, reload — semuanya harus tetap ada. Hapus satu, reload lagi — dia tetap hilang, bukti tulisan ke `localStorage` juga ikut.

## Ringkasan

- ✅ `localStorage` menyimpan teks — array harus lewat `JSON.stringify`/`JSON.parse`
- ✅ Effect `[]` membaca simpanan sekali; effect `[todos]` menulis tiap daftar berubah
- ✅ `localStorage` milik browser — bisa dibaca komponen dan halaman mana pun
- ❌ State di `useState` tidak ikut saat pindah halaman — jangan andalkan memori komponen untuk data lintas halaman

Data sudah selamat dan bisa dibaca di mana saja. Langkah 3: setiap tugas dapat halaman detailnya sendiri di `/todo/42`.
