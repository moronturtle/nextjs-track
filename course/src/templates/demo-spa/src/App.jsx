import { useState } from "react";

export default function App() {
  const [halaman, setHalaman] = useState("beranda");

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "40rem",
        margin: "2rem auto",
        padding: "0 1rem",
      }}
    >
      <nav style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setHalaman("beranda")}>Beranda</button>
        <button onClick={() => setHalaman("tentang")}>Tentang</button>
      </nav>

      {halaman === "beranda" ? (
        <>
          <h1>Ini React SPA (CSR)</h1>
          <p>
            Semua yang kamu lihat digambar oleh JavaScript di browser. HTML yang
            dikirim server itu kosong — cuma ada wadah <code>div#root</code>.
          </p>
        </>
      ) : (
        <>
          <h1>Halaman &quot;Tentang&quot;</h1>
          <p>
            Kamu baru &quot;pindah halaman&quot; tanpa reload — JavaScript
            mengganti isinya di tempat. Inilah ciri khas SPA.
          </p>
        </>
      )}
    </main>
  );
}
