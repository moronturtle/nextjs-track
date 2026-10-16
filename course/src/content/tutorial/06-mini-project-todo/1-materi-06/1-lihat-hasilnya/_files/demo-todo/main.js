// Hasil "terjemahan" main.jsx — inilah yang dijalankan browser.

const e = React.createElement;

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, teks: "Belajar Next.js", selesai: true },
    { id: 2, teks: "Kerjakan tugas 05", selesai: false },
  ]);
  const [teks, setTeks] = React.useState("");

  const tambah = (ev) => {
    ev.preventDefault();
    if (!teks.trim()) return;
    setTodos([...todos, { id: Date.now(), teks: teks.trim(), selesai: false }]);
    setTeks("");
  };

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));

  const hapus = (id) => setTodos(todos.filter((t) => t.id !== id));

  return e(
    "main",
    null,
    e("h1", null, "Todo Saya"),
    e(
      "form",
      { onSubmit: tambah },
      e("input", {
        value: teks,
        onChange: (ev) => setTeks(ev.target.value),
        placeholder: "Tugas baru...",
      }),
      e("button", { type: "submit" }, "Tambah")
    ),
    e(
      "ul",
      null,
      todos.map((t) =>
        e(
          "li",
          { key: t.id },
          e("input", {
            type: "checkbox",
            checked: t.selesai,
            onChange: () => toggle(t.id),
          }),
          e("span", { className: t.selesai ? "selesai" : "" }, " " + t.teks + " "),
          e("button", { onClick: () => hapus(t.id) }, "✕")
        )
      )
    ),
    e("p", null, todos.filter((t) => !t.selesai).length + " tugas tersisa")
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App));
