import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latihan Next.js",
  description: "Project latihan Next.js Track",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const namaUser = "Budi"; // nanti dari data login

  return (
    <html lang="id">
      <body>
        <Header namaUser={namaUser} />
        {children}
      </body>
    </html>
  );
}
