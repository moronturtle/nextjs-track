import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
};

export default function KontakPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Kontak</h1>
      <p className="mt-4">Email: halo@contoh.id</p>
    </main>
  );
}
