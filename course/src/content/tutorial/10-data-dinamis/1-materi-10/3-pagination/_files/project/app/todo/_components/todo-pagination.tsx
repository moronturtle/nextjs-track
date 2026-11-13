"use client";

import styles from "@/styles/todo.module.css";

export default function TodoPagination({
  page,
  totalHalaman,
  saatPindah,
}: {
  page: number;
  totalHalaman: number;
  saatPindah: (page: number) => void;
}) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.filter}
        type="button"
        disabled={page <= 1}
        onClick={() => saatPindah(page - 1)}
      >
        ← Sebelumnya
      </button>
      <span className={styles.note}>
        Halaman {page} dari {totalHalaman}
      </span>
      <button
        className={styles.filter}
        type="button"
        disabled={page >= totalHalaman}
        onClick={() => saatPindah(page + 1)}
      >
        Berikutnya →
      </button>
    </div>
  );
}
