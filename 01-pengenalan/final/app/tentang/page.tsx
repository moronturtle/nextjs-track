import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
};

export default function TentangPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Tentang Kami</h1>
      <p className="mt-4">
        Halaman ini dibuat dari file <code>app/tentang/page.tsx</code>. Folder{" "}
        <code>tentang</code> otomatis jadi URL <code>/tentang</code>.
      </p>
    </main>
  );
}
