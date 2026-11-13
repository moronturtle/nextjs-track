"use client";

import { useState, type FormEvent } from "react";

export default function FormPendaftaran() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ nama?: string; email?: string }>({});
  const [terkirim, setTerkirim] = useState(false);

  function validasi(nama: string, email: string) {
    const salah: { nama?: string; email?: string } = {};
    if (nama.trim().length < 3) salah.nama = "Nama minimal 3 karakter";
    if (!email.includes("@")) salah.email = "Email harus berisi @";
    return salah;
  }

  async function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const salah = validasi(nama, email);
    setErrors(salah);
    if (Object.keys(salah).length > 0) return;

    // Di sini data dikirim ke server — contoh ini cukup menandai terkirim.
    setTerkirim(true);
  }

  if (terkirim) {
    return <p>Terima kasih, {nama}! Pendaftaranmu diterima.</p>;
  }

  return (
    <form onSubmit={kirim} noValidate>
      <div>
        <label htmlFor="nama">Nama</label>
        <input
          id="nama"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
        />
        {errors.nama && <p style={{ color: "#be123c" }}>{errors.nama}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <p style={{ color: "#be123c" }}>{errors.email}</p>}
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
}
