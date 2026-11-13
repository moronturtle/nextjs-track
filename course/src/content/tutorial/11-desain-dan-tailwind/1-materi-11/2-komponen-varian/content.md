---
type: lesson
title: "Komponen dengan varian"
template: baca
previews: false
terminal: false
focus: /project/components/tombol.tsx
---

# Komponen dengan varian

Lihat halamanmu sekarang: tombol "Tambah", tombol "Hapus", tombol filter — semuanya tombol, tapi tampilannya berbeda peran. Tombol utama menarik perhatian; tombol hapus menandai bahaya; tombol filter terlihat ringan.

Kalau kamu menulis class lengkap di tiap tempat, warna akan mulai berbeda sedikit-sedikit — `rose-600` di sini, `red-500` di sana, padding `p-2` di sini `px-3 py-1` di sana. Tampilan jadi tidak konsisten dan sulit dirawat.

Solusinya: **satu komponen, beberapa varian**.

## Tombol dengan prop varian

Buka `project/components/tombol.tsx`:

```tsx
type VarianTombol = "utama" | "bahaya" | "netral";

const GAYA: Record<VarianTombol, string> = {
  utama: "bg-indigo-600 text-white hover:bg-indigo-500",
  bahaya: "bg-rose-600 text-white hover:bg-rose-500",
  netral: "bg-slate-200 text-slate-700 hover:bg-slate-300",
};

export default function Tombol({
  varian = "utama",
  ...props
}: { varian?: VarianTombol } & React.ComponentProps<"button">) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${GAYA[varian]}`}
      {...props}
    />
  );
}
```

Yang terjadi di sini:

- **Class yang sama untuk semua tombol** — bentuk, ukuran, font — ditulis sekali di satu tempat.
- **Yang berbeda hanya warna** — disimpan di objek `GAYA`, dipilih lewat prop `varian`.
- `...props` meneruskan `onClick`, `type`, `disabled` ke `<button>` aslinya — komponen berperilaku seperti tombol biasa.

Menggunakannya:

```tsx
<Tombol type="submit">Tambah</Tombol>
<Tombol varian="bahaya" onClick={() => hapus(todo.id)}>Hapus</Tombol>
<Tombol varian="netral" onClick={batal}>Batal</Tombol>
```

Sekarang "tombol utama aplikasiku" punya satu definisi. Mengubah `indigo-600` jadi `emerald-600` di satu tempat mengubah semua tombol utama.

## Pola yang sama untuk lencana status

Di `components/lencana.tsx` pola identik dipakai untuk lencana — label kecil seperti "Belum selesai" / "Selesai":

```tsx
const GAYA = {
  selesai: "bg-emerald-100 text-emerald-700",
  belum: "bg-amber-100 text-amber-700",
};
```

Kombinasi "latar pudar + teks warna pekat" (`bg-xxx-100` + `text-xxx-700`) adalah pola umum untuk label status.

## Kapan membuat komponen varian?

- Class yang sama tertulis di **3+ tempat** → ekstrak jadi komponen.
- Bedanya cuma warna/ukuran → satu komponen dengan prop `varian`.
- Bedanya struktur dan isi → komponen terpisah, jangan dipaksakan.

Jangan ekstrak terlalu dini — komponen yang menampung dua hal berbeda lebih menyusahkan daripada duplikasi kecil.

## Buktikan sendiri

Pasang `Tombol` di project-mu, render ketiga varian berdampingan. Lalu ubah warna `utama` di objek `GAYA` — semua tombol `varian="utama"` berubah sekaligus.

## Ringkasan

- ✅ Satu komponen dengan prop `varian` menjaga konsistensi dan memusatkan perubahan.
- ✅ Yang dibagi: bentuk dasar; yang jadi varian: warna/ukuran.
- ✅ `...props` membuat komponen tetap berperilaku seperti elemen aslinya.
- ✅ Ekstrak saat pola benar-benar berulang — bukan sebelumnya.

Terakhir: kita terapkan semuanya ke aplikasi Todo — module CSS diganti class Tailwind yang konsisten.
