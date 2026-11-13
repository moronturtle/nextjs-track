"use client";

import { useState, type FormEvent } from "react";
import { daftar, masuk } from "@/lib/auth";

export default function FormLogin() {
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [sedangMasuk, setSedangMasuk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (nama.trim().length < 3 || password.length < 6 || sedangMasuk) return;

    setSedangMasuk(true);
    setError(null);
    try {
      if (mode === "daftar") await daftar(nama.trim(), password);
      else await masuk(nama.trim(), password);
      window.location.assign("/todo");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal");
      setSedangMasuk(false);
    }
  }

  return (
    <form
      onSubmit={kirim}
      className="w-full max-w-xs rounded-lg bg-white p-6 shadow-sm"
    >
      <h1 className="mb-4 text-lg font-semibold text-slate-900">
        {mode === "masuk" ? "Masuk" : "Daftar"}
      </h1>
      <input
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
        value={nama}
        onChange={(event) => setNama(event.target.value)}
        placeholder="Nama (minimal 3 karakter)"
      />
      <input
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password (minimal 6 karakter)"
      />
      {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={sedangMasuk}
        className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {sedangMasuk ? "Memproses..." : mode === "masuk" ? "Masuk" : "Daftar"}
      </button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === "masuk" ? "daftar" : "masuk");
          setError(null);
        }}
        className="mt-3 w-full text-center text-sm text-indigo-600 hover:underline"
      >
        {mode === "masuk" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
      </button>
    </form>
  );
}
