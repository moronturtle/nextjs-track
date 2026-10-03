import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const artikel = [
  "Belajar Next.js dari Nol",
  "Kenapa Routing di Next.js Pakai Folder?",
  "Server vs Client: Siapa yang Menggambar Halaman?",
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        {artikel.map((judul) => (
          <li key={judul}>{judul}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-500">
        Daftar ini masih hardcode. Nanti di pertemuan 03, tiap judul bisa diklik
        ke halamannya sendiri pakai dynamic route <code>[slug]</code>.
      </p>
    </main>
  );
}
