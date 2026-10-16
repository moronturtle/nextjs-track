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
      <p className="mt-2">Status: {todo.selesai ? "Selesai ✅" : "Belum selesai"}</p>
      <button
        onClick={() => router.back()}
        className="mt-6 rounded-lg border px-4 py-2"
      >
        ← Kembali
      </button>
    </div>
  );
}
