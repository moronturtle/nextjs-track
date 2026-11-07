import type { Todo } from "@/types/todo";

export const PILIHAN_FILTER = ["semua", "belum", "selesai"] as const;

export const TODO_AWAL: Todo[] = [
  { id: 1, teks: "Belajar Next.js", selesai: false },
  { id: 2, teks: "Menyelesaikan latihan", selesai: true },
];
