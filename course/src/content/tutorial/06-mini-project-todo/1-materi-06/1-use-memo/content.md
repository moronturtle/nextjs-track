---
type: lesson
title: Pertemuan 06 — useMemo
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-list.tsx
---

# `useMemo`: simpan hasil hitungan

Di pertemuan 06, kita akan membuat aplikasi Todo. Sebelum mulai, kita kenali dua hook yang bisa membantu saat aplikasi bertambah besar: `useMemo` dan `useCallback`.

Hook adalah fungsi React yang memberi komponen kemampuan tambahan. Contohnya, `useState` menyimpan data yang berubah.

## Contoh: pilih tugas yang tampil

Anggap daftar Todo sudah berisi banyak tugas. Pengunjung bisa memilih untuk melihat semua tugas, tugas yang belum selesai, atau tugas yang sudah selesai.

Daftar yang tampil perlu dihitung dari `todos` dan pilihan `filter`. Buka `project/app/todo/_components/todo-list.tsx`:

```tsx
"use client";

import { useMemo } from "react";

type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
};

type Filter = "semua" | "belum" | "selesai";

export default function TodoList({
  todos,
  filter,
}: {
  todos: Todo[];
  filter: Filter;
}) {
  const todosTampil = useMemo(() => {
    if (filter === "belum") {
      return todos.filter((todo) => !todo.selesai);
    }

    if (filter === "selesai") {
      return todos.filter((todo) => todo.selesai);
    }

    return todos;
  }, [todos, filter]);

  return (
    <ul>
      {todosTampil.map((todo) => (
        <li key={todo.id}>{todo.teks}</li>
      ))}
    </ul>
  );
}
```

File ini diawali dengan `"use client"` karena memakai hook React.

## Cara membaca `useMemo`

- `useMemo` menjalankan fungsi di dalamnya, lalu menyimpan hasilnya.
- Nilai `todos` dan `filter` di dalam `[ ]` memberi tahu React kapan hasil perlu dihitung ulang.
- Kalau `todos` dan `filter` belum berubah, React dapat memakai hasil yang tersimpan.
- Kalau salah satunya berubah, React menghitung daftar yang tampil lagi.

Di contoh ini, hasil yang disimpan adalah `todosTampil`. Hasilnya berasal dari daftar Todo dan pilihan filter.

`useMemo` bukan cara untuk menyimpan data yang akan diubah pengunjung. Data Todo tetap disimpan dengan `useState`. `useMemo` hanya menyimpan hasil hitungan dari data yang sudah ada.

:::tip{title="Jangan gunakan di semua tempat"}
Jika daftar Todo hanya berisi 3–5 tugas, React hanya perlu memeriksa beberapa baris. Menghitung ulang daftar seperti ini biasanya cepat, jadi `useMemo` belum memberi perbedaan yang terasa. `useMemo` berguna saat React perlu memeriksa data yang sangat banyak atau menjalankan hitungan rumit. Kamu tidak perlu memakainya pada setiap daftar.
:::

## Cek pemahaman

Kalau `filter` berubah, React menghitung daftar yang tampil lagi. Kalau hanya bagian lain di halaman yang berubah, `todosTampil` masih bisa memakai hasil sebelumnya karena `todos` dan `filter` belum berubah.

## Ringkasan

- ✅ `useMemo` menyimpan hasil hitungan.
- ✅ `[todos, filter]` memberi tahu React data apa yang dipakai untuk hitungan.
- ✅ Data yang bisa diubah tetap disimpan dengan `useState`.
- ❌ `useMemo` tidak perlu dipakai untuk setiap nilai.

Berikutnya, kita lihat `useCallback`. Hook ini menjaga fungsi tetap sama, bukan menyimpan hasil hitungan.
