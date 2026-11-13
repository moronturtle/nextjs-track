---
type: lesson
title: "Todo membaca server"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 3: sambungkan aplikasi Todo ke server

Sekarang kita pasang pola memuat, berhasil, dan gagal di aplikasi Todo. Buka `project/contexts/todo-context.tsx` — file yang menyimpan dan membagikan state Todo — lalu bandingkan dengan versi pertemuan 06.

## Baca daftar saat halaman dibuka

`TodoProvider` tidak lagi mengambil daftar dari `localStorage`. Saat halaman dibuka, `useEffect` memanggil `bacaTodos` dari `lib/todo-api.ts`. File `todo-api.ts` mengirim GET ke API dan membaca daftar Todo:

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

Context membagikan tiga nilai: `todos`, `sedangMemuat`, dan `error`. Halaman daftar dan halaman detail bisa membaca nilai yang sama lewat `useTodos()`.

`lib/todo-storage.ts` — file yang sebelumnya membaca dan menyimpan Todo di browser — serta effect `simpanTodo` tidak diperlukan lagi. Daftar sekarang datang dari API.

## Halaman ikut membaca keadaannya

Di `app/todo/_components/todo-app.tsx`, file yang menampilkan halaman daftar Todo, periksa state sebelum menampilkan daftar:

```tsx
const { todos, sedangMemuat, error } = useTodos();

if (sedangMemuat)
  return <p className={styles.note}>Memuat daftar tugas dari server...</p>;
if (error) return <p className={styles.note}>{error}</p>;
```

## Perubahan belum dikirim ke server

`tambahTodo`, `ubahSelesai`, dan `hapusTodo` masih mengubah state di browser dengan `setTodos`. Perubahan terlihat di halaman, tetapi **tidak tersimpan di server**. Setelah halaman dimuat ulang, daftar kembali ke data dari API.

Untuk saat ini, kita hanya belajar membaca data. Mengirim perubahan dengan POST, PATCH, dan DELETE akan dipelajari di pertemuan 08.

:::tip{title="Coba buktikan"}
Tambahkan tugas di halaman, lalu muat ulang. Tugas baru tidak tersimpan dan daftar kembali seperti data dari server. Ini menunjukkan bahwa aplikasi sudah membaca daftar dari API, tetapi belum mengirim perubahan ke API.
:::

## Ringkasan

- ✅ `bacaTodos` meminta data dan memeriksa jawaban API.
- ✅ `TodoProvider` mengambil daftar saat halaman dibuka.
- ✅ Context membagikan daftar, status memuat, dan pesan error ke halaman Todo.
- ✅ Tambah, ubah, dan hapus masih berlaku di browser; pertemuan 08 akan mengirimnya ke server.

Selanjutnya kerjakan quiz dan tugas. Gunakan nama sendiri pada `owner` agar daftar latihanmu terpisah dari nama lain.
