"use client";

import { memo } from "react";
import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoItem from "./todo-item";

function TodoList({
  todos,
  saatDicentang,
  saatDihapus,
}: {
  todos: Todo[];
  saatDicentang: (id: number) => void;
  saatDihapus: (id: number) => void;
}) {
  if (todos.length === 0) {
    return <p className={styles.note}>Belum ada tugas di pilihan ini. Tambahkan tugas baru.</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          saatDicentang={saatDicentang}
          saatDihapus={saatDihapus}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
