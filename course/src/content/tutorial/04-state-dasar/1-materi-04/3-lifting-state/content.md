---
type: lesson
title: Lifting state
template: baca
previews: false
terminal: false
focus: /project/app/alat/konversi-suhu.tsx
---

# Lifting state — memindahkan state ke parent

Di lesson sebelumnya, parent menyimpan state lalu mengirimkannya ke anak. Sekarang kita punya dua komponen anak yang sama-sama perlu memakai satu nilai.

## Dua komponen perlu nilai yang sama

Bayangkan alat untuk mengubah suhu dari Celsius ke Fahrenheit. Satu kotak dipakai untuk mengetik suhu Celsius. Komponen lain menampilkan hasil Fahrenheit.

```text
KonversiSuhu (parent)
├── InputCelcius      ← tempat mengetik suhu
└── TampilFahrenheit  ← tempat melihat hasilnya
```

`InputCelcius` dan `TampilFahrenheit` adalah komponen anak dari `KonversiSuhu`.

Kalau nilai suhu disimpan di `InputCelcius`, `TampilFahrenheit` tidak bisa membacanya. Kedua komponen adalah anak yang sejajar. Props mengalir dari parent ke anak, bukan dari satu anak ke anak lainnya.

## Pindahkan state ke parent

Solusinya adalah **lifting state up** — memindahkan state dari anak ke parent yang menampilkan kedua anak itu.

Buka `project/app/alat/konversi-suhu.tsx`. State suhu disimpan di `KonversiSuhu`:

```tsx
"use client";

import { useState } from "react";
import InputCelcius from "./input-celcius";
import TampilFahrenheit from "./tampil-fahrenheit";

export default function KonversiSuhu() {
  const [celcius, setCelcius] = useState(0);

  return (
    <div>
      <InputCelcius nilai={celcius} saatBerubah={setCelcius} />
      <TampilFahrenheit celcius={celcius} />
    </div>
  );
}
```

`KonversiSuhu` mengirim nilai suhu ke dua anak:

- `InputCelcius` menerima nilai dan fungsi `setCelcius`. Saat angka diubah, fungsi itu memberi nilai baru kepada parent.
- `TampilFahrenheit` menerima nilai yang sama. Komponen ini menghitung dan menampilkan suhu Fahrenheit.

Ketik angka baru di kotak Celsius. `setCelcius` mengubah state parent. Setelah itu, React memperbarui kedua anak. Kotak menampilkan angka baru dan hasil Fahrenheit ikut berubah.

Berikut kode singkat untuk kedua anak:

```tsx
// input-celcius.tsx — menampilkan kotak untuk mengetik suhu
export default function InputCelcius({
  nilai,
  saatBerubah,
}: {
  nilai: number;
  saatBerubah: (angka: number) => void;
}) {
  return (
    <label>
      Suhu Celsius:
      <input
        type="number"
        value={nilai}
        onChange={(e) => saatBerubah(Number(e.target.value))}
      />
    </label>
  );
}
```

```tsx
// tampil-fahrenheit.tsx — menghitung dan menampilkan hasil
export default function TampilFahrenheit({ celcius }: { celcius: number }) {
  const fahrenheit = (celcius * 9) / 5 + 32;
  return <p>{celcius}°C = {fahrenheit}°F</p>;
}
```

## Di mana state sebaiknya disimpan?

Simpan state di komponen paling bawah yang menjadi parent bagi semua komponen yang memakainya.

- Kalau satu komponen saja yang perlu nilai itu, simpan state di komponen tersebut.
- Kalau parent dan anak perlu nilai itu, simpan state di parent.
- Kalau dua komponen anak perlu nilai yang sama, simpan state di parent keduanya.

Jangan membuat salinan state yang sama di beberapa komponen. Nilainya bisa berbeda dan lebih sulit diperbaiki.

Kalau data harus melewati banyak parent yang tidak memakainya, ada cara lain yang akan kita pelajari di pertemuan 05: `useContext`.

## Ringkasan

- ✅ Dua komponen anak tidak berbagi state secara langsung
- ✅ Pindahkan state ke parent yang menampilkan kedua komponen
- ✅ Parent mengirim nilai dan fungsi pengubah lewat props
- ❌ Jangan menyimpan salinan state yang sama di dua komponen

Kita sudah membahas state di satu komponen dan antar komponen. Berikutnya, kita belajar `useEffect` untuk menjalankan kode setelah komponen tampil.
