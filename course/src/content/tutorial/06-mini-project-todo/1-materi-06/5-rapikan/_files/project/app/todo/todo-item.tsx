import Link from "next/link";

type Todo = { id: number; teks: string; selesai: boolean };

export default function TodoItem({
  todo,
  saatToggle,
  saatHapus,
}: {
  todo: Todo;
  saatToggle: (id: number) => void;
  saatHapus: (id: number) => void;
}) {
  return (
    <li className="flex items-center gap-2 px-4 py-3">
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatToggle(todo.id)}
      />
      <Link href={`/todo/${todo.id}`} className="hover:underline">
        <span className={todo.selesai ? "line-through text-slate-400" : ""}>
          {todo.teks}
        </span>
      </Link>
      <button
        onClick={() => saatHapus(todo.id)}
        className="ml-auto text-slate-300 hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}
