---
type: lesson
title: "Form menunggu server"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-form.tsx
---

# Langkah 2: form yang menunggu jawaban server

Mengirim data ke server tidak seketika — ada jeda antara tombol ditekan dan jawaban datang. Selama jeda itu, form yang baik memberi tahu pengguna "sedang diproses" dan melindungi dari klik ganda.

## Provider memanggil API dulu

Di `contexts/todo-context.tsx`, `tambahTodo` berubah menjadi `async`: tunggu jawaban server, **baru** ubah state dengan todo yang dibalas server:

```tsx
const tambahTodo = useCallback(async (teks: string) => {
  const todo = await api.tambahTodo(OWNER, teks);
  setTodos((daftarLama) => [...daftarLama, todo]);
}, []);
```

Perhatikan urutannya: state diubah **setelah** server menjawab sukses. Kalau server menjawab `400` atau request gagal, `api.tambahTodo` melempar error dan `setTodos` tidak pernah jalan — daftar di layar tetap sesuai isi server.

Kita juga memakai `todo` dari jawaban server, bukan membuat sendiri. `id`-nya dibuat server, jadi tidak akan bentrok dengan id buatan `Date.now()` di komputer lain.

## Form mengubah tampilannya saat mengirim

Buka `app/todo/_components/todo-form.tsx`. Sekarang `kirimForm` menjadi `async` dan punya dua state baru:

```tsx
const [sedangMengirim, setSedangMengirim] = useState(false);
const [error, setError] = useState<string | null>(null);

async function kirimForm(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const teksBersih = teks.trim();
  if (!teksBersih) return;

  setSedangMengirim(true);
  setError(null);
  try {
    await saatTambah(teksBersih);
    setTeks("");
  } catch {
    setError("Gagal menyimpan tugas. Coba lagi.");
  } finally {
    setSedangMengirim(false);
  }
}
```

- `sedangMengirim` → tombol berubah jadi "Menyimpan..." dan ikut dinonaktifkan (`disabled`), jadi tidak bisa diklik dua kali.
- `setTeks("")` hanya jalan kalau simpan berhasil — kalau gagal, ketikan pengguna tidak hilang.
- `catch` menampilkan pesan gagal — misalnya saat server menjawab `400` atau koneksi putus.

Props `saatTambah` ikut berubah tipis — sekarang mengembalikan `Promise` supaya form bisa menunggunya: `saatTambah: (teks: string) => Promise<void>`.

## Buktikan sendiri

- Tambah tugas → tombol berubah "Menyimpan..." sekejap → tugas muncul → refresh, **tugasnya tetap ada**. Itu bukti datanya sudah tersimpan di server.
- Buka DevTools → Network → ubah throttling ke "Slow 3G" → tambah tugas lagi. Sekarang jeda "Menyimpan..." terasa — inilah kenapa state `sedangMengirim` penting.
- Matikan server API → tambah tugas → pesan "Gagal menyimpan tugas" tampil dan ketikanmu masih utuh di kotak.

## Ringkasan

- ✅ Urutan aman: kirim ke server → sukses → baru ubah state dengan data dari server.
- ✅ `sedangMengirim` memberi tanda proses dan mencegah klik ganda.
- ✅ Error di `catch` → ketikan pengguna diselamatkan, pesan ditampilkan.
- ✅ `id` dibuat server — kita tidak perlu `Date.now()` lagi.

Tinggal dua tombol yang masih lokal: centang dan hapus. Berikutnya kita sambungkan keduanya dengan PATCH dan DELETE.
