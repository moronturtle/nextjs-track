---
type: lesson
title: Lihat hasilnya dulu
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /demo-todo/
focus: /demo-todo/main.jsx
---

# Mini project: aplikasi todo

Pertemuan ini tidak ada materi baru. Kita merangkai semua yang sudah kamu pelajari dari pertemuan 01 sampai 05 menjadi **satu aplikasi kecil yang utuh**: aplikasi todo.

:::tip{title="Coba dulu di preview"}
Ini aplikasi yang akan kamu bangun. Ketik tugas baru lalu tekan **Tambah**, centang item untuk menandai selesai, dan hapus dengan tombol ✕. Mainkan sebentar — jam server di bawah tetap diam, bukti semuanya berjalan di browser tanpa reload.
:::

## Bedah bagian-bagiannya

Sebelum menulis kode, petakan dulu apa saja yang ada di aplikasi ini. Kebiasaan ini menyelamatkanmu dari bingung di tengah jalan:

| Bagian | Konsep dari pertemuan |
|---|---|
| Halaman `/todo` dan `/todo/42` | Nested + dynamic routes (03) |
| Pindah halaman dan tombol kembali | `Link` dan `useRouter` (03) |
| Daftar tugas yang berubah-ubah | `useState` (04) |
| Item todo = komponen anak | Props + callback (04) |
| Tugas tersimpan walau di-reload | `useEffect` + `localStorage` (04) |
| Tampilan rapi | Tailwind (02) |

Tidak ada konsep baru — hanya rangkaian dari yang sudah ada.

## Struktur filenya

```text
app/todo/
├── page.tsx         → /todo        (server — menyusun halaman)
├── todo-app.tsx     → "use client" — pemilik state + form + daftar
├── todo-item.tsx    → satu item (props dari parent)
└── [id]/
    ├── page.tsx     → /todo/42     (server — baca params)
    └── detail-todo.tsx → "use client" — tampilan detail
```

Data setiap tugas sederhana — sebuah objek:

```ts
{ id: 1718000000000, teks: "Belajar Next.js", selesai: false }
```

## Rencana empat langkah

1. **Daftar + state** — halaman `/todo` bisa menambah, mencentang, dan menghapus tugas.
2. **Simpan** — tugas tetap ada setelah halaman di-reload.
3. **Detail** — tiap tugas punya halaman sendiri di `/todo/42`.
4. **Rapikan** — perbaiki tampilan dengan Tailwind sampai layak dilihat.

Di setiap lesson, panel File menampilkan kode tahap itu — dan di akhir kamu mencobanya di project-mu sendiri. Buka `demo-todo/main.jsx` kalau mau mengintip semua kodenya dulu. Kita bedah pelan-pelan mulai lesson berikutnya.
