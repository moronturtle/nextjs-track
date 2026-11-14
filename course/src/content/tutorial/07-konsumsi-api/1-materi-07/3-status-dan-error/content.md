---
type: lesson
title: "Menangani status dan error"
template: baca
previews: false
terminal: false
focus: /project/components/daftar-tugas.tsx
---

# Langkah 2: tampilkan pesan saat gagal

Pada langkah sebelumnya, kita menampilkan daftar setelah berhasil mengambil data. Sekarang kita tangani dua keadaan saat pengambilan data gagal.

## Keadaan 1: server mengirim status gagal

Server tetap bisa mengirim jawaban meskipun terjadi masalah. Jawaban itu memiliki **kode status**. Contohnya, `404` berarti data tidak ditemukan dan `500` berarti server mengalami masalah.

Jika server mengirim status `404`, `fetch` tetap menerima jawaban tersebut. Jadi, kita perlu memeriksa `res.ok`. Nilainya `true` jika status menunjukkan keberhasilan, yaitu `200` sampai `299`:

```tsx
const res = await fetch("https://nextjs-track-api.vercel.app/api/todos");

if (!res.ok) {
  setError(`Server menjawab ${res.status}`);
  return;
}
```

## Keadaan 2: browser tidak menerima jawaban

Jika server tidak bisa dihubungi, misalnya karena koneksi internet terputus atau alamatnya salah, `fetch` gagal dan menjalankan blok `catch`:

```tsx
try {
  const res = await fetch("...");
  // ...
} catch {
  setError("Tidak bisa terhubung ke server");
}
```

## Tiga tampilan di halaman

Buka `project/components/daftar-tugas.tsx` — file yang menampilkan daftar tugas. Komponen ini mengatur tiga tampilan: sedang memuat, gagal, atau berhasil:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [sedangMemuat, setSedangMemuat] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function muat() {
    try {
      const res = await fetch("https://nextjs-track-api.vercel.app/api/todos");
      if (!res.ok) {
        setError(`Server menjawab ${res.status}`);
        return;
      }
      const data = await res.json();
      setTodos(data.todos);
    } catch {
      setError("Tidak bisa terhubung ke server");
    } finally {
      setSedangMemuat(false);
    }
  }
  muat();
}, []);

if (sedangMemuat) return <p>Memuat daftar tugas...</p>;
if (error) return <p>{error}</p>;
```

Blok `finally` selalu dijalankan setelah proses selesai, baik pengambilan data berhasil maupun gagal. Karena itu, `sedangMemuat` akan berubah menjadi `false`.

## Buktikan sendiri

- Untuk melihat status `404`, ubah alamat menjadi `https://nextjs-track-api.vercel.app/api/todos/999999999999`. Server akan menjawab bahwa Todo tidak ditemukan, lalu halaman menampilkan status `404`.
- Untuk mencoba `catch`, ubah sementara alamat API menjadi `http://localhost:9999`. Tidak ada server di alamat tersebut, jadi halaman menampilkan pesan "Tidak bisa terhubung ke server". Setelah mencoba, kembalikan alamat API yang benar.

Kedua percobaan ini menunjukkan bedanya server yang mengirim status gagal dengan server yang tidak bisa dihubungi.

## Ringkasan

- ✅ Periksa `res.ok` untuk mengetahui apakah pengambilan data berhasil.
- ✅ `catch` menangani keadaan saat browser tidak menerima jawaban dari server.
- ✅ `finally` menghentikan tampilan loading setelah proses selesai.
- ✅ State `todos`, `sedangMemuat`, dan `error` mengatur tampilan berhasil, memuat, dan gagal.

Berikutnya, kita pakai pola yang sama agar aplikasi Todo mengambil daftar tugas dari server.
