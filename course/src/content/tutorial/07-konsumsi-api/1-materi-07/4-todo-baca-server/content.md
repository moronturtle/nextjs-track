---
type: lesson
title: "Mengambil Todo dari server"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 3: ambil daftar Todo dari server

Sekarang kita gunakan pola memuat, berhasil, dan gagal di aplikasi Todo. Buka `project/contexts/todo-context.tsx` — file yang menyimpan dan membagikan data Todo — lalu bandingkan dengan versi pertemuan 06.

## Ambil daftar saat halaman dibuka

`TodoProvider` tidak lagi mengambil daftar dari `localStorage`. Saat halaman dibuka, `useEffect` memanggil fungsi `bacaTodos` dari `lib/todo-api.ts`. File `todo-api.ts` mengirim permintaan GET ke API dan mengembalikan daftar Todo:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [sedangMemuat, setSedangMemuat] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function muat() {
    try {
      const daftar = await bacaTodos("demo"); // ganti "demo" dengan namamu
      setTodos(daftar);
    } catch {
      setError("Gagal memuat daftar tugas dari server");
    } finally {
      setSedangMemuat(false);
    }
  }
  muat();
}, []);
```

Context membagikan tiga nilai: daftar `todos`, status `sedangMemuat`, dan pesan `error`. Halaman daftar dan halaman detail mengambil nilai yang sama lewat `useTodos()`.

`lib/todo-storage.ts` adalah file yang sebelumnya mengambil dan menyimpan Todo di browser. File itu dan effect `simpanTodo` tidak diperlukan lagi karena daftar sekarang diambil dari API.

## Tampilkan status di halaman

Di `app/todo/_components/todo-app.tsx` — file yang menampilkan halaman daftar Todo — periksa status sebelum menampilkan daftar:

```tsx
const { todos, sedangMemuat, error } = useTodos();

if (sedangMemuat)
  return <p className={styles.note}>Memuat daftar tugas dari server...</p>;
if (error) return <p className={styles.note}>{error}</p>;
```

## Perubahan Todo belum dikirim ke server

Fungsi `tambahTodo`, `ubahSelesai`, dan `hapusTodo` masih mengubah data di browser dengan `setTodos`. Perubahan terlihat di halaman, tetapi **belum tersimpan di server**. Setelah halaman dimuat ulang, daftar kembali seperti data yang diambil dari API.

Di pertemuan ini, kita hanya belajar mengambil data. Cara mengirim perubahan dengan POST, PATCH, dan DELETE akan dipelajari di pertemuan 08.

:::tip{title="Coba buktikan"}
Tambahkan tugas di halaman, lalu muat ulang. Tugas baru belum tersimpan dan daftar kembali seperti data dari server. Ini membuktikan bahwa aplikasi mengambil daftar dari API, tetapi belum mengirim perubahan ke API.
:::

## Ringkasan

- ✅ `bacaTodos` mengambil daftar Todo dan memeriksa jawaban API.
- ✅ `TodoProvider` mengambil daftar saat halaman dibuka.
- ✅ Context membagikan daftar, status memuat, dan pesan error ke halaman Todo.
- ✅ Tambah, ubah, dan hapus Todo baru mengubah data di browser. Di pertemuan 08, perubahan tersebut akan dikirim ke server.

Selanjutnya, kerjakan quiz dan tugas. Isi `owner` dengan namamu agar daftar Todo-mu terpisah dari daftar murid lain.
