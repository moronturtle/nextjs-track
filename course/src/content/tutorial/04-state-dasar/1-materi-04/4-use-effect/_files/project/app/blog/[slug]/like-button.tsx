"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [suka, setSuka] = useState(0);

  // Baca simpanan saat halaman dibuka
  useEffect(() => {
    const tersimpan = localStorage.getItem(`suka-${slug}`);
    if (tersimpan) setSuka(Number(tersimpan));
  }, [slug]);

  // Simpan setiap kali hitungan berubah
  useEffect(() => {
    localStorage.setItem(`suka-${slug}`, String(suka));
  }, [suka, slug]);

  return (
    <button
      onClick={() => setSuka(suka + 1)}
      className="rounded-lg border px-4 py-2"
    >
      👍 {suka}
    </button>
  );
}
