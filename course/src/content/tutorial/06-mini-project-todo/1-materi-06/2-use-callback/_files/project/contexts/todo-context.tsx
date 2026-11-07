"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TODO_AWAL } from "@/data/todo";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  ubahSelesai: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(TODO_AWAL);

  const ubahSelesai = useCallback((id: number) => {
    setTodos((daftarLama) =>
      daftarLama.map((todo) =>
        todo.id === id ? { ...todo, selesai: !todo.selesai } : todo,
      ),
    );
  }, []);

  const value = useMemo(() => ({ todos, ubahSelesai }), [todos, ubahSelesai]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }
  return context;
}
