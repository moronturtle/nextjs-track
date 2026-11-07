import { memo } from "react";
import type { Todo } from "@/types/todo";

function TodoItem({
  todo,
  saatDicentang,
  saatDihapus,
}: {
  todo: Todo;
  saatDicentang: (id: number) => void;
  saatDihapus: (id: number) => void;
}) {
  return (
    <li className="flex items-center gap-2 py-2">
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatDicentang(todo.id)}
      />
      <span className={todo.selesai ? "line-through text-slate-400" : ""}>
        {todo.teks}
      </span>
      <button onClick={() => saatDihapus(todo.id)} className="ml-auto">
        ✕
      </button>
    </li>
  );
}

export default memo(TodoItem);
