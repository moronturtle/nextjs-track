---
type: lesson
title: "Tugas: kembangkan aplikasi Todo"
template: baca
previews: false
terminal: false
editor: false
---

# Tugas: kembangkan aplikasi Todo

Teruskan project yang sama dari tugas pertemuan 01 sampai 05. Materi 06 sudah memberi kerangka aplikasi Todo. Sekarang pastikan fitur dasarnya berjalan, lalu kembangkan dengan idemu sendiri.

## Pastikan fitur dasar berjalan

- Tambah tugas, tandai selesai, dan hapus tugas.
- Simpan daftar supaya tetap ada setelah halaman dimuat ulang.
- Buka halaman detail setiap tugas dengan alamat dinamis `/todo/[id]`.
- Sediakan tautan Todo di menu umum.
- Gunakan `useMemo` untuk hasil hitungan yang sesuai, misalnya daftar setelah filter.
- Gunakan `useCallback` bila fungsi dikirim ke komponen anak yang memakai `memo`. Tidak perlu memakai hook ini pada setiap fungsi.

## Pertahankan susunan folder

```text
app/
├── layout.tsx
└── todo/
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

components/
└── menu.tsx                 ← komponen umum

contexts/todo-context.tsx
data/todo.ts
types/todo.ts
lib/todo-storage.ts
styles/todo.module.css
```

- `app/` khusus untuk alamat halaman.
- `components/` untuk komponen umum yang dipakai beberapa halaman.
- `app/todo/_components/` untuk komponen khusus Todo. Tanda `_` berarti folder ini tidak membuat alamat halaman.
- `contexts/` untuk Context, Provider, dan hook `useTodos`.
- `data/` untuk nilai tetap dan contoh data.
- `types/` untuk bentuk data TypeScript.
- `lib/` untuk fungsi bantu, termasuk fungsi baca dan simpan `localStorage`.
- `styles/` untuk CSS Module.

Project latihan ini menggunakan `app/` di root, jadi folder lainnya berada di samping `app/`. Jika project-mu menggunakan `src/app/`, letakkan folder lainnya di dalam `src/`.

Kamu boleh menambah file atau folder jika fitur yang kamu pilih memerlukannya. Pertahankan aturan dasarnya: simpan setiap bagian di tempat yang sesuai dan beri nama file yang menjelaskan isinya.

## Pilih fitur tambahanmu

Tambahkan **setidaknya satu** fitur yang kamu pilih sendiri. Kamu boleh memilih contoh berikut atau membuat ide lain:

- kelompokkan tugas dengan kategori;
- tambahkan tingkat prioritas;
- simpan tanggal batas tugas;
- cari tugas berdasarkan kata;
- tampilkan jumlah tugas selesai dan belum selesai;
- ubah warna atau tata letak aplikasi.

Jelaskan di README atau deskripsi pull request: fitur apa yang kamu buat, file mana yang menanganinya, dan kenapa kamu memilih susunan state tersebut.

## Tantangan tambahan (opsional)

Pindahkan `TodoProvider` dari `app/todo/layout.tsx` ke `app/layout.tsx`, lalu gunakan `useTodos()` di `components/menu.tsx` untuk menampilkan jumlah tugas yang belum selesai. Dengan begitu, menu umum dan halaman Todo membaca daftar dari Context yang sama.

## Periksa project

Pastikan halaman dan fitur dari tugas sebelumnya tetap berjalan. Lalu jalankan:

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
```

Jika project-mu memakai pnpm atau Yarn, gunakan perintah yang sesuai dengan project tersebut.

## Kriteria selesai

- [ ] Saya melanjutkan project yang sama dari pertemuan 01–05.
- [ ] Tambah, centang, hapus, penyimpanan, dan halaman detail Todo berjalan.
- [ ] Menu umum ada di `components/`; komponen Todo ada di `app/todo/_components/`.
- [ ] `TodoProvider` membagikan daftar ke halaman daftar dan detail.
- [ ] Data tetap, tipe data, dan style memiliki file masing-masing.
- [ ] Saya menambahkan setidaknya satu fitur pilihan sendiri.
- [ ] Halaman dan fitur dari pertemuan sebelumnya tetap berjalan.
- [ ] Saya menjelaskan fitur dan susunan file di pull request.
- [ ] Lint dan pemeriksaan TypeScript selesai tanpa error.

## Cara mengumpulkan

Kirim tugas melalui pull request di repo yang sama. Mulai dari branch utama terbaru:

```bash
git checkout main && git pull
git checkout -b tugas-06
git add .
git commit -m "Tugas 06"
git push -u origin tugas-06
```

Buat pull request dari `tugas-06` ke `main` (atau `master`), lalu tulis komentar di thread pengumpulan dengan format `[nama]_[link PR]`.

**[→ Buka thread pengumpulan tugas 06](/pengumpulan?t=tugas-06)**

Tunggu mentor menyetujui pull request. Setelah disetujui, merge pull request dan perbarui branch utama di komputermu:

```bash
git checkout main && git pull
```
