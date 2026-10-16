"use client";

import { useState } from "react";

export default function LikeButton() {
  const [suka, setSuka] = useState(0);

  return (
    <button
      onClick={() => setSuka(suka + 1)}
      className="rounded-lg border px-4 py-2"
    >
      👍 {suka}
    </button>
  );
}
