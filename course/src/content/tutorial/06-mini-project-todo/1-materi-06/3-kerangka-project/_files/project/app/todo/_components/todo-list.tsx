import type { Todo } from "@/types/todo";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.teks}</li>
      ))}
    </ul>
  );
}
