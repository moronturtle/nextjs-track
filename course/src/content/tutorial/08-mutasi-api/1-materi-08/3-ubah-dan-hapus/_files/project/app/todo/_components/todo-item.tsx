"use client";

import { useState, type FormEvent } from "react";
import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";

export default function TodoItem({
  todo,
  saatDicentang,
  saatEdit,
  saatDelete,
}: {
  todo: Todo;
  saatDicentang: (id: number) => Promise<void>;
  saatEdit: (id: number, teks: string) => Promise<void>;
  saatDelete: (id: number) => Promise<void>;
}) {
  const [sedangEdit, setSedangEdit] = useState(false);
  const [teks, setTeks] = useState(todo.teks);
  const [sedangMengirim, setSedangMengirim] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function simpanEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const teksBersih = teks.trim();
    if (teksBersih.length < 3) {
      setError("Todo minimal 3 karakter.");
      return;
    }

    setSedangMengirim(true);
    setError(null);
    try {
      await saatEdit(todo.id, teksBersih);
      setSedangEdit(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Gagal mengedit Todo.");
    } finally {
      setSedangMengirim(false);
    }
  }

  async function saatCentang() {
    setSedangMengirim(true);
    setError(null);
    try {
      await saatDicentang(todo.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request gagal.");
    } finally {
      setSedangMengirim(false);
    }
  }

  async function saatHapus() {
    setSedangMengirim(true);
    setError(null);
    try {
      await saatDelete(todo.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request gagal.");
    } finally {
      setSedangMengirim(false);
    }
  }

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={saatCentang}
        aria-label={`Tandai ${todo.teks} selesai`}
        disabled={sedangMengirim}
      />
      {sedangEdit ? (
        <form className={styles.form} onSubmit={simpanEdit}>
          <input
            className={styles.input}
            value={teks}
            onChange={(event) => setTeks(event.target.value)}
            minLength={3}
            aria-label="Edit teks Todo"
            disabled={sedangMengirim}
          />
          <button
            className={styles.button}
            type="submit"
            disabled={sedangMengirim}
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => {
              setTeks(todo.teks);
              setError(null);
              setSedangEdit(false);
            }}
            disabled={sedangMengirim}
          >
            Batal
          </button>
        </form>
      ) : (
        <>
          <span
            className={`${styles.itemText} ${todo.selesai ? styles.done : ""}`}
          >
            {todo.teks}
          </span>
          <button
            type="button"
            onClick={() => {
              setTeks(todo.teks);
              setError(null);
              setSedangEdit(true);
            }}
            disabled={sedangMengirim}
          >
            Edit
          </button>
          <button
            className={styles.remove}
            type="button"
            onClick={saatHapus}
            disabled={sedangMengirim}
          >
            Delete
          </button>
        </>
      )}
      {error && (
        <p className={styles.note} role="alert">
          {error}
        </p>
      )}
    </li>
  );
}
