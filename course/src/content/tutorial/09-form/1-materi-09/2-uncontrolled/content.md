---
type: lesson
title: "Uncontrolled input"
template: baca
previews: false
terminal: false
focus: /project/components/form-tamu.tsx
---

# Uncontrolled: baca nilainya saat submit

Buka `project/components/form-tamu.tsx` — form ini tidak punya `useState` untuk input sama sekali:

```tsx
"use client";

import type { FormEvent } from "react";

export default function FormTamu() {
  function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nama = data.get("nama");
    const pesan = data.get("pesan");
    alert(`Halo ${nama}, pesanmu: ${pesan}`);
  }

  return (
    <form onSubmit={kirim}>
      <input name="nama" defaultValue="" placeholder="Nama" />
      <textarea name="pesan" defaultValue="" placeholder="Pesan" />
      <button type="submit">Kirim</button>
    </form>
  );
}
```

## Cara kerjanya

- `defaultValue` hanya mengisi nilai awal — setelah itu input menyimpan ketikannya sendiri. React tidak tahu dan tidak perlu tahu isinya saat mengetik.
- Saat submit, `new FormData(event.currentTarget)` membaca **semua** input berdasarkan atribut `name`-nya sekaligus — `data.get("nama")`, `data.get("pesan")`.

Tidak ada `useState`, tidak ada `onChange`, tidak ada render ulang saat mengetik. Formnya berjalan seperti form HTML biasa — React baru ikut campur di satu titik: submit.

## Kapan memilih yang mana?

| Kebutuhan | Pilihan |
| --- | --- |
| Nilai dipakai langsung — filter daftar, hitung sisa karakter, validasi saat mengetik | Controlled |
| Nilai harus diubah dari kode — kosongkan setelah submit sukses | Controlled |
| Form hanya dibaca saat submit — login, pendaftaran, form kontak | Uncontrolled boleh |
| Form besar yang lambat karena terlalu banyak render | Uncontrolled membantu |

Untuk project kita, controlled tetap menjadi kebiasaan — filter dan validasi di Todo memerlukannya. Tapi sekarang kamu tahu ada pilihan lain dan kapan masuk akalnya.

:::tip{title="useRef: jalan tengah"}
Ada cara ketiga membaca input tanpa state: `useRef` — `const inputRef = useRef<HTMLInputElement>(null)`, lalu `inputRef.current?.value` saat submit. Hasilnya mirip FormData tapi per input. Untuk sekarang cukup tahu ada; FormData sudah cukup untuk form seperti di atas.
:::

## Ringkasan

- ✅ Uncontrolled: `defaultValue` + `FormData` — input menyimpan nilainya sendiri, dibaca sekali saat submit.
- ✅ Tidak ada render ulang saat mengetik — cocok untuk form yang hanya dibaca saat submit.
- ✅ Controlled tetap pilihan utama kalau nilai dipakai langsung atau diubah dari kode.

Baik controlled maupun uncontrolled, form yang dikirim orang harus diperiksa dulu. Berikutnya: validasi.
