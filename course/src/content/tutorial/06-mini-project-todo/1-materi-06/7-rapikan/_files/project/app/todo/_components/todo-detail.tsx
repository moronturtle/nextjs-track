"use client";

import { useRouter } from "next/navigation";
import { useTodos } from "@/contexts/todo-context";
import styles from "@/styles/todo.module.css";

export default function TodoDetail({ id }: { id: string }) {
  const router = useRouter();
  const { todos, sudahMemuat } = useTodos();
  const todo = todos.find((item) => String(item.id) === id) ?? null;

  return (
    <section>
      <h1 className="mb-5 text-3xl font-bold text-teal-900">Detail tugas</h1>
      <section className={styles.card}>
        {!sudahMemuat ? (
          <p>Memuat tugas...</p>
        ) : todo ? (
          <>
            <h2 className="text-xl font-bold">{todo.teks}</h2>
            <p className={styles.note}>Status: {todo.selesai ? "Selesai" : "Belum selesai"}</p>
          </>
        ) : (
          <p>Tugas tidak ditemukan.</p>
        )}
        <button className="mt-5 font-semibold text-teal-800" onClick={() => router.back()}>
          ← Kembali ke daftar
        </button>
      </section>
    </section>
  );
}
