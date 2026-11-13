import Link from "next/link";

const daftarEndpoint = [
  { method: "GET", path: "/api/todos?owner=nama", keterangan: "Daftar todo (ada pagination, pencarian, filter)" },
  { method: "POST", path: "/api/todos?owner=nama", keterangan: "Tambah todo — body { teks }" },
  { method: "GET", path: "/api/todos/1?owner=nama", keterangan: "Detail satu todo" },
  { method: "PATCH", path: "/api/todos/1?owner=nama", keterangan: "Ubah teks atau selesai" },
  { method: "DELETE", path: "/api/todos/1?owner=nama", keterangan: "Hapus todo" },
  { method: "POST", path: "/api/auth/login", keterangan: "Login latihan — body { nama }, balas token JWT" },
];

export default function Beranda() {
  return (
    <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>API Latihan Todo</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Backend latihan untuk materi pertemuan 07–13. Ganti <code>nama</code> pada{" "}
        <code>?owner=</code> dengan namamu supaya datamu tidak bercampur dengan murid lain.
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {daftarEndpoint.map((endpoint) => (
          <li
            key={`${endpoint.method}-${endpoint.path}`}
            style={{ borderBottom: "1px solid #e5e7eb", padding: "0.75rem 0" }}
          >
            <code style={{ fontWeight: 700, marginRight: "0.5rem" }}>{endpoint.method}</code>
            <code>{endpoint.path}</code>
            <div style={{ color: "#666", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              {endpoint.keterangan}
            </div>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "2rem" }}>
        <Link href="/docs">Buka dokumentasi interaktif (Swagger UI) →</Link>
      </p>
    </main>
  );
}
