---
type: lesson
title: "Status dan error"
template: baca
previews: false
terminal: false
focus: /project/components/daftar-tugas.tsx
---

# Langkah 2: siapkan keadaan gagal

`fetch` dari lesson sebelumnya bekerja kalau semuanya lancar. Sekarang kita siapkan dua kemungkinan gagal.

## Kemungkinan 1: server menjawab, tapi jawabannya gagal

Kalau alamat API salah atau datanya tidak ada, server tetap menjawab — tapi dengan **kode status** yang menandakan gagal, misalnya `404` (tidak ditemukan) atau `500` (server bermasalah).

Di sinilah jebakan `fetch`: **404 tidak dianggap error oleh `fetch`**. Request dianggap berhasil karena jawaban memang datang — hanya isinya bukan yang kita mau. Karena itu kita memeriksa `res.ok` sendiri. `res.ok` bernilai `true` hanya untuk kode status 200–299:

```tsx
const res = await fetch("http://localhost:3001/api/todos?owner=demo");

if (!res.ok) {
  setError(`Server menjawab ${res.status}`);
  return;
}
```

## Kemungkinan 2: server tidak menjawab sama sekali

Kalau server mati atau internet putus, `fetch` benar-benar gagal — promise-nya ditolak dan melempar error. Jenis gagal inilah yang ditangkap `catch`:

```tsx
try {
  const res = await fetch("...");
  // ...
} catch {
  setError("Tidak bisa terhubung ke server");
}
```

## Tiga keadaan, tiga state

Buka `project/components/daftar-tugas.tsx` — sekarang komponennya punya tiga kemungkinan tampilan:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [sedangMemuat, setSedangMemuat] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function muat() {
    try {
      const res = await fetch("http://localhost:3001/api/todos?owner=demo");
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

Blok `finally` artinya "entah berhasil atau gagal, selalu kerjakan ini" — jadi `sedangMemuat` pasti berhenti, tidak menggantung di "Memuat..." selamanya.

## Buktikan sendiri

- Ubah alamatnya jadi `/api/todoss` (tambahan huruf s). Server menjawab `404` → layar menampilkan "Server menjawab 404".
- Matikan server API (atau ganti alamat ke `http://localhost:9999`). Request gagal → `catch` bekerja → layar menampilkan "Tidak bisa terhubung ke server".

Dua percobaan itu membuktikan dua jenis kegagalan tadi benar-benar tertangani.

## Ringkasan

- ✅ `res.ok` bernilai `true` hanya untuk status 200–299 — status 404/500 harus diperiksa sendiri.
- ✅ `catch` menangkap kegagalan yang lebih parah: server mati atau internet putus.
- ✅ `finally` memastikan loading selalu berhenti, apa pun hasilnya.
- ✅ Tiga state (`todos`, `sedangMemuat`, `error`) menutup semua kemungkinan tampilan.

Komponen kecil kita sudah kokoh. Berikutnya pola yang sama kita terapkan ke aplikasi Todo — daftarnya dibaca dari server.
