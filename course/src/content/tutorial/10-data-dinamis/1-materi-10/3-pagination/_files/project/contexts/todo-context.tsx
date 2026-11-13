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
const ITEM_PER_HALAMAN = 5;

type TodoContextValue = {
  todos: Todo[];
  total: number;
  sedangMemuat: boolean;
  error: string | null;
  q: string;
  status: FilterTodo;
  page: number;
  totalHalaman: number;
  setQ: (kata: string) => void;
  setStatus: (pilihan: FilterTodo) => void;
  setPage: (halaman: number) => void;
  tambahTodo: (teks: string) => Promise<void>;
  ubahSelesai: (id: number) => Promise<void>;
  hapusTodo: (id: number) => Promise<void>;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<FilterTodo>("semua");
  const [page, setPage] = useState(1);

  const muat = useCallback(async () => {
    setSedangMemuat(true);
    setError(null);
    try {
      const data = await api.bacaTodos(OWNER, {
        q,
        status,
        page,
        limit: ITEM_PER_HALAMAN,
      });
      setTodos(data.todos);
      setTotal(data.total);
      setTotalHalaman(data.totalHalaman);
    } catch {
      setError("Gagal memuat daftar tugas dari server");
    } finally {
      setSedangMemuat(false);
    }
  }, [q, status, page]);

  // Debounce: request berangkat 300 ms setelah perubahan terakhir.
  useEffect(() => {
    const timer = setTimeout(muat, 300);
    return () => clearTimeout(timer);
  }, [muat]);

  // Mengganti pencarian atau filter mengembalikan ke halaman 1 —
  // halaman lama belum tentu ada di hasil baru.
  const cari = useCallback((kata: string) => {
    setQ(kata);
    setPage(1);
  }, []);

  const pilihStatus = useCallback((pilihan: FilterTodo) => {
    setStatus(pilihan);
    setPage(1);
  }, []);

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
      totalHalaman,
      sedangMemuat,
      error,
      q,
      status,
      page,
      setQ: cari,
      setStatus: pilihStatus,
      setPage,
      tambahTodo,
      ubahSelesai,
      hapusTodo,
    }),
    [
      todos,
      total,
      totalHalaman,
      sedangMemuat,
      error,
      q,
      status,
      page,
      cari,
      pilihStatus,
      tambahTodo,
      ubahSelesai,
      hapusTodo,
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
