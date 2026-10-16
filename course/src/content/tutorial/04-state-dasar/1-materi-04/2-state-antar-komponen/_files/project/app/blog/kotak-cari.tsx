export default function KotakCari({
  nilai,
  saatBerubah,
}: {
  nilai: string;
  saatBerubah: (teks: string) => void;
}) {
  return (
    <input
      value={nilai}
      onChange={(e) => saatBerubah(e.target.value)}
      placeholder="Cari tulisan..."
      className="w-full rounded-lg border px-4 py-2"
    />
  );
}
