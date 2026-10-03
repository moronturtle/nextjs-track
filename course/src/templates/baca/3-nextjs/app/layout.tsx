// File: app/layout.tsx — "bungkus" untuk SEMUA halaman.
// <Nav /> dan <Footer /> cukup ditulis SEKALI di sini —
// setiap page.tsx otomatis mendapatkannya.
// (Bandingkan dengan HTML biasa: <nav> ditulis ulang di setiap file!)

import Link from "next/link"; // Link = pindah halaman TANPA reload total

function Nav() {
  return (
    <nav>
      <Link href="/">Beranda</Link> | <Link href="/tentang">Tentang</Link> |{" "}
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Toko Roti Kecil</p>
    </footer>
  );
}

export default function Layout({ children }) {
  // Layout ini di-render di SERVER setiap ada request ke halaman mana pun —
  // jadi jamnya selalu baru, sama seperti {{WAKTU}} di lesson HTML biasa.
  const waktu = new Date().toLocaleTimeString("id-ID");

  return (
    <html lang="id">
      <body>
        <Nav />
        {children} {/* ← isi halaman yang sedang dibuka tampil di sini */}
        <p>
          <em>
            Halaman ini dibuat oleh server pukul <strong>{waktu}</strong>
          </em>
        </p>
        <Footer />
      </body>
    </html>
  );
}
