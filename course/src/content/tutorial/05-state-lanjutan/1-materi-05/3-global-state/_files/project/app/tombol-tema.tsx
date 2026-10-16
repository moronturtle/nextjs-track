"use client";

import { useTema } from "./tema-context";

export default function TombolTema() {
  const { gelap, setGelap } = useTema();

  return (
    <button
      onClick={() => setGelap(!gelap)}
      className="rounded-lg border px-4 py-2"
    >
      {gelap ? "Ganti ke Terang" : "Ganti ke Gelap"}
    </button>
  );
}
