// Ini hasil "terjemahan" dari main.jsx — inilah yang sebenarnya
// dijalankan browser, karena browser tidak mengerti sintaks JSX.
// Di proyek nyata, terjemahan ini dikerjakan otomatis oleh Vite/Next.js.

const e = React.createElement;

function Nav(props) {
  return e(
    "nav",
    null,
    e("a", { href: "#", onClick: () => props.pindah("beranda") }, "Beranda"),
    " | ",
    e("a", { href: "#", onClick: () => props.pindah("tentang") }, "Tentang")
  );
}

function Beranda() {
  return e(
    React.Fragment,
    null,
    e("h1", null, "Toko Roti Kecil"),
    e("p", null, "Selamat datang!")
  );
}

function Tentang() {
  return e(
    React.Fragment,
    null,
    e("h1", null, "Tentang Kami"),
    e("p", null, "Kami toko roti kecil di Bandung. Semua roti dibuat setiap pagi.")
  );
}

function Footer() {
  return e("footer", null, e("p", null, "© 2024 Toko Roti Kecil"));
}

function App() {
  const [halaman, pindah] = React.useState("beranda");
  return e(
    React.Fragment,
    null,
    e(Nav, { pindah }),
    halaman === "beranda" ? e(Beranda) : e(Tentang),
    e(Footer)
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(e("p", null, "Memuat..."));
setTimeout(() => root.render(e(App)), 700);
