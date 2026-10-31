"use client";

import Link from "next/link";
import { useFavorit } from "@/store/use-favorit";

export default function Menu() {
  const { daftar } = useFavorit();
  const jumlahFavorit = daftar.length;

  return (
    <nav className="flex gap-4 border-b p-4">
      <Link href="/">Beranda</Link>
      <Link href="/blog">Blog</Link>
      <span className="ml-auto text-sm text-slate-600">
        Favorit: {jumlahFavorit}
      </span>
    </nav>
  );
}
