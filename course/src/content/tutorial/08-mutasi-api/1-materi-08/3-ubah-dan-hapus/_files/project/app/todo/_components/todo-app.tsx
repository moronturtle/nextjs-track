"use client";

import { useMemo, useState } from "react";
import { useTodos } from "@/contexts/todo-context";
import type { FilterTodo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const {
    todos,
    sedangMemuat,
    error,
    tambahTodo,
    toggleSelesai,
    editTodo,
    deleteTodo,
  } = useTodos();
  const [filter, setFilter] = useState<FilterTodo>("semua");

  const todosTampil = useMemo(() => {
    if (filter === "belum") return todos.filter((todo) => !todo.selesai);
    if (filter === "selesai") return todos.filter((todo) => todo.selesai);
    return todos;
  }, [todos, filter]);

  if (sedangMemuat) {
    return <p className={styles.note}>Memuat daftar Todo...</p>;
  }

  if (error) {
    return <p className={styles.note}>{error}</p>;
  }

  return (
    <div className={styles.card}>
      <TodoForm saatTambah={tambahTodo} />
      <TodoFilter pilihan={filter} saatPilih={setFilter} />
      <TodoList
        todos={todosTampil}
        saatDicentang={toggleSelesai}
        saatEdit={editTodo}
        saatDelete={deleteTodo}
      />
    </div>
  );
}
