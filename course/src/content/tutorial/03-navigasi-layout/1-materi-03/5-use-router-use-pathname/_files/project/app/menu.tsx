"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={pathname === href ? "font-bold underline" : ""}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex gap-4 border-b p-4">
      {link("/", "Beranda")}
      {link("/tentang", "Tentang")}
      {link("/kontak", "Kontak")}
      {link("/blog", "Blog")}
    </nav>
  );
}
