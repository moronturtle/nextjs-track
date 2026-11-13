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
    if (!teksBersih) return;

    setSedangMengirim(true);
    setError(null);
    try {
      await saatTambah(teksBersih);
      setTeks("");
    } catch {
      setError("Gagal menyimpan tugas. Coba lagi.");
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
        disabled={sedangMengirim}
      />
      <button className={styles.button} type="submit" disabled={sedangMengirim}>
        {sedangMengirim ? "Menyimpan..." : "Tambah"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
