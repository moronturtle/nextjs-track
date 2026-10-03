import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Situs Latihanku",
  description: "Mini site hasil latihan Next.js Track",
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
