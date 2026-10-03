// File: app/dashboard/page.tsx → route "/dashboard"
// "use client" = komponen ini butuh interaksi (state, klik),
// jadi React-nya dijalankan di BROWSER pengunjung — inilah bagian CSR-nya.
// Cocok untuk halaman aplikasi yang tidak perlu dicari di Google.

"use client";

import { useState } from "react";

export default function Dashboard() {
  const [terjual, setTerjual] = useState(0);

  return (
    <>
      <h1>Dashboard Pemilik Toko</h1>
      <p>Roti terjual hari ini: {terjual}</p>
      <button onClick={() => setTerjual(terjual + 1)}>+ Tambah</button>
    </>
  );
}
