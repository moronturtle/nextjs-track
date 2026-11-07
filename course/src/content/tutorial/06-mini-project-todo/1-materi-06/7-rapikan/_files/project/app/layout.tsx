import Menu from "@/components/menu";
import "./globals.css";

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
