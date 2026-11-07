---
type: lesson
title: "Langkah 2: simpan Todo"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 2: simpan Todo di browser

Saat ini, Context menyimpan daftar selama aplikasi berjalan. Jika halaman dimuat ulang, data kembali ke contoh awal. Supaya perubahan tetap ada setelah reload, kita simpan daftar ke `localStorage` — tempat penyimpanan di browser yang pernah dipakai pada tombol suka di pertemuan 04.

## Pisahkan fungsi baca dan simpan

Buka `project/lib/todo-storage.ts`:

```ts
import { TODO_STORAGE_KEY } from "@/data/todo";
import type { Todo } from "@/types/todo";

export function bacaTodo(): Todo[] | null {
  const tersimpan = localStorage.getItem(TODO_STORAGE_KEY);
  return tersimpan ? (JSON.parse(tersimpan) as Todo[]) : null;
}

export function simpanTodo(todos: Todo[]) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
```

`bacaTodo` mengambil daftar dari browser. `simpanTodo` menyimpan daftar ke browser.

Folder `lib/` dipakai untuk fungsi bantu yang dapat digunakan oleh bagian lain. Fungsi di file ini membaca atau mengubah `localStorage`, jadi fungsi tersebut berhubungan dengan browser dan bukan fungsi murni.

## Panggil fungsi dari Provider

Buka `project/contexts/todo-context.tsx`. Provider membaca daftar satu kali saat halaman mulai, lalu menyimpan daftar setiap kali berubah:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [sudahMemuat, setSudahMemuat] = useState(false);

useEffect(() => {
  const daftarTersimpan = bacaTodo();
  // localStorage baru dapat dibaca setelah komponen berjalan di browser.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setTodos(daftarTersimpan ?? TODO_AWAL);
  setSudahMemuat(true);
}, []);

useEffect(() => {
  if (!sudahMemuat) return;
  simpanTodo(todos);
}, [todos, sudahMemuat]);
```

`sudahMemuat` mencegah daftar awal yang kosong tersimpan sebelum browser selesai membaca data lama. Setelah `bacaTodo` selesai, daftar dapat disimpan.

`localStorage` hanya bisa dibaca di browser. Karena itu, halaman menampilkan "Memuat daftar tugas..." sampai Provider selesai membaca data.

## Coba di project-mu

Tambahkan fungsi di `lib/todo-storage.ts`, lalu panggil dari `TodoProvider`. Tambah atau hapus tugas, lalu muat ulang `/todo`. Pastikan perubahanmu masih terlihat.

## Ringkasan

- ✅ `lib/todo-storage.ts` memisahkan cara membaca dan menyimpan data.
- ✅ `TodoProvider` membaca data saat halaman dibuka dan menyimpannya saat daftar berubah.
- ✅ `sudahMemuat` mencegah daftar kosong menimpa simpanan lama.
- ✅ Context mempertahankan daftar saat pindah antara halaman daftar dan detail; `localStorage` mempertahankannya setelah reload.

Berikutnya, kita buat halaman detail yang membaca Todo dari Context yang sama.
