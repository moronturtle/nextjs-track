import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pertemuan 01 — Pengenalan Next.js",
  description: "Latihan routing dasar dengan App Router",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
