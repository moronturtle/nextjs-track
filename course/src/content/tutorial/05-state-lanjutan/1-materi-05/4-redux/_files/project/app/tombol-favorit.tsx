"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./favorit-slice";
import type { RootState } from "./store";

export default function TombolFavorit({ slug }: { slug: string }) {
  const aktif = useSelector((s: RootState) => s.favorit.includes(slug));
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggle(slug))}
      className="rounded-lg border px-4 py-2"
    >
      {aktif ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
