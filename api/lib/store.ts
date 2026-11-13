import { TODO_AWAL } from "./data";
import { bacaTodos, simpanTodos } from "./db";
import type { DaftarTodos, StatusTodo, Todo } from "./types";

// Owner baru langsung mendapat data awal supaya GET pertama tidak kosong.
export async function ambilTodos(owner: string): Promise<Todo[]> {
  const ada = await bacaTodos(owner);
  if (ada !== null) return ada;
  await simpanTodos(owner, TODO_AWAL);
  return TODO_AWAL;
}

export async function daftarTodos(
  owner: string,
  opsi: { q: string; status: StatusTodo; page: number; limit: number },
): Promise<DaftarTodos> {
  let hasil = await ambilTodos(owner);

  if (opsi.status === "belum") hasil = hasil.filter((todo) => !todo.selesai);
  if (opsi.status === "selesai") hasil = hasil.filter((todo) => todo.selesai);
  if (opsi.q) {
    const kata = opsi.q.toLowerCase();
    hasil = hasil.filter((todo) => todo.teks.toLowerCase().includes(kata));
  }

  const total = hasil.length;
  const totalHalaman = Math.max(1, Math.ceil(total / opsi.limit));
  const mulai = (opsi.page - 1) * opsi.limit;

  return {
    todos: hasil.slice(mulai, mulai + opsi.limit),
    total,
    page: opsi.page,
    limit: opsi.limit,
    totalHalaman,
  };
}

export async function ambilTodo(owner: string, id: number): Promise<Todo | null> {
  const todos = await ambilTodos(owner);
  return todos.find((todo) => todo.id === id) ?? null;
}

export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const todos = await ambilTodos(owner);
  const todo: Todo = { id: Date.now(), teks, selesai: false };
  await simpanTodos(owner, [...todos, todo]);
  return todo;
}

export async function ubahTodo(
  owner: string,
  id: number,
  perubahan: Partial<Pick<Todo, "teks" | "selesai">>,
): Promise<Todo | null> {
  const todos = await ambilTodos(owner);
  const target = todos.find((todo) => todo.id === id);
  if (!target) return null;

  const hasil = { ...target, ...perubahan };
  await simpanTodos(
    owner,
    todos.map((todo) => (todo.id === id ? hasil : todo)),
  );
  return hasil;
}

export async function hapusTodo(owner: string, id: number): Promise<boolean> {
  const todos = await ambilTodos(owner);
  const target = todos.find((todo) => todo.id === id);
  if (!target) return false;
  await simpanTodos(
    owner,
    todos.filter((todo) => todo.id !== id),
  );
  return true;
}
