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
            Coba klik kanan → <strong>View Page Source</strong>: HTML-nya kosong,
            cuma ada <code>&lt;div id="root"&gt;</code>. Semua yang kamu lihat
            digambar JavaScript di browser.
          </p>
          <p>
            Coba juga matikan JavaScript di DevTools lalu reload — halaman ini
            jadi kosong total.
          </p>
        </>
      ) : (
        <>
          <h1>Halaman &quot;Tentang&quot;</h1>
          <p>
            Kamu baru saja &quot;pindah halaman&quot; <em>tanpa reload</em> —
            JavaScript mengganti isinya di tempat. Inilah ciri khas SPA: mulus,
            tapi URL tidak berubah dan HTML awalnya tetap kosong.
          </p>
        </>
      )}
    </main>
  );
}
