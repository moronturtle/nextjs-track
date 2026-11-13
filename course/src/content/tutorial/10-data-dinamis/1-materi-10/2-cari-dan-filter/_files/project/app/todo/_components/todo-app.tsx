"use client";

import { useTodos } from "@/contexts/todo-context";
import styles from "@/styles/todo.module.css";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const {
    todos,
    total,
    sedangMemuat,
    error,
    q,
    setQ,
    status,
    setStatus,
    tambahTodo,
    ubahSelesai,
    hapusTodo,
  } = useTodos();

  return (
    <div className={styles.card}>
      <TodoForm saatTambah={tambahTodo} />
      <input
        className={styles.input}
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Cari tugas..."
        aria-label="Cari tugas"
      />
      <TodoFilter pilihan={status} saatPilih={setStatus} />
      {sedangMemuat ? (
        <p className={styles.note}>Memuat daftar tugas dari server...</p>
      ) : error ? (
        <p className={styles.note}>{error}</p>
      ) : (
        <TodoList todos={todos} saatDicentang={ubahSelesai} saatDihapus={hapusTodo} />
      )}
      <p className={styles.note}>{total} tugas cocok dengan pencarian</p>
    </div>
  );
}
