type VarianLencana = "selesai" | "belum";

const GAYA: Record<VarianLencana, string> = {
  selesai: "bg-emerald-100 text-emerald-700",
  belum: "bg-amber-100 text-amber-700",
};

export default function Lencana({ varian, teks }: { varian: VarianLencana; teks: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${GAYA[varian]}`}>
      {teks}
    </span>
  );
}
