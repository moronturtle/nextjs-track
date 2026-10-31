import TombolTema from "@/components/tombol-tema";

export default function HalamanBeranda() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold">Beranda</h1>
      <p className="mt-3">
        Ubah tema di sini. Menu di atas halaman juga menampilkan pilihan tema.
      </p>
      <div className="mt-5">
        <TombolTema />
      </div>
    </main>
  );
}
