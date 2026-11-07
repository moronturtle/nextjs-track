"use client";

import { useTodos } from "@/contexts/todo-context";
import type { Todo } from "@/types/todo";
import TodoItem from "./todo-item";

export default function TodoApp() {
  const { todos, ubahSelesai } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} saatDicentang={ubahSelesai} />
      ))}
    </ul>
  );
}
