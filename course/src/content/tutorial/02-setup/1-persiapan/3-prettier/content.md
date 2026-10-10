---
type: lesson
title: Prettier
template: baca
previews: false
terminal: false
focus: /project/.prettierrc
---

# Prettier

**Prettier** adalah alat yang merapikan format kode — spasi, indentasi, tanda kutip, dan pemotongan baris. Prettier tidak mencari bug dan tidak memeriksa tipe; Prettier hanya membuat kode konsisten dan rapi.

Beda tugasnya dengan ESLint. ESLint menandai pola yang berisiko, misalnya variabel yang tidak dipakai. Prettier tidak peduli isi kode — Prettier hanya merapikan tampilannya.

## Sebelum dan sesudah

Misalnya kamu menulis kode dengan format berantakan seperti ini:

```tsx
export default function Coba() {
const nama = "Budi";
return <h1>Halo, { nama }</h1>;
}
```

Setelah Prettier dijalankan, kode yang sama menjadi:

```tsx
export default function Coba() {
  const nama = "Budi";
  return <h1>Halo, {nama}</h1>;
}
```

Isi program tidak berubah sama sekali — yang berubah hanya kerapiannya.

## Memasang dan menjalankan Prettier

`create-next-app` tidak memasang Prettier secara bawaan. Jika ingin memakainya, pasang dari folder project:

```bash
npm install --save-dev prettier
```

Setelah terpasang, format file di folder `app/` dengan:

```bash
npx prettier --write app
```

`--write` berarti Prettier langsung menyimpan hasil rapian ke file. Tanpa `--write`, Prettier hanya menampilkan hasilnya di terminal tanpa mengubah file.

Menjalankan Prettier bukan syarat agar Next.js bisa berjalan. Ini alat bantu agar kode lebih mudah dibaca — dan sangat membantu saat beberapa orang mengerjakan project yang sama.

## `.prettierrc` — pengaturan format yang dibagi bersama

Tanpa file pengaturan, Prettier memakai gaya bawaannya sendiri. Kalau kamu ingin gaya tertentu — misalnya tanda kutip ganda atau panjang baris maksimal — buat file `.prettierrc` di folder project.

Buka `project/.prettierrc` di panel File. Contoh isinya dengan pengaturan lengkap:

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

Arti tiap pengaturan:

- `"semi": true` — setiap pernyataan diakhiri titik koma `;`.
- `"singleQuote": false` — memakai tanda kutip ganda `"..."`, bukan `'...'`.
- `"printWidth": 100` — baris yang lebih panjang dari 100 karakter dipotong ke baris baru.
- `"tabWidth": 2` — satu tingkat indentasi memakai 2 spasi.
- `"trailingComma": "all"` — menambahkan koma setelah item terakhir pada array dan objek yang ditulis beberapa baris.
- `"bracketSpacing": true` — memberi spasi di dalam kurung kurawal objek: `{ nama: "Budi" }`, bukan `{nama: "Budi"}`.
- `"arrowParens": "always"` — parameter arrow function selalu dibungkus kurung: `(item) =>`, bukan `item =>`.

## Contoh sebelum dan sesudah

Misalnya kamu menulis komponen menu dengan format tidak konsisten — ada baris panjang, koma kurang lengkap, tanda kutip campur:

```tsx
export default function Menu() {
const link = [
{teks:'Beranda',url:'/'},
{teks:'Tentang Kami dan Sejarah Toko',url:'/tentang'},
{teks:'Kontak',url:'/kontak'}
]
const pilih = item => { return { label: item.teks, tujuan: item.url } }
return <nav>{link.map(item=><a key={item.url} href={item.url}>{item.teks}</a>)}</nav>
}
```

Setelah `npx prettier --write` dijalankan dengan `.prettierrc` di atas:

```tsx
export default function Menu() {
  const link = [
    { teks: "Beranda", url: "/" },
    { teks: "Tentang Kami dan Sejarah Toko", url: "/tentang" },
    { teks: "Kontak", url: "/kontak" },
  ];
  const pilih = (item) => {
    return { label: item.teks, tujuan: item.url };
  };
  return (
    <nav>
      {link.map((item) => (
        <a key={item.url} href={item.url}>
          {item.teks}
        </a>
      ))}
    </nav>
  );
}
```

Bandingkan dua versi itu dan cocokkan dengan pengaturannya:

- Titik koma ditambahkan di setiap akhir pernyataan — efek `"semi": true`.
- `'Beranda'` berubah jadi `"Beranda"` — efek `"singleQuote": false`.
- Isi objek mendapat spasi, `{ teks: ... }` — efek `"bracketSpacing": true`.
- `item =>` berubah jadi `(item) =>` — efek `"arrowParens": "always"`.
- Ada koma setelah item terakhir array (`{ teks: "Kontak", ... },`) — efek `"trailingComma": "all"`. Koma ini memudahkan saat menambah item baru nanti, karena cukup menulis satu baris tanpa menyentuh baris sebelumnya.
- Indentasi rapi 2 spasi per tingkat — efek `"tabWidth": 2`.
- Baris `return <nav>...` yang panjang dipecah jadi beberapa baris — efek `"printWidth": 100`.

File ini opsional — `npx prettier --write` tetap jalan tanpa `.prettierrc`. Manfaatnya ada dua:

1. Semua orang di tim merapikan kode dengan gaya yang sama, karena semuanya membaca file yang sama.
2. Editor seperti VS Code membaca `.prettierrc` saat **format on save** — kode dirapikan otomatis setiap kali kamu menyimpan file, dengan gaya yang sama seperti perintah di terminal.

:::tip{title="Perintah singkat lewat package.json"}
Project profesional sering menambahkan script `"format": "prettier --write ."` di `package.json` — lihat `project/package.json` di panel File. Setelah itu cukup jalankan `npm run format` untuk merapikan seluruh project.
:::

## Kalau ESLint dan Prettier dipakai bersama

Beberapa aturan ESLint ikut mengatur format, misalnya panjang baris. Aturan seperti itu bisa bertentangan dengan hasil Prettier — ESLint menandai format yang baru saja Prettier rapikan.

Solusinya adalah paket `eslint-config-prettier`. Paket ini mematikan aturan format di ESLint supaya urusan format sepenuhnya diserahkan ke Prettier:

```bash
npm install --save-dev eslint-config-prettier
```

Lalu di `eslint.config.mjs`, impor dan tambahkan setelah paket aturan lain:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Urutan itu penting — `prettier` harus setelah `nextVitals` dan `nextTs` supaya aturan format mereka bisa dimatikan.

:::info{title="Ini langkah tambahan, bukan syarat"}
Project contoh belum memakai `eslint-config-prettier`. Pasang paket ini hanya kalau kamu memakai ESLint dan Prettier bersamaan dan menemukan aturan yang saling bertentangan.
:::

## Ringkasan

- ✅ Prettier merapikan format kode — spasi, indentasi, tanda kutip, panjang baris — tanpa mengubah isi program.
- ✅ `create-next-app` tidak memasang Prettier; pasang sendiri dengan `npm install --save-dev prettier`, lalu jalankan `npx prettier --write app`.
- ✅ `.prettierrc` opsional, tapi berguna: satu gaya format untuk seluruh tim dan untuk format-on-save di editor.
- ✅ `eslint-config-prettier` mematikan aturan format ESLint agar tidak bertabrakan dengan Prettier.

Ada satu pemeriksaan lagi yang berbeda dari ESLint dan Prettier: pemeriksaan tipe TypeScript. Kita bahas berikutnya.
