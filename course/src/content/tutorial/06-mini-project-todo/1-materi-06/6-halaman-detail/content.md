---
type: lesson
title: "Langkah 3: halaman detail"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-detail.tsx
---

# Langkah 3: buka halaman detail tugas

Setiap tugas sekarang bisa dibuka di halaman sendiri, misalnya `/todo/12`. Halaman daftar dan detail sama-sama perlu membaca daftar Todo. Kita sudah menyiapkan Context di pertemuan 05, jadi kedua halaman bisa membaca state dari `TodoProvider`.

## Buat alamat dinamis

Kita memakai pola `[slug]` dari halaman blog. Kali ini, nama foldernya `[id]`:

```text
app/todo/
└── [id]/
    └── page.tsx                  ← membaca id dari alamat
app/todo/_components/
└── todo-detail.tsx               ← menampilkan satu tugas
```

`app/todo/[id]/page.tsx` membaca `id`, lalu mengirimkannya ke komponen detail:

```tsx
import TodoDetail from "../_components/todo-detail";

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TodoDetail id={id} />;
}
```

Nilai `id` dari alamat berbentuk teks. Komponen detail membandingkannya dengan `id` Todo yang berbentuk angka, jadi kode mengubah angka menjadi teks dengan `String(todo.id)`.

## Baca Todo dari Context

Buka `app/todo/_components/todo-detail.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useTodos } from "@/contexts/todo-context";

export default function TodoDetail({ id }: { id: string }) {
  const router = useRouter();
  const { todos, sudahMemuat } = useTodos();
  const todo = todos.find((item) => String(item.id) === id);

  if (!sudahMemuat) return <p>Memuat tugas...</p>;
  if (!todo) return <p>Tugas tidak ditemukan.</p>;

  return (
    <div>
      <h1>{todo.teks}</h1>
      <p>Status: {todo.selesai ? "Selesai" : "Belum selesai"}</p>
      <button onClick={() => router.back()}>← Kembali</button>
    </div>
  );
}
```

- `useTodos()` membaca daftar dari `TodoProvider`.
- `find` mencari satu Todo dengan `id` yang sama.
- Jika browser belum selesai membaca data, halaman menampilkan "Memuat tugas...".
- Jika id tidak ditemukan, halaman menampilkan "Tugas tidak ditemukan".
- `router.back()` kembali ke halaman sebelumnya.

`TodoProvider` dipasang di `app/todo/layout.tsx`. Karena layout ini menaungi `/todo` dan `/todo/[id]`, state Todo tetap sama saat pengunjung berpindah di antara dua halaman tersebut.

## Hubungkan daftar ke halaman detail

Di `app/todo/_components/todo-item.tsx`, bungkus teks Todo dengan `Link`:

```tsx
import Link from "next/link";

<Link href={`/todo/${todo.id}`}>{todo.teks}</Link>
```

## Coba di project-mu

Buka `/todo`, lalu tekan teks sebuah tugas. Alamat berubah menjadi `/todo/{id}` dan halaman detail menampilkan tugas yang dipilih. Tekan **Kembali** untuk kembali ke daftar.

## Ringkasan

- ✅ `[id]` membuat alamat detail untuk setiap tugas.
- ✅ `TodoProvider` membagikan daftar yang sama ke halaman daftar dan detail.
- ✅ `useTodos()` membaca daftar tanpa menerima props dari halaman daftar.
- ✅ `router.back()` kembali ke halaman sebelumnya.

Berikutnya, kita tambahkan filter dan rapikan folder serta tampilan akhir.
