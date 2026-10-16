import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Beranda</h1>
      <p className="mt-4">
        Baca tulisan di <Link href="/blog" className="underline">blog</Link> —
        Link di dalam kalimat juga bisa.
      </p>
    </main>
  );
}
