"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

export default function DaftarTugas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    async function muat() {
      const res = await fetch(
        "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
      );
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
