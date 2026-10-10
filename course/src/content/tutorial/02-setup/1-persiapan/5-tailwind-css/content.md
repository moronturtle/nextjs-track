---
type: lesson
title: Tailwind CSS
template: baca
previews: false
terminal: false
focus: /project/app/globals.css
---

# Tailwind CSS

**Tailwind CSS** adalah library CSS — kumpulan class siap pakai untuk menata tampilan halaman. Setiap class mewakili satu aturan CSS kecil: `text-3xl` mengatur ukuran teks, `font-bold` membuat teks tebal, `mt-4` memberi jarak atas.

Tanpa Tailwind, kamu menata tampilan dengan menulis aturan CSS sendiri di file `.css`. Dengan Tailwind, kamu tidak menulis aturan baru — kamu tinggal memilih class yang sudah disediakan lalu menempelkannya pada elemen.

Buka `project/app/page.tsx` di panel File. Class-class Tailwind ditulis di atribut `className` — di JSX, atribut HTML `class` ditulis sebagai `className`.

```tsx
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Halaman Beranda
      </h1>
      <p className="mt-4 text-slate-600">
        Saya sedang belajar Tailwind CSS.
      </p>
    </main>
  );
}
```

Class `mx-auto` menempatkan isi di tengah secara horizontal, `max-w-3xl` membatasi lebar, dan `px-6 py-12` memberi jarak di dalam elemen. Kamu dapat melihat nama class yang dipakai pada project contoh dan membandingkannya dengan tampilannya.

## Apakah Tailwind perlu dipasang sendiri?

Kalau kamu memilih **recommended defaults** saat menjalankan `create-next-app`, Tailwind sudah dipasang dan dikonfigurasi. Tidak perlu mengulang langkah setup secara manual.

Project contoh menggunakan Tailwind CSS versi 4. Perhatikan tiga file berikut di panel File:

1. `package.json` — mencatat `tailwindcss` dan `@tailwindcss/postcss`.
2. `postcss.config.mjs` — mengaktifkan plugin untuk PostCSS. PostCSS adalah alat yang memproses CSS dan menjalankan plugin seperti Tailwind.
3. `app/globals.css` — memuat Tailwind sekaligus menyimpan pengaturan warna dan huruf project (diuraikan di bawah).

`app/layout.tsx` mengimpor `globals.css`. Karena root layout membungkus halaman App Router, class Tailwind dapat dipakai di halaman-halaman tersebut.

:::tip{title="Kalau Tailwind tidak dipilih saat setup"}
Pasang paket yang diperlukan dengan `npm install -D tailwindcss @tailwindcss/postcss`. Setelah itu, konfigurasi `postcss.config.mjs`, tambahkan `@import "tailwindcss";` ke `app/globals.css`, lalu pastikan file CSS tersebut diimpor oleh `app/layout.tsx`. Project Next.js versi lama mungkin menggunakan langkah berbeda.
:::

Tailwind CSS versi 4 tidak membutuhkan file `tailwind.config.js` untuk setup dasar seperti pada project contoh. Jika kamu mengikuti tutorial versi 3, nama dan langkah konfigurasinya dapat berbeda.

## Isi `globals.css` sebenarnya

Buka `project/app/globals.css` di panel File. File bawaan `create-next-app` isinya lebih dari satu baris impor:

- `@import "tailwindcss";` — memuat semua class Tailwind ke project.
- `:root { --background: #ffffff; ... }` — menyimpan nilai warna dalam *variabel CSS*. Variabel adalah nilai yang diberi nama supaya bisa dipakai berulang; kalau warna dasar ingin diganti, cukup ubah di satu tempat ini.
- `@theme inline { ... }` — cara Tailwind v4 mendaftarkan nama gaya buatanmu sendiri. `--color-background` di sini membuat class `bg-background` dan `text-background` bisa dipakai; `--font-sans` membuat class `font-sans` bisa dipakai.
- `@media (prefers-color-scheme: dark)` — isi `:root` diganti otomatis saat sistem pengguna dalam mode gelap, jadi latar dan teks tetap terbaca.
- `body { ... }` — gaya dasar seluruh halaman: warna latar, warna teks, dan huruf bawaan.

