import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
};

export default function KontakPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Kontak</h1>
      <ul className="mt-4 space-y-2">
        <li>
          Email: <a href="mailto:halo@contoh.id" className="text-blue-600 underline">halo@contoh.id</a>
        </li>
        <li>GitHub: github.com/contoh</li>
      </ul>
    </main>
  );
}
