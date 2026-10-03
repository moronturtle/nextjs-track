// Ini kode React asli — sama seperti di aplikasi SPA sungguhan.
// Semua konten halaman ada di file INI — index.html hanya <div> kosong.
// Coba klik "Beranda" / "Tentang" di preview: isi halaman berganti
// TANPA meminta file baru ke server.

function Nav({ pindah }) {
  return (
    <nav>
      <a href="#" onClick={() => pindah("beranda")}>Beranda</a>{" | "}
      <a href="#" onClick={() => pindah("tentang")}>Tentang</a>
    </nav>
  );
}

function Beranda() {
  return (
    <>
      <h1>Toko Roti Kecil</h1>
      <p>Selamat datang!</p>
    </>
  );
}

function Tentang() {
  return (
    <>
      <h1>Tentang Kami</h1>
      <p>Kami toko roti kecil di Bandung. Semua roti dibuat setiap pagi.</p>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Toko Roti Kecil</p>
    </footer>
  );
}

function App() {
  const [halaman, pindah] = React.useState("beranda");

  return (
    <>
      <Nav pindah={pindah} />
      {halaman === "beranda" ? <Beranda /> : <Tentang />}
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

// Simulasi: di dunia nyata JavaScript butuh waktu untuk download & jalan
root.render(<p>Memuat...</p>);
setTimeout(() => root.render(<App />), 700);
