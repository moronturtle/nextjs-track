"use client";

import { useState } from "react";

export default function LikeButton() {
  const [jumlahSuka, setJumlahSuka] = useState(0);

  return (
    <button
      onClick={() => setJumlahSuka(jumlahSuka + 1)}
      className="rounded-lg border px-4 py-2"
    >
      👍 {jumlahSuka}
    </button>
  );
}
