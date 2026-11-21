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

// Daftar "nami" yang sama seperti di pertemuan 07.
const OWNER = "nami";

type TodoContextValue = {
  todos: Todo[];
  sedangMemuat: boolean;
  error: string | null;
  tambahTodo: (teks: string) => Promise<void>;
  toggleSelesai: (id: number) => Promise<void>;
  editTodo: (id: number, teks: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
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

  const toggleSelesai = useCallback(
    async (id: number) => {
      const target = todos.find((todo) => todo.id === id);
      if (!target) return;
      const hasil = await api.editStatusTodo(OWNER, id, !target.selesai);
      setTodos((daftarLama) =>
        daftarLama.map((todo) => (todo.id === id ? hasil : todo)),
      );
    },
    [todos],
  );

  const editTodo = useCallback(
    async (id: number, teks: string) => {
      const target = todos.find((todo) => todo.id === id);
      if (!target) return;
      const hasil = await api.editTodo(OWNER, id, {
        teks,
        selesai: target.selesai,
      });
      setTodos((daftarLama) =>
        daftarLama.map((todo) => (todo.id === id ? hasil : todo)),
      );
    },
    [todos],
  );

  const deleteTodo = useCallback(async (id: number) => {
    await api.deleteTodo(OWNER, id);
    setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      todos,
      sedangMemuat,
      error,
      tambahTodo,
      toggleSelesai,
      editTodo,
      deleteTodo,
    }),
    [
      todos,
      sedangMemuat,
      error,
      tambahTodo,
      toggleSelesai,
      editTodo,
      deleteTodo,
    ],
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
