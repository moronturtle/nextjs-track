"use client";

import { createContext, useContext, useState } from "react";

type Tema = { gelap: boolean; setGelap: (v: boolean) => void };

const TemaContext = createContext<Tema | null>(null);

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [gelap, setGelap] = useState(false);

  return (
    <TemaContext.Provider value={{ gelap, setGelap }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const tema = useContext(TemaContext);
  if (!tema) throw new Error("useTema hanya bisa di dalam TemaProvider");
  return tema;
}
