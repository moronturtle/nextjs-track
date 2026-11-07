"use client";

import { useState, type FormEvent } from "react";
import styles from "@/styles/todo.module.css";

export default function TodoForm({ saatTambah }: { saatTambah: (teks: string) => void }) {
  const [teks, setTeks] = useState("");

  function kirimForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const teksBersih = teks.trim();
    if (!teksBersih) return;

    saatTambah(teksBersih);
    setTeks("");
  }

  return (
    <form className={styles.form} onSubmit={kirimForm}>
      <input
        className={styles.input}
        value={teks}
        onChange={(event) => setTeks(event.target.value)}
        placeholder="Tugas baru..."
        aria-label="Tugas baru"
      />
      <button className={styles.button} type="submit">
        Tambah
      </button>
    </form>
  );
}
