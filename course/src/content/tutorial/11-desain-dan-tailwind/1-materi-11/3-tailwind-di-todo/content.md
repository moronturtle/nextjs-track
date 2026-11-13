---
type: lesson
title: "Tailwind di aplikasi Todo"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-item.tsx
---

# Langkah terakhir: tampilkan ulang Todo dengan Tailwind

Selama ini komponen Todo memakai `styles/todo.module.css` — CSS module yang kamu tulis sendiri di pertemuan 06. Sekarang kita ganti dengan class Tailwind dan komponen varian yang baru saja dibuat.

## Item tugas dengan Tailwind

Buka `project/app/todo/_components/todo-item.tsx` — gaya yang dulu di `todo.module.css` sekarang ditulis langsung sebagai class:

```tsx
<li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
  <input
    type="checkbox"
    checked={todo.selesai}
    onChange={() => saatDicentang(todo.id)}
    className="h-4 w-4 accent-indigo-600"
  />
  <Link
    href={`/todo/${todo.id}`}
    className={`flex-1 text-sm ${
      todo.selesai ? "text-slate-400 line-through" : "text-slate-900"
    }`}
  >
    {todo.teks}
  </Link>
  <Lencana varian={todo.selesai ? "selesai" : "belum"} teks={todo.selesai ? "Selesai" : "Belum"} />
  <Tombol varian="bahaya" onClick={() => saatDihapus(todo.id)}>
    Hapus
  </Tombol>
</li>
```

Tiga keputusan desain yang tadinya tersebar di file CSS kini terbaca di sini:

- **Keadaan selesai** — teks `line-through` dan warna `slate-400` dipilih lewat ternary di `className`. Tidak perlu class CSS terpisah.
- **`accent-indigo-600`** — mewarnai checkbox sesuai warna utama aplikasi.
- **Lencana + Tombol** — komponen varian dari lesson sebelumnya langsung dipakai.

## Form pun ikut

Di `todo-form.tsx`, input dan tombol submit memakai pola yang sama:

```tsx
<input
  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
  placeholder="Tugas baru..."
/>
<Tombol type="submit" disabled={sedangMengirim}>
  {sedangMengirim ? "Menyimpan..." : "Tambah"}
</Tombol>
```

`focus:border-indigo-500` adalah contoh **state variant** — class yang hanya berlaku saat kondisi tertentu (`hover:`, `focus:`, `disabled:`). Di CSS module dulu, ini harus ditulis sebagai selector `:focus` terpisah.

## Module CSS atau Tailwind?

Dua-duanya sah, dan bisa dicampur:

| Cocok untuk | Pilihan |
| --- | --- |
| Cepat, konsisten dengan token Tailwind | Class langsung di JSX |
| Gaya rumit (animasi, pseudo-element) | CSS module tetap masuk akal |
| Tim dengan token desain yang sama | Tailwind |

Karena aplikasi Todo-mu sekarang sepenuhnya Tailwind, `styles/todo.module.css` bisa dihapus — tapi tidak wajib; menyimpannya tidak merusak apa pun.

:::warning{title="Peringatan kecil"}
Class Tailwind harus tertulis **lengkap** di kode — `"bg-" + warna` tidak akan digenerate. Pola ternary seperti `kondisi ? "a" : "b"` aman karena kedua class tertulis utuh.
:::

## Buktikan sendiri

Ubah `accent-indigo-600` dan warna `GAYA.utama` di `tombol.tsx` menjadi warna lain — misalnya `emerald`. Seluruh aplikasi berpindah warna utama dengan mengubah dua tempat. Itulah hasil dari token yang konsisten.

## Ringkasan

- ✅ Keadaan (selesai/belum) diatur lewat ternary di `className` — tanpa class CSS terpisah.
- ✅ State variant (`hover:`, `focus:`, `disabled:`) menggantikan selector pseudo.
- ✅ Komponen varian + token warna = satu tempat mengubah, seluruh aplikasi ikut.
- ✅ Tailwind dan CSS module bisa hidup berdampingan; pilih per kebutuhan.

Selanjutnya quiz, lalu tugas — merapikan tampilan project-mu dengan sistem kecilmu sendiri.
