---
type: lesson
title: "Tugas: todo naik kelas"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: todo naik kelas

Lanjutan dari project yang sama — sekarang dengan aplikasi todo yang sudah berjalan dari materi pertemuan ini.

Aplikasinya sudah jalan, tapi ada dua kelemahan yang akan kamu perbaiki sekaligus: daftar tugas belum bisa difilter, dan daftar tugas tersimpan di `localStorage` tetapi state-nya tidak bisa dibaca komponen lain — misalnya menu, yang seharusnya bisa menampilkan "3 tugas tersisa" di semua halaman.

## Yang dikerjakan

### 1. Pindahkan todos ke Context

Sekarang `todos` dipegang `todo-app.tsx`, jadi komponen lain tidak bisa ikut membaca — menu di `layout.tsx` termasuk korbannya. Ini persis masalah global state dari pertemuan 05, dan jawabannya sama: **Context**.

Buat `app/todo-context.tsx` — polanya identik dengan `favorit-context.tsx` dari tugas 05, tapi isinya daftar todo lengkap dengan `tambah`, `toggle`, dan `hapus`. Kedua `useEffect` untuk `localStorage` pindah ke dalam Provider juga:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Todo = { id: number; teks: string; selesai: boolean };

type TodoState = {
  todos: Todo[];
  tambah: (teks: string) => void;
  toggle: (id: number) => void;
  hapus: (id: number) => void;
};

const TodoContext = createContext<TodoState | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const tersimpan = localStorage.getItem("todos");
    if (tersimpan) setTodos(JSON.parse(tersimpan));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const tambah = (teks: string) =>
    setTodos([...todos, { id: Date.now(), teks, selesai: false }]);

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));

  const hapus = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <TodoContext.Provider value={{ todos, tambah, toggle, hapus }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos hanya bisa di dalam TodoProvider");
  return ctx;
}
```

Lalu pasang `<TodoProvider>` di `app/layout.tsx` membungkus `Menu` dan `{children}` — sama seperti `FavoritProvider`.

Sesudah Provider terpasang, perbarui komponen-komponennya:

- `todo-app.tsx` — hapus `useState` todos dan fungsi-fungsinya; ganti dengan `const { todos, tambah, toggle, hapus } = useTodos();`. `useState` untuk `teks` tetap — itu state lokal form, bukan urusan global.
- `detail-todo.tsx` — ganti `useEffect` + pembacaan `localStorage` dengan `const { todos } = useTodos();` lalu `todos.find((t) => String(t.id) === id)`. Lebih pendek dan tidak menyentuh `localStorage` langsung — `localStorage` tetap dipakai, tapi sekarang hanya Provider yang bicara dengannya.

### 2. Jumlah tersisa di menu

`app/menu.tsx` sudah `"use client"` dari tugas 03. Tambahkan `useTodos()` dan tampilkan sisa tugas di ujung kanan menu — misalnya `Todo: {sisa}` di mana `sisa = todos.filter((t) => !t.selesai).length`.

Uji: tambah tugas di `/todo`, lalu pindah ke `/blog` — angka di menu ikut berubah. Inilah global state bekerja: satu sumber di Provider, dibaca dari halaman mana pun.

### 3. Filter daftar

Di `todo-app.tsx`, tambahkan satu state lokal — `const [filter, setFilter] = useState<"semua" | "belum" | "selesai">("semua")` — dan tiga tombol di atas daftar untuk memilihnya. Daftar yang dirender adalah `todos` yang sudah disaring:

```tsx
const tampil = todos.filter((t) =>
  filter === "semua" ? true : filter === "selesai" ? t.selesai : !t.selesai
);
```

Perhatikan: `filter` sengaja tetap `useState` lokal — pilihan filter adalah urusan halaman ini saja, tidak perlu diangkat ke Context. Ini keputusan arsitektur dari pertemuan 05: global untuk yang dipakai banyak halaman, lokal untuk yang dipakai satu tempat.

### 4. Periksa hasilnya

```bash
npm run lint
npx prettier --write app
npx tsc --noEmit
```

## Kriteria selesai

- [ ] Project yang sama dengan tugas pertemuan sebelumnya
- [ ] `app/todo-context.tsx` berisi `TodoProvider` (state + `localStorage`) dan hook `useTodos`
- [ ] `TodoProvider` terpasang di `app/layout.tsx`
- [ ] `todo-app.tsx` dan `detail-todo.tsx` membaca data lewat `useTodos` — tidak ada lagi `localStorage` di luar Provider
- [ ] Menu menampilkan jumlah tugas tersisa dan ikut berubah dari halaman mana pun
- [ ] Filter Semua / Belum selesai / Selesai bekerja dengan state lokal
- [ ] `npm run lint` dan `npx tsc --noEmit` selesai tanpa error

## Bonus (opsional): edit tugas

Tambahkan tombol pensil di `TodoItem`. Saat ditekan, teks berubah menjadi input terisi isi tugas; Enter menyimpan (lewat fungsi `ubah(id, teksBaru)` yang kamu tambahkan di Provider), Escape membatalkan. Ini latihan gabungan: state lokal untuk mode edit, callback naik ke Context.

## Cara mengumpulkan

Lewat pull request di repo yang sama, dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-06
git add .
git commit -m "Tugas 06"
git push -u origin tugas-06
```

Buat pull request dari `tugas-06` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 06](/pengumpulan?t=tugas-06)**

Tunggu approve mentor, lalu merge sendiri dan samakan branch utama di komputermu:

```bash
git checkout main && git pull
```
