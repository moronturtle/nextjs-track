---
type: lesson
title: "Pertemuan 11 — Dari desain ke kode"
template: baca
previews: false
terminal: false
focus: /project/components/kartu-tugas.tsx
---

# Pertemuan 11 — Dari desain ke kode

Sampai sini aplikasimu berfungsi, tapi tampilannya masih sederhana. Pertemuan ini tentang keahlian lain seorang frontend developer: **menerjemahkan desain menjadi kode**.

Di kerja nyata, desainer mengirim desain lewat **Figma** — aplikasi desain berbasis web. Kamu membaca ukuran, warna, dan jaraknya, lalu menuliskannya sebagai CSS. Tailwind yang kamu pasang di pertemuan 02 membuat penerjemahan itu cepat.

## Membaca desain: ukuran, warna, jarak

Anggap desainer memberi kartu tugas seperti ini:

```text
┌──────────────────────────────────┐
│ ☐ Belajar fetch                  │  ← teks 14px, hitam
│                          🗑 Hapus │  ← merah
└──────────────────────────────────┘
 latar putih, sudut membulat 8px,
 padding 12px, bayangan halus
```

Tiga hal yang selalu kamu cari di desain:

- **Warna** — latar, teks, aksen. Desainer biasanya menulisnya sebagai kode hex seperti `#ffffff` atau `#be123c`.
- **Jarak** — padding (jarak isi ke tepi dalam) dan gap (jarak antar elemen).
- **Ukuran teks** — besar font dan ketebalannya.

## Menerjemahkan ke class Tailwind

Buka `project/components/kartu-tugas.tsx` — desain di atas diterjemahkan persis:

```tsx
<div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
  <input type="checkbox" className="h-4 w-4" />
  <span className="flex-1 text-sm text-slate-900">Belajar fetch</span>
  <button className="text-sm font-medium text-rose-600">Hapus</button>
</div>
```

Peta terjemahannya:

| Dari desain | Class Tailwind |
| --- | --- |
| sudut membulat 8px | `rounded-lg` |
| latar putih | `bg-white` |
| padding 12px | `p-3` (1 langkah = 4px, jadi 3 × 4px) |
| elemen berjajar dengan jarak | `flex items-center gap-3` |
| bayangan halus | `shadow-sm` |
| teks 14px | `text-sm` |
| warna merah | `text-rose-600` |

Angka di Tailwind (`p-3`, `gap-3`, `w-4`) memakai kelipatan 4px — `p-3` = 12px, `p-4` = 16px. Setelah sering memakainya, kamu hafal polanya.

## Token desain: keputusan yang dipakai berulang

Kata "merah" dan "halus" di atas sebenarnya adalah **keputusan desain** — dan keputusan yang sama dipakai di banyak tempat. Kumpulan keputusan itu disebut **token desain**: palet warna, skala jarak, ukuran teks.

Tailwind sudah membawa token bawaan (skala warna `slate`, `rose`, dst.; skala jarak kelipatan 4px). Di project, kamu tinggal memilih: "merah kita = `rose-600`, abu teks = `slate-500`, sudut kartu = `rounded-lg`". Menetapkan pilihan seperti ini dan memakainya konsisten di semua komponen itulah yang disebut **design system** kecil-kecilan.

:::info{title="Tanpa Figma pun tetap bisa"}
Tidak punya desainer? Ambil aplikasi yang tampilannya kamu suka, perhatikan tiga hal tadi (warna, jarak, ukuran teks), lalu tiru. Kebanyakan aplikasi bagus hanya memakai 2–3 warna dan beberapa ukuran teks — konsistensi lebih penting daripada banyak gaya.
:::

## Buktikan sendiri

Pasang `KartuTugas` di project-mu, lalu ubah `p-3` jadi `p-6` — jarak dalam kartu berlipat ganda. Ganti `rose-600` jadi `sky-600` — aksennya biru. Satu kata mengubah satu keputusan desain.

## Ringkasan

- ✅ Desain diterjemahkan dari tiga hal: warna, jarak, ukuran teks.
- ✅ Class Tailwind memetakan keputusan desain langsung — `p-3` = 12px, `rounded-lg` = sudut 8px.
- ✅ Token desain = keputusan yang dipakai berulang; konsistensi menciptakan tampilan rapi.

Berikutnya: saat class yang sama ditulis berulang-ulang di banyak tombol — waktunya membuat komponen dengan varian.
