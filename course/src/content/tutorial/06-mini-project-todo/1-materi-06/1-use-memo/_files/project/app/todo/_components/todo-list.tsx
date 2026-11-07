"use client";

import { useMemo } from "react";

type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
};

type Filter = "semua" | "belum" | "selesai";

export default function TodoList({
  todos,
  filter,
}: {
  todos: Todo[];
  filter: Filter;
}) {
  const todosTampil = useMemo(() => {
    if (filter === "belum") {
      return todos.filter((todo) => !todo.selesai);
    }

    if (filter === "selesai") {
      return todos.filter((todo) => todo.selesai);
    }

    return todos;
  }, [todos, filter]);

  return (
    <ul>
      {todosTampil.map((todo) => (
        <li key={todo.id}>{todo.teks}</li>
      ))}
    </ul>
  );
}
