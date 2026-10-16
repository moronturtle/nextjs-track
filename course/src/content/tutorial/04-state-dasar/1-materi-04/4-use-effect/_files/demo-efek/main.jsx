// Versi JSX dari demo — ini bentuk yang kamu tulis di project Next.js.
// File ini tidak dijalankan browser; yang jalan adalah main.js.

function Jam() {
  const [waktu, setWaktu] = React.useState(new Date());

  // setelah komponen tampil: pasang timer tiap 1 detik,
  // dan siapkan bersih-bersih saat komponen dilepas
  React.useEffect(() => {
    const id = setInterval(() => setWaktu(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Sekarang pukul {waktu.toLocaleTimeString("id-ID")}</p>;
}

function App() {
  return (
    <main>
      <h1>Jam React</h1>
      <Jam />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
