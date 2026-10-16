import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latihan Next.js",
  description: "Project latihan Next.js Track",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <nav className="flex gap-4 border-b p-4">
          <Link href="/">Beranda</Link>
          <Link href="/tentang">Tentang</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
