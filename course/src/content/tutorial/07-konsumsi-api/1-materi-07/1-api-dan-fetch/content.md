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

API (Application Programming Interface) adalah cara satu program memakai fitur program lain. Kata ini sebenarnya luas — `localStorage` dan `fetch` juga disebut API, karena keduanya fitur yang disediakan browser.

Di materi ini, API yang dimaksud adalah **web API**: alamat di server yang bisa kita minta datanya lewat internet. Alurnya selalu dua langkah:

1. Aplikasi mengirim **request** (permintaan) ke sebuah alamat.
2. Server mengirim **response** (jawaban).

Request dan response berjalan lewat **HTTP**, aturan komunikasi antara browser dan server. Membuka alamat API di browser sama dengan mengirim request metode `GET` — metode untuk membaca data. Metode lain untuk mengirim dan mengubah data (`POST`, `PATCH`, `DELETE`) akan kita pakai di pertemuan berikutnya.

:::tip{title="Bayangkan seperti restoran"}
Kamu adalah pelanggan, API adalah pelayan, dan server adalah dapur. Kamu menyebut pesanan lewat pelayan, lalu pelayan menyampaikannya ke dapur dan membawa hidangan ke mejamu. Kamu tidak perlu masuk ke dapur — sama seperti aplikasi yang tidak perlu tahu cara server menyimpan data.
:::

## API tidak selalu mengirim JSON

**JSON** adalah format teks untuk bertukar data. Bentuknya mirip objek JavaScript:

```json
{ "id": 1, "teks": "Belajar dasar fetch", "selesai": true }
```

JSON adalah format yang paling umum di web API, tapi bukan satu-satunya:

| Format                | Dipakai untuk                         |
| --------------------- | ------------------------------------- |
| JSON                  | Paling umum di web API modern         |
| XML                   | API lama, SOAP, RSS                   |
| Teks biasa atau HTML  | Potongan halaman atau pesan sederhana |
| CSV                   | Ekspor data tabel                     |
| File (gambar, PDF)    | Unduhan — isinya berkas, bukan teks   |
| Kosong (status `204`) | Sering setelah menghapus data         |

Server memberi tahu formatnya lewat **header** `Content-Type` — label di jawaban yang menjelaskan jenis isinya. Tiap format punya label dan cara bacanya sendiri di kode:

| Server mengirim | `Content-Type`     | Kita membacanya dengan    |
| --------------- | ------------------ | ------------------------- |
| JSON            | `application/json` | `res.json()`              |
| XML             | `application/xml`  | `res.text()`, lalu diolah |
| Teks biasa      | `text/plain`       | `res.text()`              |
| PDF             | `application/pdf`  | `res.blob()`              |
| Gambar          | `image/png`        | `res.blob()`              |

Di API latihan ini, nilai `Content-Type`-nya `application/json`, jadi kita selalu memakai `res.json()`.

Kesalahan yang sering terjadi: server error mengirim halaman HTML, lalu `res.json()` gagal dengan pesan `Unexpected token '<'` — tanda `<` adalah huruf pertama HTML, bukan JSON.

## Alamat API untuk latihan

API untuk latihan di materi ini dapat diakses di `https://nextjs-track-api.vercel.app`.

Untuk mengambil daftar Todo milik Budi, buka alamat berikut di browser:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi
```

Server mengirim daftar Todo milik Budi dalam bentuk JSON. Saat sebuah nama digunakan untuk pertama kali, server menyiapkan data contoh untuk nama tersebut.

Alamat itu terdiri dari tiga bagian:

| Bagian                                | Sebutan                  | Peran                       |
| ------------------------------------- | ------------------------ | --------------------------- |
| `https://nextjs-track-api.vercel.app` | alamat server (base URL) | tempat API-nya              |
| `/api/todos`                          | path (jalur)             | data apa yang diminta       |
| `?owner=budi`                         | parameter query          | pilihan tambahan di request |

Nilai `owner` memberi tahu server daftar siapa yang ingin diambil. Ganti `budi` dengan namamu agar daftar Todo-mu terpisah dari daftar dengan nama lain.

Di pertemuan ini, kita belum memakai login. Nama pada `owner` hanya digunakan untuk memilih daftar. Mulai pertemuan 12, aplikasi akan mengirim token login dan server memakai nama di token untuk memilih daftar.

Alamat API bisa memiliki beberapa parameter query. Pisahkan tiap parameter dengan tanda `&`:

```text
https://nextjs-track-api.vercel.app/api/todos?owner=budi&status=belum
```

Alamat tersebut meminta daftar Todo milik Budi yang belum selesai. Kita akan membahas pencarian dan filter lebih lanjut di pertemuan 10.

Setiap jawaban server juga disertai **kode status** — angka yang menandai hasil request. Yang paling sering kamu temui: `200` berhasil, `404` tidak ditemukan, `500` server bermasalah. Cara menanganinya di kode kita bahas di langkah berikutnya.

:::tip{title="Lihat request-nya di DevTools"}
Buka DevTools browser (klik kanan → Inspect) lalu pilih tab **Network**. Buka ulang alamat API di atas — request `GET` ke `/api/todos` muncul di daftar. Klik barisnya untuk melihat header `Content-Type` dan isi JSON yang dikirim server.
:::

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

- ✅ API yang kita pakai adalah web API: alamat di server yang menjawab request lewat HTTP.
- ✅ Jawaban API umumnya JSON, tapi bisa juga format lain — header `Content-Type` memberi tahu jenisnya.
- ✅ Alamat API = alamat server + path + parameter query seperti `?owner=`.
- ✅ `fetch` mengirim request, `res.json()` membaca jawaban JSON, dan `await` menunggu keduanya.

Berikutnya, kita pakai `fetch` di komponen React untuk menampilkan daftar dari server.
