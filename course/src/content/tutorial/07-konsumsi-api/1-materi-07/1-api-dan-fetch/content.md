---
type: lesson
title: "Pertemuan 07 — Konsumsi API"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 07 — Konsumsi API

Di pertemuan 06, daftar Todo disimpan di `localStorage`. Data itu hanya ada di browser milikmu — buka project di komputer lain, daftarnya kosong lagi. Pertemuan ini kita pindahkan penyimpanan ke **server**, supaya datamu sama di mana pun project dibuka.

## API itu apa?

API (Application Programming Interface) adalah cara dua program bertukar data lewat alamat URL. Polanya selalu dua langkah:

1. Kamu mengirim **request** ke sebuah alamat.
2. Server menjawab dengan **response** — untuk API latihan kita, isinya teks JSON.

JSON adalah format data berbentuk teks yang susunannya mirip objek JavaScript:

```json
{ "id": 1, "teks": "Belajar dasar fetch", "selesai": true }
```

## API latihan kita

Kita punya server latihan dengan alamat seperti ini — mentor memberikan alamat pastinya di kelas:

```text
GET http://localhost:3001/api/todos?owner=budi
```

Tempel alamat itu di address bar browser. Server menjawab dengan teks JSON berisi daftar Todo.

Perhatikan `?owner=budi` di ujung alamat. Bagian itu disebut **parameter query** — penanda milik siapa data ini. Ganti `budi` dengan namamu dan kamu mendapat daftar sendiri, terpisah dari murid lain. Kalau `owner` tidak diisi, server memakai `demo`.

Parameter query tidak harus satu — beberapa digabung dengan tanda `&`:

```text
GET /api/todos?owner=budi&status=belum
```

Artinya "todo milik budi, yang belum selesai". Kita baru pakai satu parameter saja untuk sekarang; parameter lainnya (`status`, `q`, `page`) kita aktifkan di pertemuan 10.

## Membaca API dari kode: fetch

JavaScript punya fungsi bawaan `fetch` untuk mengirim request:

```ts
const res = await fetch("http://localhost:3001/api/todos?owner=demo");
const data = await res.json();
```

Dua hal yang perlu diingat:

- `fetch()` mengembalikan `Promise` — jawaban server tidak datang seketika, jadi dipanggil dengan `await`.
- `res.json()` membaca isi response dan mengubah teks JSON menjadi objek atau array JavaScript. Ini juga perlu `await` karena membaca isi response butuh waktu.

Buka `project/lib/todo-api.ts` di panel File. Fungsi `bacaTodos` membungkus dua langkah itu menjadi satu fungsi siap pakai — kita bedah isinya di lesson berikutnya.

:::info{title="Kenapa ada data.todos?"}
Server tidak membalas dengan array polos. Jawabannya dibungkus objek seperti `{ "todos": [...], "total": 12, "page": 1 }` supaya kita juga tahu jumlah dan halaman data. Karena itu `bacaTodos` mengambil `data.todos`, bukan `data` langsung. Info `page` dan `total` baru kita pakai di pertemuan 10.
:::

:::tip{title="Ilmu tambahan: ada juga axios"}
`fetch` adalah fungsi bawaan browser — tidak perlu install apa pun, jadi kita pakai itu di materi ini. Di dunia kerja kamu akan sering menemui **axios**, library pihak ketiga yang sangat populer. Dia punya kemudahan sendiri: JSON otomatis jadi objek (`data` langsung bisa dipakai), dan fitur "interceptor" untuk menyisipkan header auth di semua request sekaligus. Contoh pemakaiannya:

```ts
import axios from "axios";
const res = await axios.get("http://localhost:3001/api/todos", {
  params: { owner: "demo" }, // axios menyusun ?owner=demo sendiri
});
const todos = res.data.todos; // JSON sudah jadi objek, tanpa res.json()
```

Konsep HTTP-nya sama persis — GET ke alamat, terima response. Cuma axios yang menyiapkan detailnya. Karena materi ini mengajarkan konsep HTTP, kita pakai `fetch` supaya kamu melihat langsung `res.ok` dan `res.json()`. Kalau nanti project kerja memakai axios, kamu tetap paham apa yang terjadi di baliknya.
:::

## Ringkasan

- ✅ API = bertukar data lewat URL; server menjawab dengan teks JSON.
- ✅ `?owner=` memisahkan data tiap murid di API latihan.
- ✅ `fetch` + `res.json()` = dua langkah membaca API.
- ✅ `await` dipakai karena jawaban server butuh waktu.

Berikutnya kita pakai `fetch` di dalam komponen dan menampilkan hasilnya di layar.
