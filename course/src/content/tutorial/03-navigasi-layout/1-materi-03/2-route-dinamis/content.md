---
type: lesson
title: Route dinamis
template: baca
previews: false
terminal: false
focus: /project/app/blog/[slug]/page.tsx
---

# Route dinamis — satu file untuk banyak alamat

Nested routes dari lesson sebelumnya menyisakan satu masalah: **satu folder = satu tulisan**. Blog berisi 100 tulisan berarti 100 folder. Lagipula tulisan asli biasanya disimpan di database — folder tidak dibuat dengan tangan sama sekali.

## Folder dengan kurung siku

Solusinya: folder bernama `[slug]` — kurung siku menandai "potongan alamat di sini bebas, apa saja cocok". Pola ini disebut **route dinamis**.

```text
app/blog/[slug]/page.tsx   →   /blog/artikel-pertama ✔
                               /blog/belajar-nextjs  ✔
                               /blog/apa-saja        ✔
```

Satu file `page.tsx` di dalam `[slug]` menangani semua alamat `/blog/...`. Nama di dalam kurung bebas kamu pilih — `[slug]`, `[id]`, atau `[judul]` sama-sama sah; nama itulah yang nanti dipakai untuk membaca isi alamatnya.

## Membaca isi alamat dengan `params`

Saat pengunjung membuka `/blog/belajar-nextjs`, Next.js menyerahkan potongan `"belajar-nextjs"` ke halamanmu lewat props bernama `params`. Buka `project/app/blog/[slug]/page.tsx` di panel File:

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

- **`params: Promise<{ slug: string }>`** — di Next.js 15 ke atas, `params` bukan data langsung melainkan **Promise**: bungkusan yang isinya baru bisa diambil setelah "ditunggu" dengan `await`. TypeScript mencatat bahwa isinya ada potongan bernama `slug`, sesuai nama folder `[slug]`.
- **`const { slug } = await params`** — mengambil isi params ke variabel `slug`. Karena memakai `await`, fungsi halaman ditandai `async`.
- Pengunjung buka `/blog/belajar-nextjs` → `slug` berisi `"belajar-nextjs"`. Buka `/blog/artikel-pertama` → `slug` berisi `"artikel-pertama"`.

## Biasanya slug dipakai mencari data

Contoh di atas hanya menampilkan slug-nya supaya mudah dilihat. Di project sungguhan, `slug` dipakai untuk mencari tulisan yang cocok — dari database atau file — lalu isi tulisan itulah yang ditampilkan. Kalau slug tidak ketemu, halaman biasanya diarahkan ke `not-found.tsx` — salah satu nama file khusus yang kamu kenal di pertemuan 01.

:::tip{title="Buktikan di project-mu"}
Nanti saat mengerjakan tugas, buat `app/blog/[slug]/page.tsx` lalu buka `localhost:3000/blog/apa-aja` — halaman yang sama tampil dengan slug mengikuti alamat yang kamu ketik.
:::

## Ringkasan

- ✅ `[slug]` = folder dinamis — cocok dengan potongan alamat apa saja, satu file untuk banyak alamat
- ✅ Isi potongan alamat dibaca lewat props `params`, diambil dengan `await params`
- ✅ Nama di dalam kurung bebas, tapi harus sama dengan nama yang dibaca di `params`
- ❌ Jangan menulis `params.slug` langsung tanpa `await` — isinya masih berupa Promise, bukan teks

Halaman sudah bisa bertingkat dan dinamis. Berikutnya: `layout.tsx` — bingkai yang membungkus halaman, dan ternyata bisa bertingkat juga.
