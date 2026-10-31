import type { Metadata } from "next";
import Menu from "@/components/menu";
import { TemaProvider } from "@/context/tema-context";

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
        <TemaProvider>
          <Menu />
          {children}
        </TemaProvider>
      </body>
    </html>
  );
}
