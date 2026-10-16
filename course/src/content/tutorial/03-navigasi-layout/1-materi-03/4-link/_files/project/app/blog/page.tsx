import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-4 list-disc pl-5 underline">
        <li>
          <Link href="/blog/artikel-pertama">Artikel pertama</Link>
        </li>
        <li>
          <Link href="/blog/belajar-nextjs">Belajar Next.js</Link>
        </li>
      </ul>
    </main>
  );
}
