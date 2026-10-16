"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorit } from "./use-favorit";

export default function Menu() {
  const pathname = usePathname();
  const jumlahFavorit = useFavorit((s) => s.daftar.length);

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
