"use client";

import type { FormEvent } from "react";

export default function FormTamu() {
  function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nama = data.get("nama");
    const pesan = data.get("pesan");
    alert(`Halo ${nama}, pesanmu: ${pesan}`);
  }

  return (
    <form onSubmit={kirim}>
      <input name="nama" defaultValue="" placeholder="Nama" />
      <textarea name="pesan" defaultValue="" placeholder="Pesan" />
      <button type="submit">Kirim</button>
    </form>
  );
}
