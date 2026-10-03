import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Situs Latihan — Pertemuan 01",
  description: "Mini site hasil latihan routing Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {/* Nav ini ada di layout → otomatis tampil di SEMUA halaman.
            Pakai <Link> dari next/link — kenapa lebih baik dari <a> biasa dibahas di pertemuan 03. */}
        <nav className="border-b px-8 py-4">
          <div className="mx-auto flex max-w-2xl gap-6">
            <Link href="/" className="font-semibold hover:text-blue-600">
              Beranda
            </Link>
            <Link href="/tentang" className="hover:text-blue-600">
              Tentang
            </Link>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <Link href="/kontak" className="hover:text-blue-600">
              Kontak
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
