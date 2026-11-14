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
import { bacaTodos } from "@/lib/todo-api";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  sedangMemuat: boolean;
  error: string | null;
  tambahTodo: (teks: string) => void;
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
        const daftar = await bacaTodos("nami");
        setTodos(daftar);
      } catch {
        setError("Gagal memuat daftar tugas dari server");
      } finally {
        setSedangMemuat(false);
      }
    }
    muat();
  }, []);

  // Mutasi masih mengubah state lokal — belum dikirim ke server.
  // Pertemuan 08 menyambungkan ketiganya ke API.
  const tambahTodo = useCallback((teks: string) => {
    setTodos((daftarLama) => [
      ...daftarLama,
      { id: Date.now(), teks, selesai: false },
    ]);
  }, []);

  const ubahSelesai = useCallback((id: number) => {
    setTodos((daftarLama) =>
      daftarLama.map((todo) =>
        todo.id === id ? { ...todo, selesai: !todo.selesai } : todo,
      ),
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
