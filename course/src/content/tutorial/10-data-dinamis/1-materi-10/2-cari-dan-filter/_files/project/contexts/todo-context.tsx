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
import type { FilterTodo, Todo } from "@/types/todo";

// Ganti "demo" dengan namamu supaya datamu terpisah dari murid lain.
const OWNER = "demo";

type TodoContextValue = {
  todos: Todo[];
  total: number;
  sedangMemuat: boolean;
  error: string | null;
  q: string;
  status: FilterTodo;
  setQ: (kata: string) => void;
  setStatus: (pilihan: FilterTodo) => void;
  tambahTodo: (teks: string) => Promise<void>;
  ubahSelesai: (id: number) => Promise<void>;
  hapusTodo: (id: number) => Promise<void>;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [total, setTotal] = useState(0);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<FilterTodo>("semua");

  const muat = useCallback(async () => {
    setSedangMemuat(true);
    setError(null);
    try {
      const data = await api.bacaTodos(OWNER, { q, status });
      setTodos(data.todos);
      setTotal(data.total);
    } catch {
      setError("Gagal memuat daftar tugas dari server");
    } finally {
      setSedangMemuat(false);
    }
  }, [q, status]);

  // Debounce: request berangkat 300 ms setelah perubahan terakhir,
  // bukan di setiap ketukan huruf.
  useEffect(() => {
    const timer = setTimeout(muat, 300);
    return () => clearTimeout(timer);
  }, [muat]);

  const tambahTodo = useCallback(
    async (teks: string) => {
      await api.tambahTodo(OWNER, teks);
      await muat();
    },
    [muat],
  );

  const ubahSelesai = useCallback(
    async (id: number) => {
      const target = todos.find((todo) => todo.id === id);
      if (!target) return;
      await api.ubahTodo(OWNER, id, { selesai: !target.selesai });
      await muat();
    },
    [todos, muat],
  );

  const hapusTodo = useCallback(
    async (id: number) => {
      await api.hapusTodo(OWNER, id);
      await muat();
    },
    [muat],
  );

  const value = useMemo(
    () => ({
      todos,
      total,
      sedangMemuat,
      error,
      q,
      status,
      setQ,
      setStatus,
      tambahTodo,
      ubahSelesai,
      hapusTodo,
    }),
    [todos, total, sedangMemuat, error, q, status, tambahTodo, ubahSelesai, hapusTodo],
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
