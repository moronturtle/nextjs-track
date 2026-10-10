---
type: lesson
title: Type Check
template: baca
previews: false
terminal: false
focus: /project/tsconfig.json
---

# Type Check

Di lesson ESLint, kamu melihat `any` ditandai sebagai error. Tapi ada kesalahan lain yang tidak ditangkap ESLint: **kesalahan tipe data**.

Misalnya kamu punya fungsi yang mengharapkan angka:

```ts
function hitungDiskon(harga: number) {
  return harga * 0.9;
}

hitungDiskon("sepuluh ribu");
```

Kode di atas mengirim teks `"sepuluh ribu"` ke fungsi yang mengharapkan angka. ESLint diam saja — tidak ada aturan yang tersentuh. Tapi program akan menghasilkan `NaN` (bukan angka) saat dijalankan.

Kesalahan seperti ini ditangkap oleh **type check** — pemeriksaan tipe data yang dilakukan oleh TypeScript.

## ESLint, TypeScript, dan Prettier itu beda tugas

- **ESLint** — memeriksa pola dan kebiasaan penulisan kode (`any`, variabel tak terpakai, `<img>`).
- **TypeScript** — memeriksa kecocokan tipe data (angka dikirim ke fungsi angka, teks ke fungsi teks).
- **Prettier** — merapikan format (spasi, tanda kutip, panjang baris).

Tiga alat ini saling melengkapi. Tidak ada yang bisa menggantikan yang lain.

## Di mana type check berjalan?

**Di editor.** Kalau kamu memakai VS Code, kesalahan tipe langsung digarisbawahi merah saat mengetik — tidak perlu menjalankan perintah apa pun.

**Saat `npm run build`.** Next.js menjalankan pemeriksaan tipe secara otomatis saat membangun versi produksi. Kalau ada kesalahan tipe, build gagal — ini pengaman supaya kode salah tidak sampai dipublikasikan.

:::warning{title="Kalau menemukan saran ignoreBuildErrors"}
Project-mu tidak perlu mengubah apa pun — pemeriksaan tipe saat build sudah menyala secara bawaan. Tapi di internet ada saran untuk menulis `typescript.ignoreBuildErrors: true` di `next.config.ts` supaya build tetap jalan walau ada kesalahan tipe. Jangan ikuti saran itu — kesalahan tipe akan lolos sampai produksi.
:::

## `tsconfig.json` — file pengaturan TypeScript

Buka `project/tsconfig.json` di panel File — itu file pengaturan TypeScript. Bagian pentingnya:

- `"strict": true` — mode pemeriksaan ketat. Jenis kesalahan yang di mode biasa dibiarkan ikut ditandai, misalnya variabel tanpa tipe yang jelas.
- `"noEmit": true` — kata *emit* artinya "mengeluarkan file hasil". Browser sebenarnya tidak bisa membaca TypeScript; kode harus diubah dulu jadi JavaScript. Di project Next.js, perubahan itu dikerjakan oleh Next.js sendiri, bukan oleh `tsc`. Jadi `noEmit` artinya: "`tsc` cukup memeriksa saja, tidak usah membuat file JavaScript." Contoh kalau pengaturan ini dimatikan: saat kamu menjalankan `tsc`, setiap `page.tsx` akan mendapat kembaran `page.js` di folder yang sama — file ganda yang tidak diperlukan dan bisa membuat bingung.
- `"plugins": [{ "name": "next" }]` — tambahan yang membuat editor seperti VS Code mengerti aturan khusus Next.js. Contoh nyata: saat kamu menulis `export const dynamic` di `page.tsx`, editor tahu itu pengaturan sah milik Next.js dan bisa melengkapi nilainya — pengetahuan itu tidak ada di TypeScript biasa.

## Script `typecheck` — opsional, tapi umum di project profesional

`create-next-app` tidak menambahkan perintah khusus untuk memeriksa tipe. Kamu bisa menjalankannya langsung dengan `npx tsc --noEmit`, atau menambahkan script di `package.json` supaya lebih singkat — lihat `project/package.json` di panel File:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

`tsc` adalah program pemeriksa tipe TypeScript. `--noEmit` artinya "hanya periksa, jangan hasilkan file JavaScript" — pekerjaan membuat file sudah ditangani Next.js.

Setelah script ditambahkan, jalankan:

```bash
npm run typecheck
```

Berguna saat kamu ingin memastikan semua tipe benar tanpa menjalankan build penuh yang lebih lama. Ini pola yang umum dipakai di project sungguhan — misalnya dijalankan otomatis sebelum kode di-push atau sebelum pull request digabung.

:::tip{title="Latihan cepat"}
Tulis fungsi `hitungDiskon` di atas ke file `app/coba.ts`, lalu jalankan `npx tsc --noEmit`. Kamu akan melihat laporan error untuk `hitungDiskon("sepuluh ribu")` — dan `npm run lint` tidak menandai apa pun. Hapus file setelah selesai mencoba.
:::

## Ringkasan

- ✅ Type check memeriksa kecocokan tipe data — pekerjaan TypeScript, bukan ESLint.
- ✅ Pemeriksaan tipe berjalan otomatis di editor dan saat `npm run build`.
- ✅ `tsconfig.json` mengatur TypeScript; `"strict": true` dan plugin `next` sudah disiapkan oleh `create-next-app`.
- ✅ Script `"typecheck": "tsc --noEmit"` opsional, tapi sering dipakai untuk memeriksa tipe tanpa build penuh.
- ❌ Jangan menyalakan `typescript.ignoreBuildErrors` untuk meloloskan kode yang salah.

Tiga penjaga kode sudah dibahas: ESLint untuk pola kode, Prettier untuk format, TypeScript untuk tipe. Berikutnya kita lihat Tailwind CSS — alat untuk menata tampilan halaman.
