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
    <li className="flex items-center gap-2 py-2">
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatToggle(todo.id)}
      />
      <span className={todo.selesai ? "line-through text-slate-400" : ""}>
        {todo.teks}
      </span>
      <button onClick={() => saatHapus(todo.id)} className="ml-auto">
        ✕
      </button>
    </li>
  );
}
