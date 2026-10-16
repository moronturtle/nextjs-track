---
type: lesson
title: "Langkah 2: simpan ke localStorage"
template: baca
previews: false
terminal: false
focus: /project/app/todo/todo-app.tsx
---

# Langkah 2: simpan ke localStorage

Coba reload halaman `/todo`-mu — semua tugas hilang. State `useState` hidup di memori: saat halaman dibuat ulang, daftarnya kembali ke nilai awal. Supaya tugas selamat, kita simpan ke `localStorage` — penyimpanan kecil di browser yang kamu pakai untuk tombol suka di pertemuan 04.

## Dua effect, dua arah

Pola dari `LikeButton` dipakai lagi — hanya isinya yang berupa array. Di `todo-app.tsx`, tambahkan `useEffect` dan ubah nilai awal `useState`:

```tsx
"use client";

import { useEffect, useState } from "react";
import TodoItem from "./todo-item";

type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [teks, setTeks] = useState("");

  // Sekali saat tampil: baca simpanan
  useEffect(() => {
    const tersimpan = localStorage.getItem("todos");
    if (tersimpan) setTodos(JSON.parse(tersimpan));
  }, []);

  // Tiap todos berubah: tulis simpanan
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ...tambah, toggle, hapus sama persis seperti sebelumnya
}
```

Dua fungsi baru:

- **`JSON.stringify(todos)`** — `localStorage` hanya bisa menyimpan teks, jadi array diubah jadi string JSON dulu.
- **`JSON.parse(tersimpan)`** — saat dibaca, string JSON diubah kembali menjadi array sungguhan.

Sekarang coba: tambah tugas → reload → tugas tetap ada. Effect kedua menulis ulang seluruh daftar setiap kali `todos` berubah — sederhana, dan cukup untuk ukuran aplikasi ini.

:::warning{title="Kedip sekejap itu normal"}
Saat halaman pertama dibuka, daftar sekejap tampak kosong lalu terisi — effect membaca `localStorage` setelah tampilan pertama selesai. Di aplikasi sungguhan ini ditutupi dengan tulisan "memuat"; untuk project kita, kedip kecil itu wajar.
:::

## Bonus penting: data bisa dibaca halaman lain

Ada satu akibat yang lebih penting. State `useState` di `todo-app.tsx` tidak bisa dibaca halaman lain — begitu pindah ke `/todo/42`, komponen itu punya memorinya sendiri dan `todos`-mu tidak ikut. Tapi `localStorage` adalah milik browser, bukan milik komponen — **halaman mana pun bisa membacanya**.

Itulah kunci langkah berikutnya: halaman detail `/todo/42` akan membaca daftar dari `localStorage`, mencari tugas dengan `id` 42, lalu menampilkannya — tanpa perlu Context, tanpa prop drilling.

## Coba di project-mu

Tambahkan dua `useEffect` di `todo-app.tsx` dan ubah nilai awal `useState` menjadi `[]`. Contoh tugas bawaan boleh dihapus — kamu bisa mengetiknya sendiri sekarang. Tambah beberapa tugas, reload — semuanya harus tetap ada. Hapus satu, reload lagi — dia tetap hilang, bukti tulisan ke `localStorage` juga ikut.

## Ringkasan

- ✅ `localStorage` hanya menyimpan teks — array harus lewat `JSON.stringify` dan `JSON.parse`
- ✅ Effect `[]` membaca simpanan sekali; effect `[todos]` menulis tiap daftar berubah
- ✅ `localStorage` milik browser — bisa dibaca komponen dan halaman mana pun
- ❌ State di `useState` tidak ikut saat pindah halaman — jangan andalkan memori komponen untuk data yang dipakai lintas halaman

Data sudah selamat dan bisa dibaca di mana saja. Langkah 3: setiap tugas mendapat halaman detailnya sendiri di `/todo/42`.
