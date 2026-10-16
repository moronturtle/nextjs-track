// Versi JSX dari demo — ini bentuk yang kamu tulis di project Next.js.
// File ini tidak dijalankan browser; yang jalan adalah main.js.

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, teks: "Belajar Next.js", selesai: true },
    { id: 2, teks: "Kerjakan tugas 05", selesai: false },
  ]);
  const [teks, setTeks] = React.useState("");

  const tambah = (e) => {
    e.preventDefault();
    if (!teks.trim()) return;
    setTodos([...todos, { id: Date.now(), teks: teks.trim(), selesai: false }]);
    setTeks("");
  };

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));

  const hapus = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <main>
      <h1>Todo Saya</h1>
      <form onSubmit={tambah}>
        <input
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          placeholder="Tugas baru..."
        />
        <button type="submit">Tambah</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.selesai} onChange={() => toggle(t.id)} />
            <span className={t.selesai ? "selesai" : ""}> {t.teks} </span>
            <button onClick={() => hapus(t.id)}>✕</button>
          </li>
        ))}
      </ul>
      <p>{todos.filter((t) => !t.selesai).length} tugas tersisa</p>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
