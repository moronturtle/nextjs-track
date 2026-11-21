"use client";

import { useState, type FormEvent } from "react";
import styles from "@/styles/todo.module.css";

export default function TodoForm({
  saatTambah,
}: {
  saatTambah: (teks: string) => Promise<void>;
}) {
  const [teks, setTeks] = useState("");
  const [sedangMengirim, setSedangMengirim] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function kirimForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const teksBersih = teks.trim();
    if (teksBersih.length < 3) {
      setError("Todo minimal 3 karakter.");
      return;
    }

    setSedangMengirim(true);
    setError(null);
    try {
      await saatTambah(teksBersih);
      setTeks("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Gagal menyimpan Todo.",
      );
    } finally {
      setSedangMengirim(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={kirimForm}>
      <input
        className={styles.input}
        value={teks}
        onChange={(event) => setTeks(event.target.value)}
        placeholder="Tugas baru..."
        aria-label="Tugas baru"
        required
        minLength={3}
        disabled={sedangMengirim}
      />
      <button className={styles.button} type="submit" disabled={sedangMengirim}>
        {sedangMengirim ? "Mengirim..." : "Tambah"}
      </button>
      {error && (
        <p className={styles.note} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
