// Contoh penerjemahan desain kartu tugas ke class Tailwind.
export default function KartuTugas() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
      <input type="checkbox" className="h-4 w-4" />
      <span className="flex-1 text-sm text-slate-900">Belajar fetch</span>
      <button type="button" className="text-sm font-medium text-rose-600">
        Hapus
      </button>
    </div>
  );
}
