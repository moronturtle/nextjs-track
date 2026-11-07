import type { Todo } from "@/types/todo";

export function bacaTodo(): Todo[] | null {
  const tersimpan = localStorage.getItem("todos");
  return tersimpan ? (JSON.parse(tersimpan) as Todo[]) : null;
}

export function simpanTodo(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
