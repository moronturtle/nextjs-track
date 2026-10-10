---
type: lesson
title: ESLint
template: baca
previews: false
terminal: false
focus: /project/eslint.config.mjs
---

# ESLint

Project hasil `create-next-app` sudah membawa **ESLint** — alat yang membaca file kodemu lalu menandai pola yang berisiko atau berpotensi jadi bug. ESLint tidak mengubah tampilan halaman dan tidak menjalankan aplikasimu; hasilnya hanya laporan di terminal.

Buka `project/eslint.config.mjs` di panel File — itu file pengaturan ESLint. Isinya mengaktifkan dua paket aturan:

- `eslint-config-next/core-web-vitals` — aturan khusus Next.js dan React.
- `eslint-config-next/typescript` — aturan untuk TypeScript.

## Aturan bawaan menandai apa saja?

Cara paling mudah memahaminya adalah mencoba langsung. Buat file `app/coba.tsx` berisi kode ini, lalu jalankan `npm run lint` dari folder project:

```tsx
export default function Coba() {
  const angka: any = 5;
  const tidakDipakai = "halo";
  console.log(angka);
  return <img src="/x.png" />;
}
```

Hasilnya akan seperti ini:

```text
2:16  error    Unexpected any. Specify a different type
3:9   warning  'tidakDipakai' is assigned a value but never used
5:10  warning  Using `<img>` could result in slower LCP ...
```

Perhatikan baik-baik:

- **`any` ditandai error** — menulis `any` berarti "abaikan tipe", jadi kesalahan bisa lolos tanpa terdeteksi.
- **Variabel yang tidak dipakai ditandai warning** — biasanya sisa kode yang lupa dihapus.
- **`<img>` biasa ditandai warning** — Next.js menyarankan `<Image />` dari `next/image` supaya gambar dioptimasi otomatis.
- **`console.log` tidak ditandai apa pun** — aturan bawaan membiarkannya.

Setiap laporan menyebut nama aturannya, misalnya `@typescript-eslint/no-explicit-any`. Nama itu bisa kamu cari di Google untuk membaca penjelasan lengkapnya.

## Warning vs error

ESLint punya dua tingkat laporan:

- **`warn` (kuning)** — saran perbaikan; kode tetap bisa jalan.
- **`error` (merah)** — pola yang dianggap berbahaya; `npm run lint` berhenti dengan status gagal.

## Mengatur aturan sendiri — seperti project profesional

Aturan bawaan bisa kamu ubah di `eslint.config.mjs`. Tambahkan satu objek berisi `rules` di dalam `defineConfig`, setelah dua paket bawaan:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Dua pengaturan di atas adalah contoh yang sering dipakai di project sungguhan:

- `"no-console": ["warn", { allow: ["warn", "error"] }]` — `console.log` ditandai, tapi `console.warn` dan `console.error` tetap boleh. Alasannya: `console.log` sering tertinggal dari sesi debugging, sedangkan `warn` dan `error` memang sengaja dipakai untuk mencatat masalah.
- `"@typescript-eslint/no-unused-vars": "error"` — variabel tak terpakai dinaikkan dari warning jadi error, supaya tidak bisa lolos.

Pola nilainya sama untuk semua aturan: `"nama-aturan": "off" | "warn" | "error"`. Tulis `"off"` untuk mematikan aturan, `"warn"` untuk saran, `"error"` untuk melarang.

:::tip{title="Latihan cepat"}
Setelah menambahkan aturan `no-console`, jalankan lagi `npm run lint` pada file `app/coba.tsx` tadi. Sekarang `console.log` ikut ditandai — bukti aturan barumu aktif. Setelah selesai mencoba, hapus file `coba.tsx`.
:::

## Jalankan pemeriksaan ESLint

Dari folder project, jalankan perintah ini di terminal. Jika terminal sedang dipakai untuk `npm run dev`, buka terminal kedua di folder project:

```bash
npm run lint
```

Perintah itu menjalankan script `lint` yang dicatat di `package.json`. Pada project contoh, script-nya adalah `"lint": "eslint"`.

Jika ESLint menemukan masalah, terminal menampilkan nama file, nomor baris, dan nama aturan yang terkait. Jika tidak ada masalah, pemeriksaan selesai tanpa laporan.

:::warning{title="Panduan lama mungkin berbeda"}
Di Next.js 16, `next lint` sudah dihapus. Gunakan `npm run lint` jika script `lint` di `package.json` berisi `eslint`, seperti pada project contoh.
:::

## Ringkasan

- ✅ ESLint sudah disiapkan oleh `create-next-app`; jalankan `npm run lint` untuk memeriksa kode.
- ✅ Aturan bawaan menandai `any` sebagai error, variabel tak terpakai dan `<img>` sebagai warning; `console.log` dibiarkan.
- ✅ Aturan bisa diubah di `eslint.config.mjs` dengan pola `"nama-aturan": "off" | "warn" | "error"` — misalnya melarang `console.log` seperti project profesional.
- ✅ ESLint memeriksa pola penulisan kode, bukan kecocokan tipe data dan bukan kerapian format.

Lalu siapa yang merapikan format kode? Itu tugas Prettier — kita bahas berikutnya.
