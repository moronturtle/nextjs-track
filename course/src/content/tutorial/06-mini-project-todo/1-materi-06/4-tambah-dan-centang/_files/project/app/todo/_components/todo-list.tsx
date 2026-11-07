"use client";

import { memo } from "react";
import type { Todo } from "@/types/todo";
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
  return (
    <ul className="mt-4 divide-y">
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
