"use client";

import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoItem from "./todo-item";

export default function TodoList({
  todos,
  saatDicentang,
  saatEdit,
  saatDelete,
}: {
  todos: Todo[];
  saatDicentang: (id: number) => Promise<void>;
  saatEdit: (id: number, teks: string) => Promise<void>;
  saatDelete: (id: number) => Promise<void>;
}) {
  if (todos.length === 0) {
    return <p className={styles.note}>Belum ada Todo di pilihan ini.</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          saatDicentang={saatDicentang}
          saatEdit={saatEdit}
          saatDelete={saatDelete}
        />
      ))}
    </ul>
  );
}
