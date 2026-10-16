---
type: lesson
title: Route dinamis
template: baca
previews: false
terminal: false
focus: /project/app/blog/[slug]/page.tsx
---

# Route dinamis — satu file untuk banyak alamat

Nested route dari lesson sebelumnya masih menyisakan satu masalah: **satu folder = satu tulisan**. Blog berisi 100 tulisan berarti 100 folder. Padahal di website sungguhan, tulisan disimpan di database — tidak ada yang membuat folder dengan tangan.

## Folder dengan kurung siku

Solusinya: folder bernama `[slug]`. Kurung siku artinya "potongan alamat di sini bebas, apa saja cocok". Pola ini disebut **route dinamis**.

```text
app/blog/[slug]/page.tsx   →   /blog/artikel-pertama ✔
                               /blog/belajar-nextjs  ✔
                               /blog/apa-saja        ✔
```

Satu `page.tsx` di dalam `[slug]` menangani semua alamat `/blog/...`. Nama di dalam kurung bebas kamu pilih — `[slug]`, `[id]`, atau `[judul]` sama-sama sah. Nama itulah yang nanti dipakai untuk membaca isi alamatnya.

## Membaca isi alamat dengan `params`

Saat pengunjung membuka `/blog/belajar-nextjs`, Next.js mengirim potongan `"belajar-nextjs"` ke halamanmu lewat props bernama `params`. Buka `project/app/blog/[slug]/page.tsx` di panel File:

```tsx
export default async function TulisanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Tulisan: {slug}</h1>
      <p className="mt-4">Ini halaman untuk alamat /blog/{slug}.</p>
    </main>
  );
}
```

Bagian yang baru:

- **`params: Promise<{ slug: string }>`** — di Next.js 15 ke atas, `params` bukan data langsung, melainkan **Promise** — ibarat paket yang isinya baru bisa diambil setelah "ditunggu" dengan `await`. Bagian `{ slug: string }` memberi tahu TypeScript: di dalamnya ada potongan bernama `slug`, sesuai nama folder `[slug]`.
- **`const { slug } = await params`** — membuka paket itu dan mengambil isinya ke variabel `slug`. Karena ada `await`, fungsi halaman ditandai `async`.
- Pengunjung buka `/blog/belajar-nextjs` → `slug` berisi `"belajar-nextjs"`. Buka `/blog/artikel-pertama` → `slug` berisi `"artikel-pertama"`.

## Di project sungguhan, slug dipakai untuk mencari data

Contoh di atas hanya menampilkan slug supaya gampang dilihat. Di project sungguhan, `slug` dipakai untuk mencari tulisan yang cocok dari database, lalu isi tulisan itulah yang ditampilkan. Kalau slug-nya tidak ketemu, pengunjung biasanya diarahkan ke `not-found.tsx` — salah satu file khusus yang kamu kenal di pertemuan 01.

:::tip{title="Buktikan di project-mu"}
Nanti saat mengerjakan tugas, buat `app/blog/[slug]/page.tsx` lalu buka `localhost:3000/blog/apa-aja` — halaman yang sama tampil, dengan slug mengikuti alamat yang kamu ketik.
:::

## Ringkasan

- ✅ `[slug]` = folder dinamis — cocok dengan potongan alamat apa saja; satu file untuk banyak alamat
- ✅ Isi potongan alamat dibaca lewat props `params`, diambil dengan `await params`
- ✅ Nama di dalam kurung bebas, tapi harus sama dengan nama yang dibaca di `params`
- ❌ Jangan menulis `params.slug` langsung tanpa `await` — isinya masih berupa Promise, bukan teks

Halaman sudah bisa bertingkat dan dinamis. Berikutnya: `layout.tsx` — file yang membungkus halaman, dan ternyata bisa bertingkat juga.
