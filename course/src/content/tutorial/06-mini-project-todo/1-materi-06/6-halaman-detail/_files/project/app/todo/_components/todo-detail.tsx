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
