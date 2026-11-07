"use client";

import { useTodos } from "@/contexts/todo-context";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const { todos, sudahMemuat, tambahTodo, ubahSelesai, hapusTodo } = useTodos();
  if (!sudahMemuat) return <p>Memuat daftar tugas...</p>;

  return (
    <section>
      <TodoForm saatTambah={tambahTodo} />
      <TodoList
        todos={todos}
        saatDicentang={ubahSelesai}
        saatDihapus={hapusTodo}
      />
    </section>
  );
}
