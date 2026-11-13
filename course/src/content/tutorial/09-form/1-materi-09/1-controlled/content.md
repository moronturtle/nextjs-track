---
type: lesson
title: "Pertemuan 09 — Form dan controlled input"
template: baca
previews: false
terminal: false
focus: /project/components/kotak-cari.tsx
---

# Pertemuan 09 — Form dan controlled input

Sebenarnya kamu sudah memakai *controlled input* sejak pertemuan 04 — `TodoForm` dan `KotakCari` memakai pola `value` + `onChange`. Pertemuan ini kita beri nama polanya, lihat alternatifnya, lalu belajar validasi yang layak untuk form sungguhan.

## Dua cara input menyimpan ketikannya

Di HTML biasa, `<input>` menyimpan ketikannya sendiri — kamu baru membacanya saat perlu. Di React ada dua cara:

| Cara | Siapa pemegang nilai | Cirinya |
| --- | --- | --- |
| **Controlled** | State React | `value={teks}` + `onChange` |
| **Uncontrolled** | Input itu sendiri | `defaultValue`, dibaca saat submit |

## Controlled: state sebagai sumber kebenaran

Buka `project/components/kotak-cari.tsx`:

```tsx
const [kata, setKata] = useState("");

<input
  value={kata}
  onChange={(event) => setKata(event.target.value)}
/>
```

Setiap huruf yang diketik → `onChange` → `setKata` → render ulang → `value` diisi dari state. Nilai di layar **selalu sama** dengan isi `kata` — tidak bisa berbeda.

Karena state memegang nilainya, kamu bisa:

- membaca `kata` kapan saja tanpa menyentuh DOM — untuk filter, validasi, atau hitungan;
- mengubahnya dari kode — `setKata("")` mengosongkan kotak setelah submit sukses, seperti di `TodoForm`;
- mengontrol apa yang boleh diketik — misalnya memaksa huruf kecil.

Itulah kenapa controlled input adalah cara utama di React: **inputnya menurut pada state**, bukan sebaliknya.

## Harga yang dibayar

Setiap huruf = satu render ulang. Untuk form kecil tidak terasa — tapi untuk form besar dengan puluhan kolom, controlled input mulai terasa boros. Di situ uncontrolled berguna — kita lihat di lesson berikutnya.

## Coba di project-mu

Pasang `KotakCari` lalu tambahkan `<p>{kata}</p>` di bawah inputnya. Setiap huruf yang kamu ketik langsung tercetak di bawahnya — tanpa tombol apa pun. Itu bukti state selalu sinkron dengan input.

## Ringkasan

- ✅ Controlled input: `value` diisi dari state, `onChange` memperbarui state — state adalah sumber kebenaran.
- ✅ Uncontrolled input: `defaultValue`, input menyimpan nilainya sendiri sampai dibaca.
- ✅ Controlled dipakai saat nilai harus dipakai langsung — filter, validasi, atau reset setelah submit.

Berikutnya kita lihat cara uncontrolled — dan kapan memilihnya.
