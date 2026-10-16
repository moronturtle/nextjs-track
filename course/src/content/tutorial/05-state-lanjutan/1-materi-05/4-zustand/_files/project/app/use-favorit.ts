import { create } from "zustand";

type FavoritState = {
  daftar: string[];
  toggle: (slug: string) => void;
};

export const useFavorit = create<FavoritState>((set) => ({
  daftar: [],

  toggle: (slug) =>
    set((state) => ({
      daftar: state.daftar.includes(slug)
        ? state.daftar.filter((s) => s !== slug)
        : [...state.daftar, slug],
    })),
}));
