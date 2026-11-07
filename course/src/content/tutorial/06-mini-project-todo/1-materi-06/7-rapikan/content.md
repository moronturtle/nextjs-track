---
type: lesson
title: "Langkah 4: filter dan rapikan project"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-app.tsx
---

# Langkah 4: filter dan rapikan project

Fitur utama sudah berjalan. Sekarang kita tambahkan filter dan pastikan setiap file ada di folder yang sesuai.

## Filter Todo memakai `useMemo`

`TodoApp` membaca daftar dari Context dan menyimpan pilihan filter secara lokal. `useMemo` menghitung tugas yang cocok dengan pilihan:

```tsx
const todosTampil = useMemo(() => {
  if (filter === "belum") return todos.filter((todo) => !todo.selesai);
  if (filter === "selesai") return todos.filter((todo) => todo.selesai);
  return todos;
}, [todos, filter]);
```

React menghitung daftar yang ditampilkan lagi jika daftar Todo atau pilihan filter berubah. Jika keduanya belum berubah, React dapat memakai hasil sebelumnya.

## Komponen umum dan komponen lokal

Komponen menu dipakai di beberapa halaman, jadi letakkan di `components/menu.tsx`. Komponen yang hanya dipakai fitur Todo disimpan dekat halaman Todo, di dalam `app/todo/_components/`:

```text
components/
└── menu.tsx

app/todo/
├── layout.tsx
├── page.tsx
├── [id]/page.tsx
└── _components/
    ├── todo-app.tsx
    ├── todo-form.tsx
    ├── todo-filter.tsx
    ├── todo-list.tsx
    ├── todo-item.tsx
    └── todo-detail.tsx
```

Awalan `_` pada `_components/` menandai folder untuk file bantu. Next.js tidak membuat alamat halaman dari folder tersebut.

## Tempat Context, data, tipe, dan helper

```text
contexts/todo-context.tsx  → TodoProvider dan hook useTodos
data/todo.ts               → data awal, key penyimpanan, pilihan filter
types/todo.ts              → tipe Todo dan filter
lib/todo-storage.ts        → fungsi baca dan simpan localStorage
styles/todo.module.css     → style khusus aplikasi Todo
```

- `TodoProvider` dipasang di `app/todo/layout.tsx`, sehingga halaman daftar dan detail dapat membaca daftar Todo yang sama.
- `data/` menyimpan nilai tetap. `types/` menjelaskan isi data Todo.
- `lib/` mengelompokkan fungsi bantu. Fungsi `bacaTodo` dan `simpanTodo` mengakses `localStorage`, jadi keduanya berhubungan dengan browser dan bukan fungsi murni.
- `styles/todo.module.css` menyimpan aturan tampilan. Nama class dari CSS Module hanya berlaku di file yang mengimpornya.

Kalau project-mu memakai folder `src/`, letakkan folder-folder tersebut di dalam `src/`. Project latihan kita memakai `app/` langsung di root, jadi folder lainnya berada di samping `app/`.

## Cek hasil project

Pastikan menu umum punya tautan `/todo`. Coba filter **Semua**, **Belum selesai**, dan **Selesai**. Hapus semua tugas, lalu pastikan pesan saat daftar kosong muncul. Muat ulang halaman dan pastikan daftar tetap tersimpan.

## Ringkasan

- ✅ Komponen yang dipakai bersama ada di `components/`.
- ✅ Komponen khusus Todo ada di `app/todo/_components/`.
- ✅ `TodoProvider` membagikan data ke halaman daftar dan detail.
- ✅ Data, tipe, helper, dan style punya folder masing-masing.
- ✅ `useMemo` menghitung daftar sesuai pilihan filter.

Kerangka aplikasi sudah lengkap. Di tugas, pilih sendiri fitur tambahan yang ingin kamu buat.
