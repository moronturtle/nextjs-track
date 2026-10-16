import type { Metadata } from "next";
import Menu from "./menu";
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
        <Menu />
        {children}
      </body>
    </html>
  );
}
