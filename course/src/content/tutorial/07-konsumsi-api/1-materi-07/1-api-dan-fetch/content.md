---
type: lesson
title: "Pertemuan 07 — Konsumsi API"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 07 — Membaca data dari API

Di pertemuan 06, daftar Todo disimpan di `localStorage`, yaitu penyimpanan di browser. Data itu hanya ada di browser tersebut. Sekarang kita akan membaca daftar dari server. Dengan begitu, data yang sama bisa dibuka dari perangkat lain.

## API itu apa?

API (Application Programming Interface) adalah cara satu program meminta data atau layanan dari program lain.

Contohnya, aplikasi Todo mengirim **request** (permintaan) ke server. Server lalu mengirim **response** (jawaban) berupa data JSON.

JSON adalah format teks untuk bertukar data. Bentuknya mirip objek JavaScript:

```json
{ "id": 1, "teks": "Belajar dasar fetch", "selesai": true }
```

## Alamat API latihan

API latihan kita sudah tersedia di internet. Alamat dasarnya adalah `https://nextjs-track-api.vercel.app`. Untuk meminta daftar Todo milik Budi, buka alamat ini di browser:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi
```

Server mengirim daftar Todo dalam bentuk JSON. Saat pertama kali nama owner dipakai, server menyiapkan data contoh untuk nama tersebut.

Perhatikan `?owner=budi` di alamat. Bagian setelah tanda tanya disebut **parameter query**. `owner` memberi tahu server daftar milik siapa yang diminta. Ganti `budi` dengan nama pilihanmu agar daftar yang kamu lihat terpisah dari nama lain.

Untuk pertemuan ini, kita belum memakai login. Jadi nama pada `owner` hanya dipakai untuk memilih daftar. Nanti, mulai pertemuan 12, identitas pemilik data dibaca dari token login.

Satu alamat bisa memiliki beberapa parameter query. Pisahkan parameter berikutnya dengan tanda `&`:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi&status=belum
```

Alamat itu meminta Todo milik Budi yang belum selesai. Kita akan membahas pencarian, filter, dan halaman data lebih lanjut di pertemuan 10.

## Membaca API dari kode: fetch

JavaScript menyediakan fungsi bawaan bernama `fetch` untuk mengirim request. Contohnya:

```ts
const res = await fetch(
  "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
);
const data = await res.json();
```

Perhatikan dua langkahnya:

- `fetch()` mengirim permintaan dan mengembalikan `Promise`, yaitu penanda bahwa hasilnya akan tersedia nanti. `await` membuat kode menunggu hasil tersebut.
- `res.json()` membaca jawaban server dan mengubah teks JSON menjadi data JavaScript. Proses membaca ini juga perlu ditunggu dengan `await`.

Buka `project/lib/todo-api.ts` di panel File. File ini berisi fungsi `bacaTodos`, yang memakai `fetch` untuk mengambil daftar Todo. Kita akan membaca isi file tersebut di lesson berikutnya.

:::info{title="Kenapa daftar ada di data.todos?"}
Server mengirim objek seperti `{ "todos": [...], "total": 12, "page": 1 }`, bukan array saja. Daftar Todo ada di bagian `todos`, jadi kode mengambil `data.todos`. Informasi jumlah dan halaman akan kita pakai di pertemuan 10.
:::

:::tip{title="Ilmu tambahan: ada juga axios"}
`fetch` sudah tersedia di browser, jadi kita tidak perlu memasang library tambahan. Di beberapa project, kamu juga akan menemukan **Axios**, library untuk mengirim request. Axios mengubah jawaban JSON menjadi objek secara otomatis. Axios juga punya fitur interceptor, yaitu tempat untuk menambahkan header yang sama ke banyak request.

```ts
import axios from "axios";
const res = await axios.get("https://nextjs-track-api.vercel.app/api/todos", {
  params: { owner: "demo" }, // Axios menambahkan ?owner=demo ke alamat
});
const todos = res.data.todos; // Jawaban JSON sudah menjadi objek
```

Keduanya bisa dipakai untuk meminta data. Di materi ini kita memakai `fetch` agar kamu melihat langsung cara memeriksa `res.ok` dan membaca jawaban dengan `res.json()`.
:::

## Ringkasan

- ✅ API menerima permintaan dari aplikasi dan mengirim jawaban berupa data.
- ✅ `?owner=` memilih daftar Todo yang ingin dibaca.
- ✅ `fetch` meminta data, lalu `res.json()` membaca jawaban JSON.
- ✅ `await` menunggu jawaban sebelum kode memakai datanya.

Berikutnya, kita pakai `fetch` di komponen React dan menampilkan daftar dari server.
