import type { Todo } from "@/types/todo";

export const TODO_STORAGE_KEY = "todos";

export const TODO_AWAL: Todo[] = [
  { id: 1, teks: "Belajar Next.js", selesai: false },
  { id: 2, teks: "Menyelesaikan latihan", selesai: true },
];
