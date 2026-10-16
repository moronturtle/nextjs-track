"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTema } from "./tema-context";

export default function Menu() {
  const pathname = usePathname();
  const { gelap } = useTema();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={pathname === href ? "font-bold underline" : ""}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex items-center gap-4 border-b p-4">
      {link("/", "Beranda")}
      {link("/tentang", "Tentang")}
      {link("/blog", "Blog")}
      <span className="ml-auto text-sm text-slate-600">
        Tema: {gelap ? "Gelap" : "Terang"}
      </span>
    </nav>
  );
}
