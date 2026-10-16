---
type: lesson
title: "Langkah 4: rapikan dan pasang di menu"
template: baca
previews: false
terminal: false
focus: /project/app/menu.tsx
---

# Langkah 4: rapikan dan pasang di menu

Fungsinya sudah lengkap. Sisa dua hal kecil yang membuat aplikasi terasa jadi: tampilan yang rapi, dan cara menuju `/todo` tanpa mengetik alamatnya manual.

## Masukkan ke menu navigasi

Ingat `Menu` dengan `usePathname` dari tugas 03? Tambahkan satu entri untuk Todo — penanda aktifnya bekerja gratis:

```tsx
const menu = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/todo", label: "Todo" },   // ← baru
];
```

Karena `Menu` sudah pakai `usePathname`, menunya otomatis ditandai saat kamu ada di `/todo` maupun `/todo/42`. Dan karena `Menu` ada di `app/layout.tsx` — file yang membungkus semua halaman — tautannya muncul di mana pun.

## Rapikan daftar: empty state dan kartu

Di `todo-app.tsx` versi final, ada dua penyempurnaan kecil tapi penting:

```tsx
{todos.length === 0 ? (
  <p className="mt-4 rounded-lg border border-dashed p-6 text-center text-slate-400">
    Belum ada tugas — tambahkan yang pertama!
  </p>
) : (
  <ul className="mt-4 divide-y rounded-lg border">
    {todos.map((t) => (
      <TodoItem key={t.id} todo={t} saatToggle={toggle} saatHapus={hapus} />
    ))}
  </ul>
)}
```

- **Empty state** — saat daftar kosong, jangan biarkan layar kosong tanpa penjelasan. Satu `? :` memberi tahu pengguna apa yang harus dilakukan.
- **Kartu di sekitar daftar** — `rounded-lg border` pada `<ul>` dan `divide-y` memberi garis pembatas antaritem tanpa menulis CSS.

`TodoItem` juga ikut dipoles — padding di dalam baris, dan tombol hapus yang tidak mencolok sampai dibutuhkan:

```tsx
<li className="flex items-center gap-2 px-4 py-3">
  <input type="checkbox" ... />
  <Link href={`/todo/${todo.id}`} className="hover:underline">
    <span className={todo.selesai ? "line-through text-slate-400" : ""}>
      {todo.teks}
    </span>
  </Link>
  <button
    onClick={() => saatHapus(todo.id)}
    className="ml-auto text-slate-300 hover:text-red-500"
  >
    ✕
  </button>
</li>
```

`hover:` pada tombol hapus dan `hover:underline` pada link adalah pola yang sama dengan menu blog — tanda kecil bahwa elemen itu bisa diklik.

:::tip{title="Styling itu bertingkat"}
Perhatikan di mana kelas diletakkan: `page.tsx` mengatur lebar halaman (`mx-auto max-w-xl`), `todo-app.tsx` mengatur kartu dan jarak, `todo-item.tsx` mengatur satu baris. Setiap komponen merawat tampilannya sendiri — tidak ada satu file CSS raksasa.
:::

## Checklist akhir mini project

Buka aplikasimu dan jalankan urutan ini — semuanya harus lolos:

1. Menu **Todo** di navigasi membawa ke `/todo`, dan ikut ditandai aktif.
2. Tambah tugas → muncul di daftar, penghitung "tersisa" bertambah.
3. Centang tugas → teks tercoret, "tersisa" berkurang.
4. Klik teks tugas → halaman detail `/todo/{id}` tampil dengan statusnya.
5. Tombol **← Kembali** → pulang ke daftar.
6. Reload halaman → semua tugas tetap ada.
7. Hapus semua tugas → pesan "Belum ada tugas" muncul.

## Ringkasan

- ✅ Menu aktif bekerja gratis untuk semua halaman di bawah `/todo` berkat `usePathname`
- ✅ Empty state = tampilan saat data kosong; jangan tinggalkan pengguna menebak
- ✅ Styling dibagi per komponen — masing-masing merawat tampilannya
- ✅ Aplikasi kecil tapi utuh: routing dinamis, navigasi, state, penyimpanan, styling

Selamat — kamu baru saja membangun aplikasi dari nol sampai jalan. Sebelum ke uji pemahaman, coba pikirkan: kalau ada fitur "edit tugas" atau "filter selesai/belum", di mana kamu akan meletakkannya? Pertanyaan itu ada di tugas.
