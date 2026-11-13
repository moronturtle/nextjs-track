---
type: lesson
title: "Status dan error"
template: baca
previews: false
terminal: false
focus: /project/components/daftar-tugas.tsx
---

# Langkah 2: tampilkan pesan error

Pada lesson sebelumnya, kita menampilkan daftar saat request berhasil. Sekarang kita tangani dua keadaan saat request gagal.

## Keadaan 1: server menjawab dengan status error

Server bisa menjawab dengan **kode status** yang menunjukkan masalah. Contohnya, `404` berarti data tidak ditemukan dan `500` berarti server mengalami masalah.

`fetch` tetap menerima jawaban `404` sebagai response. Karena itu, kita perlu memeriksa `res.ok`. Nilainya `true` jika status berada di antara `200` sampai `299`:

```tsx
const res = await fetch(
  "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
);

if (!res.ok) {
  setError(`Server menjawab ${res.status}`);
  return;
}
```

## Keadaan 2: browser tidak mendapat jawaban

Jika server tidak bisa dihubungi, misalnya karena koneksi terputus, `fetch` melempar error. Blok `catch` menangani keadaan ini:

```tsx
try {
  const res = await fetch("...");
  // ...
} catch {
  setError("Tidak bisa terhubung ke server");
}
```

## Tiga keadaan di halaman

Buka `project/components/daftar-tugas.tsx` — file komponen daftar tugas. Sekarang ada tiga kemungkinan tampilan: sedang memuat, gagal, atau berhasil:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [sedangMemuat, setSedangMemuat] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function muat() {
    try {
      const res = await fetch(
        "https://nextjs-track-api.vercel.app/api/todos?owner=demo",
      );
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

Blok `finally` selalu dijalankan setelah proses selesai, baik berhasil maupun gagal. Karena itu, `sedangMemuat` akan berubah menjadi `false`.

## Buktikan sendiri

- Untuk menguji status `404`, ubah alamat menjadi `https://nextjs-track-api.vercel.app/api/todos/999999999999?owner=demo`. Server menjawab `404`, lalu halaman menampilkan status tersebut.
- Untuk menguji `catch`, ubah sementara alamat API menjadi `http://localhost:9999`. Tidak ada server latihan di alamat itu, jadi browser menampilkan pesan "Tidak bisa terhubung ke server". Kembalikan alamat API setelah mencoba.

Kedua percobaan ini menunjukkan perbedaan antara server yang menjawab error dan server yang tidak bisa dihubungi.

## Ringkasan

- ✅ Periksa `res.ok` untuk mengetahui apakah server menjawab dengan status berhasil.
- ✅ `catch` menangani keadaan saat browser tidak mendapat jawaban.
- ✅ `finally` menghentikan tampilan loading setelah request selesai.
- ✅ State `todos`, `sedangMemuat`, dan `error` mengatur tampilan berhasil, memuat, dan gagal.

Berikutnya, kita pakai pola yang sama di aplikasi Todo agar daftar tugas dibaca dari server.
