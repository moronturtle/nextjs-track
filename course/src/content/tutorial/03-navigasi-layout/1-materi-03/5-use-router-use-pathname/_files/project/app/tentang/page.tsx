import TombolBeranda from "../tombol-beranda";

export default function TentangPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Tentang Saya</h1>
      <p className="mt-4">Halaman ini tetap komponen server biasa.</p>
      <div className="mt-6">
        <TombolBeranda />
      </div>
    </main>
  );
}
