---
type: lesson
title: "Pertemuan 07 — Mengambil data dari API"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 07 — Mengambil data dari API

Di pertemuan 06, daftar Todo disimpan di `localStorage`, yaitu tempat penyimpanan di browser. Akibatnya, daftar hanya tersedia di browser tersebut. Di pertemuan ini, kita akan mengambil daftar dari server agar data yang sama bisa dibuka dari perangkat lain.

## API itu apa?

API (Application Programming Interface) adalah cara aplikasi meminta data dari server.

Contohnya, aplikasi Todo mengirim **request** (permintaan) ke API. API lalu mengirim **response** (jawaban) berupa data JSON.

JSON adalah format teks untuk bertukar data. Bentuknya mirip objek JavaScript:

```json
{ "id": 1, "teks": "Belajar dasar fetch", "selesai": true }
```

## Alamat API untuk latihan

API untuk latihan di materi ini dapat diakses di `https://nextjs-track-api.vercel.app`.

Untuk mengambil daftar Todo milik Budi, buka alamat berikut di browser:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi
```

Server mengirim daftar Todo milik Budi dalam bentuk JSON. Saat sebuah nama digunakan untuk pertama kali, server menyiapkan data contoh untuk nama tersebut.

Perhatikan `?owner=budi` di alamat. Bagian setelah tanda tanya disebut **parameter query**. Nilai `owner` memberi tahu server daftar siapa yang ingin diambil. Ganti `budi` dengan namamu agar daftar Todo-mu terpisah dari daftar dengan nama lain.

Di pertemuan ini, kita belum memakai login. Nama pada `owner` hanya digunakan untuk memilih daftar. Mulai pertemuan 12, aplikasi akan mengirim token login dan server memakai nama di token untuk memilih daftar.

Alamat API bisa memiliki beberapa parameter query. Pisahkan tiap parameter dengan tanda `&`:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi&status=belum
```

Alamat tersebut meminta daftar Todo milik Budi yang belum selesai. Kita akan membahas pencarian dan filter lebih lanjut di pertemuan 10.

## Mengambil data dengan fetch

JavaScript memiliki fungsi bawaan bernama `fetch` untuk mengirim request ke API. Contohnya:

```ts
const res = await fetch(
  "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
);
const data = await res.json();
```

Ada dua hal yang perlu diperhatikan:

- `fetch()` mengirim permintaan dan menghasilkan `Promise`, yaitu tanda bahwa jawabannya akan datang nanti. Kita memakai `await` agar kode menunggu jawaban tersebut.
- `res.json()` mengambil isi jawaban dan mengubah teks JSON menjadi data JavaScript. Proses ini juga perlu ditunggu dengan `await`.

Buka `project/lib/todo-api.ts` di panel File. File ini berisi fungsi `bacaTodos` yang mengambil daftar Todo dari API. Di langkah berikutnya, kita akan melihat cara kerja fungsi tersebut.

:::info{title="Kenapa daftar ada di data.todos?"}
API mengirim objek seperti `{ "todos": [...], "total": 12, "page": 1 }`, bukan array saja. Daftar Todo ada di bagian `todos`, jadi kode mengambil `data.todos`. Jumlah data dan nomor halaman akan kita pakai di pertemuan 10.
:::

:::tip{title="Ilmu tambahan: ada juga axios"}
`fetch` sudah tersedia di browser, jadi kita tidak perlu memasang library tambahan. Di beberapa project, developer menggunakan **Axios**, library lain untuk mengirim request. Axios mengubah jawaban JSON menjadi objek secara otomatis. Axios juga punya fitur interceptor, yaitu cara untuk menambahkan header yang sama ke beberapa request.

```ts
import axios from "axios";
const res = await axios.get("https://nextjs-track-api.vercel.app/api/todos", {
  params: { owner: "demo" }, // Axios menambahkan ?owner=demo ke alamat
});
const todos = res.data.todos; // Jawaban JSON sudah menjadi objek
```

Fetch dan Axios sama-sama bisa dipakai untuk mengambil data. Di materi ini, kita memakai `fetch` agar kamu bisa melihat cara memeriksa `res.ok` dan mengambil jawaban dengan `res.json()`.
:::

## Ringkasan

- ✅ API menerima permintaan dari aplikasi dan mengirim jawaban berupa data.
- ✅ `?owner=` memilih daftar Todo yang ingin dibaca.
- ✅ `fetch` meminta data, lalu `res.json()` membaca jawaban JSON.
- ✅ `await` menunggu jawaban sebelum kode memakai datanya.

Berikutnya, kita pakai `fetch` di komponen React untuk menampilkan daftar dari server.
