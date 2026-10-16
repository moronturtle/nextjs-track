export default function BlogPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-4">Daftar tulisan — alamatnya /blog.</p>
      <ul className="mt-4 list-disc pl-5">
        <li>artikel-pertama → /blog/artikel-pertama</li>
        <li>belajar-nextjs → /blog/belajar-nextjs</li>
      </ul>
    </main>
  );
}
