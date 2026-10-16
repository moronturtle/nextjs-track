// Versi JSX dari demo — ini bentuk yang kamu tulis di project Next.js.
// File ini tidak dijalankan browser; yang jalan adalah main.js.

// 1. Salurannya dibuat sekali
const TemaContext = React.createContext(null);

function App() {
  const [gelap, setGelap] = React.useState(false);

  const gaya = {
    background: gelap ? "#16213e" : "#f5f5f5",
    color: gelap ? "#ffffff" : "#111111",
    padding: "1rem",
  };

  return (
    // 2. Provider memasang nilai — semua di dalamnya bisa membaca
    <TemaContext.Provider value={{ gelap, setGelap }}>
      <main style={gaya}>
        <h1>Demo Context — Tema</h1>
        <Konten />
      </main>
    </TemaContext.Provider>
  );
}

function Konten() {
  // Komponen tengah: tidak membawa props tema sama sekali.
  // Bandingkan dengan "kurir" di lesson prop drilling.
  return (
    <section>
      <p>Aku komponen tengah — tidak ada props tema lewat sini.</p>
      <TombolTema />
    </section>
  );
}

function TombolTema() {
  // 3. Komponen terdalam membaca langsung dari saluran
  const { gelap, setGelap } = React.useContext(TemaContext);

  return (
    <button onClick={() => setGelap(!gelap)}>
      {gelap ? "Ganti ke Terang" : "Ganti ke Gelap"}
    </button>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
