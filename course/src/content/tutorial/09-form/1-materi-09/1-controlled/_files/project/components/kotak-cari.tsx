"use client";

import { useState } from "react";

export default function KotakCari({ saatCari }: { saatCari: (kata: string) => void }) {
  const [kata, setKata] = useState("");

  return (
    <input
      value={kata}
      onChange={(event) => {
        const isi = event.target.value;
        setKata(isi);
        saatCari(isi);
      }}
      placeholder="Cari tulisan..."
      aria-label="Cari tulisan"
    />
  );
}
