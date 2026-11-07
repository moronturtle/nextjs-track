"use client";

import { useState, type FormEvent } from "react";

export default function TodoForm({
  saatTambah,
}: {
  saatTambah: (teks: string) => void;
}) {
  const [teks, setTeks] = useState("");

  function kirimForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const teksBersih = teks.trim();
    if (!teksBersih) return;

    saatTambah(teksBersih);
    setTeks("");
  }

  return (
    <form onSubmit={kirimForm} className="flex gap-2">
      <input
        value={teks}
        onChange={(event) => setTeks(event.target.value)}
        placeholder="Tugas baru..."
        className="flex-1 rounded-lg border px-4 py-2"
      />
      <button className="rounded-lg bg-teal-800 px-4 py-2 text-white">
        Tambah
      </button>
    </form>
  );
}
