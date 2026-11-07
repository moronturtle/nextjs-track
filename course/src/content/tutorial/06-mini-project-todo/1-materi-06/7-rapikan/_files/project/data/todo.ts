import type { FilterTodo, Todo } from "@/types/todo";

export const TODO_STORAGE_KEY = "todos";

export const TODO_AWAL: Todo[] = [
  { id: 1, teks: "Belajar Next.js", selesai: true },
  { id: 2, teks: "Membuat aplikasi Todo", selesai: false },
];

export const PILIHAN_FILTER: { nilai: FilterTodo; label: string }[] = [
  { nilai: "semua", label: "Semua" },
  { nilai: "belum", label: "Belum selesai" },
  { nilai: "selesai", label: "Selesai" },
];
