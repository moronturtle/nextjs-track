---
type: lesson
title: "Todo membaca server"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 3: Todo membaca dari server

Sekarang pola tiga keadaan tadi kita pasang di aplikasi Todo. Buka `project/contexts/todo-context.tsx` di panel File dan bandingkan dengan versi pertemuan 06.

## Yang berubah

`TodoProvider` tidak lagi membaca `localStorage`. Sekarang `useEffect`-nya memanggil `bacaTodos` dari `lib/todo-api.ts`:

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

Tiga keadaan yang tadi sekarang tinggal di Context: `todos`, `sedangMemuat`, dan `error`. Karena ketiganya dibagikan lewat `useTodos()`, halaman daftar **dan** halaman detail sama-sama tahu kalau data belum datang atau gagal dimuat.

`lib/todo-storage.ts` dan efek `simpanTodo` boleh dihapus — `localStorage` sudah tidak dipakai.

## Halaman ikut membaca keadaannya

Di `app/todo/_components/todo-app.tsx`, dua baris pengecekan menangani tiga kemungkinan:

```tsx
const { todos, sedangMemuat, error } = useTodos();

if (sedangMemuat) return <p className={styles.note}>Memuat daftar tugas dari server...</p>;
if (error) return <p className={styles.note}>{error}</p>;
```

## Yang belum berubah — dan memang sengaja

`tambahTodo`, `ubahSelesai`, dan `hapusTodo` masih mengubah state lokal dengan `setTodos` — persis seperti pertemuan 06, tanpa `localStorage`. Artinya perubahanmu terlihat di layar, tapi **hilang setelah reload** karena belum dikirim ke server.

Ini disengaja: mengirim perubahan ke server (POST, PATCH, DELETE) adalah materi pertemuan 08. Untuk sekarang, yang penting daftarnya berhasil dibaca dari server.

:::tip{title="Coba buktikan"}
Tambah satu tugas, lalu refresh halaman. Tugas barumu hilang dan daftar kembali ke isi server — itu bukti daftar sekarang sungguh dibaca dari server, bukan dari browser.
:::

## Ringkasan

- ✅ `bacaTodos` di `lib/todo-api.ts` membungkus `fetch` + `res.ok` + `res.json()`.
- ✅ `TodoProvider` memuat daftar dari server saat halaman dibuka.
- ✅ `sedangMemuat` dan `error` dibagikan lewat Context ke semua halaman Todo.
- ✅ Mutasi sengaja masih lokal — pertemuan 08 yang menyambungkannya ke server.

Selanjutnya kerjakan quiz, lalu tugas — kamu akan menyambungkan project-mu ke API latihan dengan `owner` namamu sendiri.
