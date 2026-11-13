import type { Todo } from "@/types/todo";

// Alamat API latihan yang sudah online.
export const API_URL = "https://nextjs-track-api.vercel.app";

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
