// Hasil "terjemahan" main.jsx — inilah yang dijalankan browser.

const e = React.createElement;

const TemaContext = React.createContext(null);

function App() {
  const [gelap, setGelap] = React.useState(false);

  const gaya = {
    background: gelap ? "#16213e" : "#f5f5f5",
    color: gelap ? "#ffffff" : "#111111",
    padding: "1rem",
  };

  return e(
    TemaContext.Provider,
    { value: { gelap, setGelap } },
    e(
      "main",
      { style: gaya },
      e("h1", null, "Demo Context — Tema"),
      e(Konten)
    )
  );
}

function Konten() {
  return e(
    "section",
    null,
    e("p", null, "Aku komponen tengah — tidak ada props tema lewat sini."),
    e(TombolTema)
  );
}

function TombolTema() {
  const tema = React.useContext(TemaContext);
  const gelap = tema.gelap;
  const setGelap = tema.setGelap;

  return e(
    "button",
    { onClick: () => setGelap(!gelap) },
    gelap ? "Ganti ke Terang" : "Ganti ke Gelap"
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
