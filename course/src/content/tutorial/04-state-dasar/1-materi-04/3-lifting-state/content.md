---
type: lesson
title: Lifting state
template: baca
previews: false
terminal: false
focus: /project/app/alat/konversi-suhu.tsx
---

# Lifting state — mengangkat state ke parent

Lesson sebelumnya: state tinggal di parent, dibagi ke anak lewat props. Sekarang skenario yang lebih umum: **dua komponen sejajar** — bukan parent-anak — butuh data yang sama.

## Masalahnya

Bayangkan alat konversi suhu. Ada komponen input untuk mengetik Celcius, dan komponen terpisah yang menampilkan hasil dalam Fahrenheit:

```text
KonversiSuhu (parent)
├── InputCelcius      ← mengetik angka di sini
└── TampilFahrenheit  ← hasil konversi tampil di sini
```

Kalau state `celcius` disimpan di dalam `InputCelcius`, `TampilFahrenheit` tidak bisa membacanya — props hanya mengalir turun, tidak menyamping ke saudara. React tidak punya cara untuk dua komponen sejajar saling membaca state.

## Solusinya: angkat ke parent bersama

Jawabannya adalah **lifting state up** — "mengangkat state ke atas". Pindahkan `useState` ke parent terdekat yang membungkus keduanya, lalu bagi lewat props seperti biasa:

- `InputCelcius` menerima `nilai` + `saatBerubah` → mengetik memanggil callback ke parent.
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

Sekarang mengetik di `InputCelcius` mengubah state parent → kedua komponen digambar ulang → `TampilFahrenheit` langsung menampilkan konversi terbaru. Satu state, dua komponen yang sinkron — tidak ada data kembar yang bisa berbeda isinya.

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

## Kapan mengangkat state?

Patokan praktisnya: **letakkan state di komponen terendah yang masih membungkus semua pemakainya.**

- Dipakai satu komponen saja → state di komponen itu (seperti `LikeButton` di lesson 1).
- Dipakai anak-anaknya → state di parent (seperti `DaftarTulisan`).
- Dipakai dua komponen sejajar → state di parent bersama, dibagi lewat props.

Mengangkat terlalu tinggi juga ada batasnya — kalau state harus menembus lima lapis komponen yang tidak membutuhkannya, props jadi "estafet" yang melelahkan. Masalah itu dijawab di pertemuan 05 dengan `useContext`.

## Ringkasan

- ✅ Dua komponen sejajar tidak bisa berbagi state langsung — props hanya mengalir turun
- ✅ Lifting state up = pindahkan `useState` ke parent bersama, bagi nilai dan `set`-nya lewat props
- ✅ Satu sumber data di parent = dua tampilan selalu sinkron
- ❌ Jangan duplikasi state yang sama di dua komponen — isinya bisa berbeda dan sulit dilacak

Tiga cara mengatur state sudah kamu kuasai. Satu hook lagi untuk melengkapi dasar-dasarnya: `useEffect` — untuk sinkronisasi ke dunia di luar React.
