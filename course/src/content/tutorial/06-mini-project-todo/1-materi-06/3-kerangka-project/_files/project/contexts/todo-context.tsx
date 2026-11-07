"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { TODO_AWAL } from "@/data/todo";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos] = useState<Todo[]>(TODO_AWAL);

  return (
    <TodoContext.Provider value={{ todos }}>{children}</TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }
  return context;
}
