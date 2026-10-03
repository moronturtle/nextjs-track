import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Pertemuan 01 — Pengenalan Next.js</h1>
      <p className="mt-4">
        Halo! Ini halaman utama, file-nya ada di <code>app/page.tsx</code>.
      </p>
      <p className="mt-2">
        Quiz interaktif ada di <Link href="/quiz" className="text-blue-600 underline">/quiz</Link>.
      </p>

      {/* TODO 2: ubah teks di atas, simpan, lihat perubahannya langsung di preview */}

      {/* TODO 3: bikin route /tentang
          → buat file app/tentang/page.tsx
          → isi komponen sederhana, lalu buka /tentang di browser */}

      {/* TODO 4: bikin route /blog
          → buat app/blog/page.tsx berisi daftar 3 judul artikel (hardcode dulu) */}

      {/* TODO 5: bikin route /kontak
          → buat app/kontak/page.tsx berisi info kontak */}

      {/* TODO 6 (bonus): ubah title & description di app/layout.tsx, cek tab browser */}
    </main>
  );
}
