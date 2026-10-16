"use client";

import { useEffect, useState } from "react";
import TodoItem from "./todo-item";

type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [teks, setTeks] = useState("");

  useEffect(() => {
    const tersimpan = localStorage.getItem("todos");
    if (tersimpan) setTodos(JSON.parse(tersimpan));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const tambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teks.trim()) return;
    setTodos([...todos, { id: Date.now(), teks: teks.trim(), selesai: false }]);
    setTeks("");
  };

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));

  const hapus = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  const sisa = todos.filter((t) => !t.selesai).length;

  return (
    <div>
      <form onSubmit={tambah} className="flex gap-2">
        <input
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          placeholder="Tugas baru..."
          className="flex-1 rounded-lg border px-4 py-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Tambah
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed p-6 text-center text-slate-400">
          Belum ada tugas — tambahkan yang pertama!
        </p>
      ) : (
        <ul className="mt-4 divide-y rounded-lg border">
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} saatToggle={toggle} saatHapus={hapus} />
          ))}
        </ul>
      )}

      <p className="mt-4 text-sm text-slate-600">
        {sisa} dari {todos.length} tugas tersisa
      </p>
    </div>
  );
}
