"use client";

import { useForm } from "react-hook-form";
import styles from "@/styles/todo.module.css";

type TodoFormValues = {
  teks: string;
};

export default function TodoForm({
  saatTambah,
}: {
  saatTambah: (teks: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    defaultValues: { teks: "" },
  });

  async function kirim(data: TodoFormValues) {
    try {
      await saatTambah(data.teks.trim());
      reset();
    } catch (error) {
      setError("root.server", {
        type: "server",
        message:
          error instanceof Error ? error.message : "Gagal menyimpan Todo.",
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(kirim)} noValidate>
      <div>
        <input
          className={styles.input}
          placeholder="Todo baru..."
          aria-label="Todo baru"
          aria-invalid={Boolean(errors.teks)}
          aria-describedby={errors.teks ? "teks-error" : undefined}
          {...register("teks", {
            required: "Tulis Todo terlebih dahulu.",
            validate: (nilai) =>
              nilai.trim().length >= 3 || "Todo minimal 3 karakter.",
          })}
          disabled={isSubmitting}
        />
        {errors.teks && (
          <p className={styles.note} id="teks-error" role="alert">
            {errors.teks.message}
          </p>
        )}
      </div>
      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim..." : "Tambah"}
      </button>
      {errors.root && errors.root.server && (
        <p className={styles.note} role="alert">
          {errors.root.server.message}
        </p>
      )}
    </form>
  );
}
