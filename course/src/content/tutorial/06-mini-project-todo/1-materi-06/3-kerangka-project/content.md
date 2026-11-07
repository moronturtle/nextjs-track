---
type: lesson
title: Pertemuan 06 — Mini Project Todo
template: baca
previews: false
terminal: false
focus: /project/app/todo/page.tsx
---

# Kenali kerangka aplikasi Todo

Sebelum mulai membuat fitur, kita siapkan tempat untuk setiap bagian project. Folder yang jelas membantu kita tahu file mana yang perlu dibuka saat ingin mengubah sesuatu.

## Susunan folder

```text
app/
├── layout.tsx                 ← halaman utama dan menu umum
├── globals.css                ← aturan tampilan dasar seluruh halaman
└── todo/
    ├── layout.tsx              ← memasang TodoProvider untuk halaman Todo
    ├── page.tsx                ← alamat /todo
    ├── [id]/
    │   └── page.tsx            ← alamat detail, misalnya /todo/12
    └── _components/
        ├── todo-app.tsx         ← pengatur tampilan fitur Todo
        ├── todo-form.tsx        ← kotak untuk menambah tugas
        ├── todo-filter.tsx      ← tombol pilihan filter
        ├── todo-list.tsx        ← daftar tugas
        ├── todo-item.tsx        ← satu tugas
        └── todo-detail.tsx      ← isi halaman detail tugas

components/
└── menu.tsx                   ← komponen umum yang dipakai beberapa halaman

contexts/
└── todo-context.tsx           ← TodoProvider dan hook useTodos
data/
└── todo.ts                    ← contoh tugas, key penyimpanan, pilihan filter
types/
└── todo.ts                    ← data yang dimiliki setiap Todo
lib/
└── todo-storage.ts            ← fungsi untuk membaca dan menyimpan Todo
styles/
└── todo.module.css            ← tampilan khusus aplikasi Todo
```

## Fungsi tiap folder

- **`app/`** menentukan alamat halaman. `page.tsx` untuk halaman daftar, sedangkan folder `[id]` untuk halaman detail.
- **`components/`** berisi komponen umum yang dipakai di beberapa halaman, seperti menu.
- **`app/todo/_components/`** berisi komponen khusus Todo. Tanda `_` di depan nama folder menandai bahwa folder ini bukan bagian dari alamat halaman.
- **`contexts/`** berisi Context, Provider, dan hook `useTodos` untuk membagikan daftar Todo ke halaman daftar dan halaman detail.
- **`data/`** berisi data awal, nama penyimpanan, dan pilihan filter yang nilainya tetap.
- **`types/`** menjelaskan isi data Todo kepada TypeScript.
- **`lib/`** berisi fungsi bantu untuk membaca dan menyimpan Todo.
- **`styles/`** berisi aturan tampilan. File berakhiran `.module.css` hanya berlaku pada komponen yang mengimpornya.

Project latihan kita memakai folder `app/` langsung di root. Kalau project-mu memakai folder `src/`, letakkan `app/`, `components/`, `contexts/`, `data/`, `types/`, `lib/`, dan `styles/` di dalam `src/`.

Perhatikan contoh di panel File. `app/todo/page.tsx` hanya memasang komponen `TodoApp`. Komponen Todo disimpan dekat route Todo karena hanya dipakai fitur tersebut.

Di tugas pertemuan 05, menu sudah dipindahkan dari `app/` ke `components/menu.tsx`. Biarkan komponen umum seperti menu di `components/`. Jangan membuat subfolder `global/` jika semua komponen di `components/` memang dipakai bersama.

## Bagi state sesuai pemakainya

- `TodoProvider` menyimpan daftar Todo supaya halaman daftar dan halaman detail bisa membaca data yang sama.
- Teks yang sedang diketik hanya dipakai oleh kotak tambah tugas. State teks cukup ada di `TodoForm`.
- Pilihan filter hanya dipakai halaman daftar. State filter cukup ada di `TodoApp`.

Context dari pertemuan 05 dipakai untuk daftar Todo yang diperlukan oleh lebih dari satu halaman. State kecil seperti teks di form dan pilihan filter tetap lokal.

## Coba di project-mu

Buat folder dan file sesuai susunan di atas. Tidak perlu mengisi semuanya sekarang. Pastikan halaman `/todo` menampilkan judul dan komponen `TodoApp`.

## Ringkasan

- ✅ `app/` menentukan alamat halaman.
- ✅ Komponen umum ada di `components/`; komponen khusus Todo ada di `app/todo/_components/`.
- ✅ Context, data, tipe, helper, dan style punya tempat masing-masing.
- ✅ `TodoProvider` berbagi daftar Todo antara halaman daftar dan halaman detail.

Berikutnya, kita isi kerangka ini dengan fitur tambah, centang, dan hapus tugas.
