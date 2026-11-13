import type { Todo } from "@/types/todo";

// Alamat server latihan. Ganti dengan alamat yang diberikan mentor.
export const API_URL = "http://localhost:3001";

// Server membungkus jawaban dengan info tambahan: jumlah data dan halaman.
export type DaftarTodos = {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalHalaman: number;
};

export async function bacaTodos(owner: string): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/api/todos?owner=${owner}`);

  if (!res.ok) {
    throw new Error(`Server menjawab ${res.status}`);
  }

  const data: DaftarTodos = await res.json();
  return data.todos;
}
