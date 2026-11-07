"use client";

import Link from "next/link";
import { memo } from "react";
import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";

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
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatDicentang(todo.id)}
        aria-label={`Tandai ${todo.teks} selesai`}
      />
      <Link
        className={`${styles.itemText} ${todo.selesai ? styles.done : ""}`}
        href={`/todo/${todo.id}`}
      >
        {todo.teks}
      </Link>
      <button className={styles.remove} onClick={() => saatDihapus(todo.id)} type="button">
        Hapus
      </button>
    </li>
  );
}

export default memo(TodoItem);
