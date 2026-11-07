export type Todo = {
  id: number;
  teks: string;
  selesai: boolean;
};

export type FilterTodo = "semua" | "belum" | "selesai";
