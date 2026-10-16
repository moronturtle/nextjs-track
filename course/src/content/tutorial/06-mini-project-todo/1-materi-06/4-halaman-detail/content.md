---
type: lesson
title: "Langkah 3: halaman detail"
template: baca
previews: false
terminal: false
focus: /project/app/todo/[id]/detail-todo.tsx
---

# Langkah 3: halaman detail untuk tiap tugas

Daftar tugas sudah jalan dan tersimpan. Sekarang setiap item mendapat halaman sendiri — klik teksnya, terbang ke `/todo/1718000000000` dan lihat detailnya. Di sinilah tiga konsep bertemu: route dinamis (03), `localStorage` lintas halaman (langkah 2), dan navigasi kembali (03).

## Route-nya: `/todo/[id]`

Kita sudah punya pola `[slug]` dari blog — kali ini `[id]`:

```text
app/todo/
└── [id]/
    ├── page.tsx        ← server: baca params, teruskan id
    └── detail-todo.tsx ← client: cari tugas di localStorage
```

`page.tsx` memakai pola `await params` yang sama dengan blog:

```tsx
import DetailTodo from "./detail-todo";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-xl p-8">
      <DetailTodo id={id} />
    </main>
  );
}
```

## detail-todo.tsx — membaca lintas halaman

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Todo = { id: number; teks: string; selesai: boolean };

export default function DetailTodo({ id }: { id: string }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const semua: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]");
    setTodo(semua.find((t) => String(t.id) === id) ?? null);
  }, [id]);

  if (!todo) return <p>Tugas tidak ditemukan.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{todo.teks}</h1>
      <p className="mt-2">
        Status: {todo.selesai ? "Selesai ✅" : "Belum selesai"}
      </p>
      <button
        onClick={() => router.back()}
        className="mt-6 rounded-lg border px-4 py-2"
      >
        ← Kembali
      </button>
    </div>
  );
}
```

Tiga bagian yang perlu diperhatikan:

- **`useState<Todo | null>(null)`** — nilai awalnya `null` (belum ketemu), diisi saat effect menemukan tugasnya. `Todo | null` berarti "boleh Todo, boleh null" — TypeScript memaksa kita menangani dua-duanya, makanya ada `if (!todo)`.
- **`localStorage.getItem("todos") ?? "[]"`** — `??` memberi nilai cadangan: kalau belum ada simpanan sama sekali, kita pakai array kosong supaya `JSON.parse` tidak error.
- **`router.back()`** — mundur satu halaman, seperti tombol back browser. Ini `useRouter` dari pertemuan 03 dipakai untuk kebutuhan aslinya.

Dan sumber datanya? Persis yang ditulis `todo-app.tsx` — key `localStorage` yang sama, `"todos"`. Dua halaman berbagi satu sumber tanpa Context, karena `localStorage` milik browser.

## Hubungkan daftar ke detail

Terakhir, teks setiap `TodoItem` dibungkus `<Link>` supaya bisa diklik — satu baris perubahan:

```tsx
import Link from "next/link";

// di dalam TodoItem:
<Link href={`/todo/${todo.id}`} className="hover:underline">
  <span className={todo.selesai ? "line-through text-slate-400" : ""}>
    {todo.teks}
  </span>
</Link>
```

## Coba di project-mu

Buat folder `app/todo/[id]/` dengan kedua file di atas, lalu ubah teks `TodoItem` menjadi `Link`. Klik sebuah tugas di `/todo` — halaman detail terbuka, status tampil, dan tombol kembali membawamu pulang ke daftar.

## Ringkasan

- ✅ `[id]` = route dinamis yang sama seperti `[slug]`; `page.tsx` server membaca `await params`
- ✅ Data detail dibaca dari `localStorage` — sumber yang sama dengan daftar, tanpa perlu Context
- ✅ `useState<Todo | null>` + `if (!todo)` = pola umum untuk "data belum tentu ada"
- ✅ `router.back()` = kembali satu halaman lewat kode

Aplikasinya sudah lengkap fungsinya. Langkah terakhir: rapikan tampilannya supaya layak dibanggakan.
