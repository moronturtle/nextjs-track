import type { Todo } from "@/types/todo";

// Alamat API untuk latihan ini.
export const API_URL = "https://nextjs-track-api.vercel.app";

// Server membungkus jawaban dengan info tambahan: jumlah data dan halaman.
export type DaftarTodos = {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalHalaman: number;
};

async function kirimRequest(
  alamat: string,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(`${API_URL}${alamat}`, init);

  if (!res.ok) {
    let pesan = `Request gagal (${res.status})`;
    const data = await res.json().catch(() => null);
    if (data && data.error) {
      pesan = data.error;
    }
    throw new Error(pesan);
  }

  return res;
}

export async function bacaTodos(owner: string): Promise<Todo[]> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`);
  const data: DaftarTodos = await res.json();
  return data.todos;
}

export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });
  return res.json();
}
