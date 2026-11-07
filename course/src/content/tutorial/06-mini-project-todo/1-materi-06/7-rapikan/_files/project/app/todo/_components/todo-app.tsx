"use client";

import { useMemo, useState } from "react";
import { useTodos } from "@/contexts/todo-context";
import type { FilterTodo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const { todos, sudahMemuat, tambahTodo, ubahSelesai, hapusTodo } = useTodos();
  const [filter, setFilter] = useState<FilterTodo>("semua");

  const todosTampil = useMemo(() => {
    if (filter === "belum") return todos.filter((todo) => !todo.selesai);
    if (filter === "selesai") return todos.filter((todo) => todo.selesai);
    return todos;
  }, [todos, filter]);

  const jumlahBelumSelesai = todos.filter((todo) => !todo.selesai).length;

  if (!sudahMemuat) {
    return <p className={styles.note}>Memuat daftar tugas...</p>;
  }

  return (
    <div className={styles.card}>
      <TodoForm saatTambah={tambahTodo} />
      <TodoFilter pilihan={filter} saatPilih={setFilter} />
      <TodoList todos={todosTampil} saatDicentang={ubahSelesai} saatDihapus={hapusTodo} />
      <p className={styles.note}>
        {jumlahBelumSelesai} dari {todos.length} tugas belum selesai
      </p>
      <p className={styles.note}>
        Kerangka ini memakai <code>useMemo</code> untuk menghitung daftar tampilan dan{" "}
        <code>useCallback</code> untuk mengirim fungsi ke komponen anak.
      </p>
    </div>
  );
}
