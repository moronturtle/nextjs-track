export type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
};

export type StatusTodo = "semua" | "belum" | "selesai";

export type DaftarTodos = {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalHalaman: number;
};
