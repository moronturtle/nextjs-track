---
type: lesson
title: Lifting state
template: baca
previews: false
terminal: false
focus: /project/app/alat/konversi-suhu.tsx
---

# Lifting state — menaikkan state ke parent

Lesson sebelumnya: state ada di parent, dibagi ke anak lewat props. Sekarang kasus yang lebih umum: **dua komponen sejajar** — bukan parent-anak — butuh data yang sama.

## Masalahnya

Bayangkan alat konversi suhu. Ada komponen input untuk mengetik Celcius, dan komponen lain yang menampilkan hasil dalam Fahrenheit:

```text
KonversiSuhu (parent)
├── InputCelcius      ← mengetik angka di sini
└── TampilFahrenheit  ← hasil konversi tampil di sini
```

Kalau state `celcius` disimpan di dalam `InputCelcius`, `TampilFahrenheit` tidak bisa membacanya. Props hanya mengalir turun ke anak — tidak bisa menyamping ke komponen saudara. Dua komponen sejajar tidak bisa saling membaca state.

## Solusinya: naikkan ke parent bersama

Jawabannya adalah **lifting state up** — "menaikkan state ke atas". Pindahkan `useState` ke parent yang membungkus kedua komponen, lalu bagi lewat props seperti biasa:

- `InputCelcius` menerima `nilai` dan `saatBerubah` → mengetik memanggil callback ke parent.
- `TampilFahrenheit` menerima `celcius` → langsung menghitung hasilnya.

Buka `project/app/alat/konversi-suhu.tsx` — parent yang memegang state-nya:

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

Sekarang mengetik di `InputCelcius` mengubah state parent → kedua komponen ditampilkan ulang → `TampilFahrenheit` langsung menunjukkan hasil konversi terbaru. Satu state untuk dua komponen — tidak ada data kembar yang isinya bisa berbeda.

Dua anaknya sederhana — hanya menerima props:

```tsx
// input-celcius.tsx — memberi kabar ke atas lewat callback
export default function InputCelcius({
  nilai,
  saatBerubah,
}: {
  nilai: number;
  saatBerubah: (n: number) => void;
}) {
  return (
    <input
      type="number"
      value={nilai}
      onChange={(e) => saatBerubah(Number(e.target.value))}
      className="rounded-lg border px-4 py-2"
    />
  );
}
```

```tsx
// tampil-fahrenheit.tsx — hanya membaca props
export default function TampilFahrenheit({ celcius }: { celcius: number }) {
  const fahrenheit = (celcius * 9) / 5 + 32;
  return <p className="mt-2">{celcius}°C = {fahrenheit}°F</p>;
}
```

## Kapan state perlu dinaikkan?

Patokannya sederhana: **letakkan state di komponen paling bawah yang masih membungkus semua pemakainya.**

- Dipakai satu komponen saja → state di komponen itu (seperti `LikeButton` di lesson 1).
- Dipakai anak-anaknya → state di parent (seperti `DaftarTulisan`).
- Dipakai dua komponen sejajar → state di parent bersama, dibagi lewat props.

Ada batasnya juga. Kalau state harus melewati lima lapis komponen yang sebenarnya tidak membutuhkannya, props jadi operan panjang yang melelahkan. Masalah itu dijawab di pertemuan 05 dengan `useContext`.

## Ringkasan

- ✅ Dua komponen sejajar tidak bisa berbagi state langsung — props hanya mengalir turun
- ✅ Lifting state up = pindahkan `useState` ke parent bersama, lalu bagi nilai dan `set`-nya lewat props
- ✅ Satu sumber data di parent = dua tampilan selalu sama
- ❌ Jangan menyalin state yang sama di dua komponen — isinya bisa berbeda dan sulit dilacak

Tiga cara mengatur state sudah kamu kuasai. Satu hook lagi untuk melengkapi dasar-dasarnya: `useEffect`.
