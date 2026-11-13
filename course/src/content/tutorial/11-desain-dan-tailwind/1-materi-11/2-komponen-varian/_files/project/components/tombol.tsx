import type { ComponentProps } from "react";

type VarianTombol = "utama" | "bahaya" | "netral";

const GAYA: Record<VarianTombol, string> = {
  utama: "bg-indigo-600 text-white hover:bg-indigo-500",
  bahaya: "bg-rose-600 text-white hover:bg-rose-500",
  netral: "bg-slate-200 text-slate-700 hover:bg-slate-300",
};

export default function Tombol({
  varian = "utama",
  className = "",
  ...props
}: { varian?: VarianTombol } & ComponentProps<"button">) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${GAYA[varian]} ${className}`}
      {...props}
    />
  );
}
