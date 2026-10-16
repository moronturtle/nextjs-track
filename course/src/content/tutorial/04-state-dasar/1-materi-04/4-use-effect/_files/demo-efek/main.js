// Hasil "terjemahan" main.jsx — inilah yang dijalankan browser.

const e = React.createElement;

function Jam() {
  const [waktu, setWaktu] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setWaktu(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return e("p", null, "Sekarang pukul " + waktu.toLocaleTimeString("id-ID"));
}

function App() {
  return e("main", null, e("h1", null, "Jam React"), e(Jam));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