Kalau ingin gaya tertentu hanya aktif saat mode gelap, pakai awalan `dark:` — misalnya `bg-white dark:bg-slate-900`.

## Font — dari `next/font` ke class `font-sans`

Huruf di project contoh adalah **Geist**, dimuat lewat `next/font/google` di `app/layout.tsx`. Next.js mengunduh huruf itu sekali saat build dan menyajikannya dari servermu sendiri — halaman tidak perlu meminta ke Google setiap dibuka.

Sambungannya terlihat di dua file. Buka `project/app/layout.tsx` — huruf dimuat lalu disimpan sebagai variabel CSS:

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

Variabel itu ditempelkan ke `<body>` lewat `className`. Lalu di `globals.css`, variabel tersebut didaftarkan lewat `@theme inline` sebagai `font-sans`:

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
}
```

Hasilnya: class `font-sans` dan `font-mono` bisa dipakai di `className` mana pun tanpa menulis CSS tambahan.

## Contoh yang bisa langsung dicoba

Buat file `app/profil/page.tsx` di project-mu, isi dengan kode ini, lalu buka `http://localhost:3000/profil`:

```tsx
export default function Profil() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-sans text-3xl font-bold text-foreground">
        Profil Saya
      </h1>
      <p className="mt-4 font-mono text-sm text-slate-500">
        status: sedang belajar tailwind
      </p>
      <button className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-600">
        Simpan
      </button>
      <p className="mt-6 text-base md:text-xl">
        Teks ini membesar di layar yang lebih lebar.
      </p>
    </main>
  );
}
```

Hal baru di contoh ini:

- `font-sans` dan `font-mono` — huruf yang tadi didaftarkan lewat `@theme inline`. `font-mono` memakai huruf monospace (setiap huruf selebar sama) — cocok untuk teks bernuansa kode.
- `text-foreground` — warna teks dari variabel `:root`; otomatis ikut terang saat mode terang dan gelap saat mode gelap.
- `rounded-lg`, `px-4 py-2`, `mt-6` — sudut membulat dan jarak dalam/luar tombol.
- `hover:bg-slate-600` — gaya yang hanya aktif saat kursor berada di atas elemen. Arahkan mouse ke tombol "Simpan" untuk melihat warnanya berubah.
- `md:text-xl` — ukuran `text-xl` hanya berlaku di layar berukuran sedang ke atas; di layar kecil teks tetap `text-base`. Kecilkan lebar jendela browser untuk membuktikannya.

Awalan seperti `hover:` dan `md:` disebut *variant* — pengaturan kapan sebuah class aktif. Seluruh daftarnya ada di cheat sheet.

## Class-nya banyak — pakai cheat sheet

Tailwind punya ratusan class dan tidak perlu dihafal semuanya. Simpan tautan cheat sheet ini sebagai tempat mencari class saat dibutuhkan:

**[Tailwind Cheat Sheet — nerdcave.com](https://nerdcave.com/tailwind-cheat-sheet)**

Isinya daftar class yang dikelompokkan per kategori — jarak (`p-`, `m-`), ukuran (`w-`, `h-`), warna (`bg-`, `text-`), huruf, flexbox, grid, dan lainnya — lengkap dengan kotak pencarian. Saat mengerjakan tugas nanti, buka halaman itu untuk menemukan class yang kamu perlukan.

## Ringkasan

- ✅ Tailwind adalah library CSS berisi class siap pakai seperti `text-3xl` dan `font-bold`; tidak perlu dihafal, cari lewat cheat sheet saat butuh.
- ✅ Pilihan recommended defaults memasang Tailwind dan konfigurasi awalnya.
- ✅ `app/globals.css` memuat Tailwind, mendefinisikan warna (`bg-background`, `text-foreground`) dan huruf (`font-sans`, `font-mono`) lewat `@theme inline`, plus penyesuaian mode gelap otomatis.
- ✅ Awalan seperti `hover:`, `md:`, dan `dark:` mengatur kapan sebuah class aktif.
- ❌ Jangan memasang ulang Tailwind jika project-mu sudah mendapatkannya dari `create-next-app`.

Materi berikutnya membandingkan dua cara Next.js menyusun route: App Router dan Pages Router.
