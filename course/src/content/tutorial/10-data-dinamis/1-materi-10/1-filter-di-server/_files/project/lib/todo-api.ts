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

async function kirimRequest(alamat: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_URL}${alamat}`, init);
  if (!res.ok) {
    throw new Error(`Server menjawab ${res.status}`);
  }
  return res;
}

export async function bacaTodos(
  owner: string,
  opsi: { q?: string; status?: string; page?: number; limit?: number } = {},
): Promise<DaftarTodos> {
  const params = new URLSearchParams({ owner });
  if (opsi.q) params.set("q", opsi.q);
  if (opsi.status && opsi.status !== "semua") params.set("status", opsi.status);
  if (opsi.page) params.set("page", String(opsi.page));
  if (opsi.limit) params.set("limit", String(opsi.limit));

  const res = await kirimRequest(`/api/todos?${params}`);
  return res.json();
}

export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });
  return res.json();
}

export async function ubahTodo(
  owner: string,
  id: number,
  perubahan: { teks?: string; selesai?: boolean },
): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perubahan),
  });
  return res.json();
}

export async function hapusTodo(owner: string, id: number): Promise<void> {
  await kirimRequest(`/api/todos/${id}?owner=${owner}`, { method: "DELETE" });
}
