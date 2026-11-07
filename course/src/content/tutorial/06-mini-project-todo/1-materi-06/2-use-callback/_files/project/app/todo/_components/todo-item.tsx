import { memo } from "react";
import type { Todo } from "@/types/todo";

function TodoItem({
  todo,
  saatDicentang,
}: {
  todo: Todo;
  saatDicentang: (id: number) => void;
}) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.selesai}
          onChange={() => saatDicentang(todo.id)}
        />
        {todo.teks}
      </label>
    </li>
  );
}

export default memo(TodoItem);
