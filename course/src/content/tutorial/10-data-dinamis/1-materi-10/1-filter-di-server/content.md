---
type: lesson
title: "Pertemuan 10 — Filter di server"
template: baca
previews: false
terminal: false
focus: /project/lib/todo-api.ts
---

# Pertemuan 10 — Data dinamis: filter pindah ke server

Di pertemuan 06, filter Todo dihitung di browser: server mengirim **semua** data, `useMemo` menyaringnya di layar. Cara itu baik untuk belasan data. Tapi bayangkan datamu berisi sepuluh ribu tugas — mengirim semuanya setiap kali halaman dibuka itu lambat dan boros.

Solusinya: **biarkan server yang menyaring**, kita hanya meminta bagian yang dibutuhkan.

## API latihan bisa menyaring sendiri

Alamat `GET /api/todos` menerima empat parameter query:

| Parameter | Fungsi | Contoh |
| --- | --- | --- |
| `q` | cari teks yang mengandung kata | `?q=fetch` |
| `status` | filter selesai/belum | `?status=belum` |
| `page` | nomor halaman | `?page=2` |
| `limit` | banyak item per halaman | `?limit=5` |

Gabungkan semuanya dalam satu alamat:

```text
GET /api/todos?owner=budi&q=belajar&status=belum&page=2&limit=5
```

Artinya: "todo milik budi, yang teksnya mengandung 'belajar', yang belum selesai, halaman ke-2, 5 item per halaman." Server yang menyaring — browser menerima hasil akhirnya saja.

## Jawaban server ikut membawa info

Ingat bungkusan dari pertemuan 07 — sekarang isinya terpakai:

```json
{
  "todos": [...],
  "total": 12,
  "page": 2,
  "limit": 5,
  "totalHalaman": 3
}
```

`total` = jumlah semua todo yang lolos saringan (bukan cuma yang tampil). `totalHalaman` = ada berapa halaman — dua angka ini nanti menghidupkan tombol pagination.

## bacaTodos meneruskan parameter

Buka `project/lib/todo-api.ts` — `bacaTodos` sekarang menerima opsi dan menyusun URL-nya:

```ts
export async function bacaTodos(
  owner: string,
  opsi: { q?: string; status?: string; page?: number; limit?: number } = {},
): Promise<DaftarTodos> {
  const params = new URLSearchParams({ owner });
  if (opsi.q) params.set("q", opsi.q);
  if (opsi.status && opsi.status !== "semua") params.set("status", opsi.status);
  if (opsi.page) params.set("page", String(opsi.page));
  if (opsi.limit) params.set("limit", String(opsi.limit));

  const res = await kirimRequest(`/api/todos?${params}`);
  return res.json();
}
```

`URLSearchParams` menyusun `?owner=budi&q=belajar&...` untukmu — parameter yang kosong tidak ditulis. Perhatikan juga: `bacaTodos` sekarang mengembalikan **bungkusan utuh** (`DaftarTodos`), bukan `data.todos` saja — kita butuh `total` dan `totalHalaman`-nya.

## Filter lokal atau filter server?

| Situasi | Pilihan |
| --- | --- |
| Data sedikit (puluhan), semua sudah di tangan | `useMemo` di browser — cepat, tanpa request |
| Data banyak, perlu pagination/search | Filter di server — kirim parameter, terima hasil |
| Filter kecil sesaat di atas data yang sudah ada | Browser tetap masuk akal |

Dua-duanya sah — pertemuan ini kita pakai yang server supaya kamu merasakan polanya.

## Ringkasan

- ✅ Parameter query (`q`, `status`, `page`, `limit`) meminta server menyaring sebelum mengirim.
- ✅ Jawaban membawa `total` dan `totalHalaman` — bahan untuk pagination.
- ✅ `URLSearchParams` menyusun URL tanpa salah tulis `?` dan `&`.
- ✅ Filter server untuk data besar; `useMemo` tetap untuk data kecil di tangan.

Berikutnya kita sambungkan kotak cari dan tombol filter ke parameter ini — state berubah, request berangkat, daftar berganti.
