---
type: lesson
title: "Kenalan dengan Redux Toolkit"
template: baca
previews: false
terminal: false
focus: /project/app/favorit-slice.ts
---

# Redux Toolkit — global state versi library

Context dari dua lesson sebelumnya sudah cukup untuk project seukuran tugasmu. Tapi di project besar — atau saat membaca kode kantoran — kamu akan sering menemukan **Redux**: library paling terkenal untuk global state di React.

Lesson ini pengenalan polanya saja. Kabar baiknya: konsepnya sudah kamu kenal — Provider, satu sumber data, komponen pembaca. Yang baru hanya istilahnya.

## Cara berpikirnya sedikit berbeda

Di Context, state tinggal di Provider dan komponen memanggil `set`-nya langsung. Di Redux:

- Semua state tinggal di satu **store** — "gudang" data pusat di luar komponen.
- Komponen tidak mengubah store langsung. Komponen mengirim **action** — perintah berbentuk objek seperti `{ type: "favorit/toggle", payload: "belajar-nextjs" }` — dan **reducer** di dalam store yang mengubah datanya.

Pemisahan ini yang membuat perubahan state di Redux bisa dilacak rapi — setiap perubahan lewat satu pintu yang sama.

Untuk memakainya, pasang dua paket (Redux Toolkit adalah cara resmi menulis Redux sekarang; `react-redux` menghubungkannya ke React):

```bash
npm install @reduxjs/toolkit react-redux
```

## Tiga file, tiga peran

### 1. Slice — satu potongan state + aturan mainnya

"Slice" = irisan store untuk satu fitur. Buka `project/app/favorit-slice.ts`:

```ts
import { createSlice } from "@reduxjs/toolkit";

const favoritSlice = createSlice({
  name: "favorit",
  initialState: [] as string[],
  reducers: {
    toggle(state, action: { payload: string }) {
      const slug = action.payload;
      const i = state.indexOf(slug);
      if (i >= 0) state.splice(i, 1);
      else state.push(slug);
    },
  },
});

export const { toggle } = favoritSlice.actions;
export default favoritSlice.reducer;
```

Bagian `reducers` berisi fungsi-fungsi pengubah. Setiap fungsi di sana otomatis menjadi action yang bisa dikirim komponen — `toggle` di atas adalah reducer sekaligus action `toggle(slug)`.

:::info{title="Kok boleh state.push langsung?"}
Ingat aturan `useState`: jangan mengubah array yang ada, selalu buat yang baru. Di dalam slice Redux Toolkit, aturan itu longgar — `state.push` dan `state.splice` boleh ditulis apa adanya. Redux Toolkit memakai **Immer**, yang diam-diam menerjemahkan tulisan "seolah mengubah" menjadi pembuatan data baru yang aman.
:::

### 2. Store — gudang yang menggabungkan semua slice

`project/app/store.ts`:

```ts
import { configureStore } from "@reduxjs/toolkit";
import favoritReducer from "./favorit-slice";

export const store = configureStore({
  reducer: { favorit: favoritReducer },
});

export type RootState = ReturnType<typeof store.getState>;
```

Semua slice didaftarkan di sini. `RootState` adalah tipe TypeScript untuk "bentuk seluruh isi store" — dipakai saat membaca data nanti.

### 3. Provider — jembatan ke komponen

Sama seperti `TemaProvider`, tapi bawaan `react-redux`. `project/app/providers.tsx`:

```tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

Pasang `<Providers>` di `app/layout.tsx` membungkus `{children}` — posisinya persis seperti Provider context kemarin.

## Membaca dan mengubah dari komponen

`project/app/tombol-favorit.tsx` — fungsinya sama dengan versi Context, beda cara bacanya:

```tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./favorit-slice";
import type { RootState } from "./store";

export default function TombolFavorit({ slug }: { slug: string }) {
  const aktif = useSelector((s: RootState) => s.favorit.includes(slug));
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggle(slug))}
      className="rounded-lg border px-4 py-2"
    >
      {aktif ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
```

- **`useSelector(fn)`** — "pilih bagian store yang mau dibaca". Mirip `useContext`: saat bagian itu berubah, komponen ikut digambar ulang.
- **`useDispatch()`** — mengambil fungsi pengirim perintah. `dispatch(toggle(slug))` mengirim action ke store; reducer `toggle` di slice yang mengubah datanya.

## Redux atau Context?

| | Context bawaan | Redux Toolkit |
|---|---|---|
| Instal | Sudah ada di React | Perlu dua paket tambahan |
| Cocok untuk | Global state sederhana: tema, favorit, user | Banyak state saling terkait; perubahan perlu dilacak rapi |
| Yang dipelajari | `createContext`, `Provider`, `useContext` | store, slice, action, `dispatch`, `useSelector` |

Patokan praktis: **mulai dengan Context**. Kalau nanti global state-mu tumbuh banyak dan susah dilacak, barulah Redux masuk akal — dan polanya sudah kamu kenal dari sini. Ada juga **Zustand**, alternatif yang lebih ringkas dari Redux untuk kebutuhan serupa.

## Ringkasan

- ✅ Redux = store pusat + slice (potongan state + aturan ubahnya); komponen mengirim **action** lewat `dispatch`
- ✅ Baca dengan `useSelector`, ubah dengan `dispatch(action)` — `Provider` dari `react-redux` dipasang di layout
- ✅ Redux Toolkit (`createSlice`, `configureStore`) adalah cara resmi menulis Redux sekarang
- ❌ Jangan langsung meraih Redux untuk state kecil — Context dulu, Redux saat state global benar-benar kompleks

Materi pertemuan 05 selesai. Saatnya quiz, lalu lanjutkan project-mu di tugas.
