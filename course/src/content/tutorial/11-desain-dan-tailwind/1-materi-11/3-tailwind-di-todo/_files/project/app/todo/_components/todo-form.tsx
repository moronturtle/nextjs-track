"use client";

import { useState, type FormEvent } from "react";
import Tombol from "@/components/tombol";

export default function TodoForm({
  saatTambah,
}: {
  saatTambah: (teks: string) => Promise<void>;
}) {
  const [teks, setTeks] = useState("");
  const [sedangMengirim, setSedangMengirim] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (teks.trim().length < 3 || sedangMengirim) return;

    setSedangMengirim(true);
    setError(null);
    try {
      await saatTambah(teks.trim());
      setTeks("");
    } catch {
      setError("Gagal menyimpan tugas ke server. Coba lagi.");
    } finally {
      setSedangMengirim(false);
    }
  }

  return (
    <form onSubmit={kirim} className="flex gap-2">
      <input
        className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
        value={teks}
        onChange={(event) => setTeks(event.target.value)}
        placeholder="Tugas baru..."
      />
      <Tombol type="submit" disabled={sedangMengirim}>
        {sedangMengirim ? "Menyimpan..." : "Tambah"}
      </Tombol>
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </form>
  );
}
