"use client";

import { useFavorit } from "./use-favorit";

export default function TombolFavorit({ slug }: { slug: string }) {
  const daftar = useFavorit((s) => s.daftar);
  const toggle = useFavorit((s) => s.toggle);
  const aktif = daftar.includes(slug);

  return (
    <button
      onClick={() => toggle(slug)}
      className="rounded-lg border px-4 py-2"
    >
      {aktif ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
