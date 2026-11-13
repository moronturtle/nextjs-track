"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as api from "@/lib/todo-api";
import type { Todo } from "@/types/todo";

// Ganti "demo" dengan namamu supaya datamu terpisah dari murid lain.
const OWNER = "demo";

type TodoContextValue = {
  todos: Todo[];
  sedangMemuat: boolean;
  error: string | null;
  tambahTodo: (teks: string) => Promise<void>;
  ubahSelesai: (id: number) => void;
  hapusTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function muat() {
      try {
        const daftar = await api.bacaTodos(OWNER);
        setTodos(daftar);
      } catch {
        setError("Gagal memuat daftar tugas dari server");
      } finally {
        setSedangMemuat(false);
      }
    }
    muat();
  }, []);

  const tambahTodo = useCallback(async (teks: string) => {
    const todo = await api.tambahTodo(OWNER, teks);
    setTodos((daftarLama) => [...daftarLama, todo]);
  }, []);

  const ubahSelesai = useCallback((id: number) => {
    setTodos((daftarLama) =>
      daftarLama.map((todo) => (todo.id === id ? { ...todo, selesai: !todo.selesai } : todo)),
    );
  }, []);

  const hapusTodo = useCallback((id: number) => {
    setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
  }, []);

  const value = useMemo(
    () => ({ todos, sedangMemuat, error, tambahTodo, ubahSelesai, hapusTodo }),
    [todos, sedangMemuat, error, tambahTodo, ubahSelesai, hapusTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }

  return context;
}
