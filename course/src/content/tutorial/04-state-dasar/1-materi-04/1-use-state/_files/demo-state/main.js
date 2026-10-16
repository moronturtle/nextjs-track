// Hasil "terjemahan" main.jsx — inilah yang dijalankan browser.
// Di project nyata, terjemahan JSX dikerjakan otomatis oleh Next.js.

const e = React.createElement;

function App() {
  const [count, setCount] = React.useState(0);

  return e(
    "main",
    null,
    e("h1", null, "Counter"),
    e("p", null, "Nilai: " + count),
    e("button", { onClick: () => setCount(count + 1) }, "Tambah"),
    " ",
    e("button", { onClick: () => setCount(count - 1) }, "Kurang"),
    " ",
    e("button", { onClick: () => setCount(0) }, "Reset")
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
