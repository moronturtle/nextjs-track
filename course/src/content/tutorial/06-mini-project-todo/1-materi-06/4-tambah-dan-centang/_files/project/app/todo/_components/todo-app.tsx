"use client";

import { useTodos } from "@/contexts/todo-context";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const { todos, tambahTodo, ubahSelesai, hapusTodo } = useTodos();

  return (
    <section>
      <TodoForm saatTambah={tambahTodo} />
      <TodoList
        todos={todos}
        saatDicentang={ubahSelesai}
        saatDihapus={hapusTodo}
      />
      <p className="mt-4 text-sm text-slate-600">
        {todos.filter((todo) => !todo.selesai).length} tugas belum selesai
      </p>
    </section>
  );
}
