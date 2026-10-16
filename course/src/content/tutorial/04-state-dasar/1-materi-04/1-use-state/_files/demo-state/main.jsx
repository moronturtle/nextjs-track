// Versi JSX dari demo — ini bentuk yang kamu tulis di project Next.js.
// File ini tidak dijalankan browser; yang jalan adalah main.js.

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <h1>Counter</h1>
      <p>Nilai: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(count - 1)}>Kurang</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
