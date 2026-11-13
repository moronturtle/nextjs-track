"use client";

import Link from "next/link";
import { memo } from "react";
import Lencana from "@/components/lencana";
import Tombol from "@/components/tombol";
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
    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatDicentang(todo.id)}
        className="h-4 w-4 accent-indigo-600"
      />
      <Link
        href={`/todo/${todo.id}`}
        className={`flex-1 text-sm ${
          todo.selesai ? "text-slate-400 line-through" : "text-slate-900"
        }`}
      >
        {todo.teks}
      </Link>
      <Lencana
        varian={todo.selesai ? "selesai" : "belum"}
        teks={todo.selesai ? "Selesai" : "Belum"}
      />
      <Tombol varian="bahaya" onClick={() => saatDihapus(todo.id)}>
        Hapus
      </Tombol>
    </li>
  );
}

export default memo(TodoItem);
