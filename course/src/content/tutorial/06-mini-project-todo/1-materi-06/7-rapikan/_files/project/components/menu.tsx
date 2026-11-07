"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/todo", label: "Todo" },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 border-b px-8 py-4">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href || pathname.startsWith(item.href + "/")
              ? "font-bold text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
