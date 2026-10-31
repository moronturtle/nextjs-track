import TombolTema from "@/components/tombol-tema";

export default function HalamanTema() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold">Pilihan Tema</h1>
      <p className="mt-3">
        Tombol ini membaca tema dari Context dan dapat mengubahnya.
      </p>
      <div className="mt-5">
        <TombolTema />
      </div>
    </main>
  );
}
