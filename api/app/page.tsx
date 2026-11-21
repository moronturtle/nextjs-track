import Link from "next/link";

const daftarEndpoint = [
  {
    method: "GET",
    path: "/api/todos?owner=nama",
    keterangan: "Daftar todo (ada pagination, pencarian, filter)",
  },
  {
    method: "POST",
    path: "/api/todos?owner=nama",
    keterangan: "Tambah todo — body { teks }",
  },
  {
    method: "GET",
    path: "/api/todos/1?owner=nama",
    keterangan: "Detail satu todo",
  },
  {
    method: "PATCH",
    path: "/api/todos/1?owner=nama",
    keterangan: "Edit sebagian field teks atau selesai",
  },
  {
    method: "PUT",
    path: "/api/todos/1?owner=nama",
    keterangan: "Ganti field teks dan selesai sekaligus",
  },
  {
    method: "DELETE",
    path: "/api/todos/1?owner=nama",
    keterangan: "Delete todo — respons 204 tanpa body",
  },
  {
    method: "POST",
    path: "/api/auth/login",
    keterangan: "Login latihan — body { nama, password }, balas token JWT",
  },
];

export default function Beranda() {
  return (
    <main
      style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}
    >
      <h1 style={{ marginBottom: "0.5rem" }}>API Latihan Todo</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Backend latihan untuk materi pertemuan 07–13. Tambahkan{" "}
        <code>?owner=nama</code> untuk memilih daftar Todo. Request yang gagal
        mengembalikan status HTTP dan pesan error dalam format JSON.
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {daftarEndpoint.map((endpoint) => (
          <li
            key={`${endpoint.method}-${endpoint.path}`}
            style={{ borderBottom: "1px solid #e5e7eb", padding: "0.75rem 0" }}
          >
            <code style={{ fontWeight: 700, marginRight: "0.5rem" }}>
              {endpoint.method}
            </code>
            <code>{endpoint.path}</code>
            <div
              style={{
                color: "#666",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
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
