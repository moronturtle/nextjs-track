"use client";

import { useRouter } from "next/navigation";

export default function TombolBeranda() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="rounded-lg bg-slate-900 px-4 py-2 text-white"
    >
      Kembali ke Beranda
    </button>
  );
}
