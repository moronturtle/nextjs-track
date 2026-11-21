---
type: lesson
title: "Form menunggu jawaban API"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-form.tsx
---

# Langkah 2: hubungkan form dengan API

Di lesson sebelumnya, kita sudah menambahkan fungsi `tambahTodo` untuk mengirim Todo baru ke server. Sekarang kita sambungkan fungsi `tambahTodo` dengan form.

Ketika kamu menekan tombol tambah, request membutuhkan waktu untuk sampai ke server dan kembali. Selama menunggu, form perlu memberi tanda bahwa permintaan sedang diproses. Form juga perlu mencegah kamu menekan tombol berkali-kali untuk request yang sama.

Kalau API menolak request, teks yang sudah kamu ketik harus tetap ada di form. Kamu tidak perlu mengetik ulang hanya karena server gagal menyimpan Todo.

## Validasi dasar dengan HTML

HTML sudah menyediakan validasi sederhana. Atribut `required` menolak input kosong, sedangkan `minLength` mengatur jumlah karakter minimum:

```tsx
<input
  name="teks"
  required
  minLength={3}
  value={teks}
  onChange={(event) => setTeks(event.target.value)}
/>
```

Browser akan menghentikan submit jika aturan validasi belum terpenuhi. Validasi HTML cocok untuk form kecil dan menjadi lapisan awal yang praktis.

:::tip
Pesan validasi bawaan browser bergantung pada bahasa dan pengaturan browser. Di lesson 4, kita akan memakai React Hook Form agar pesan error lebih konsisten dan mudah diatur.
:::

## Tunggu request sebelum mengubah daftar Todo

Pada `TodoProvider`, tunggu API membalas sukses sebelum menambahkan Todo ke state:

```tsx
const tambahTodo = useCallback(async (teks: string) => {
  const todo = await api.tambahTodo(OWNER, teks);
  setTodos((daftarLama) => [...daftarLama, todo]);
}, []);
```

Todo yang dimasukkan ke state berasal dari respons API. Dengan begitu, aplikasi memakai `id` yang dibuat server, bukan membuat `id` sendiri di browser.

Di `todo-form.tsx`, buat state untuk mengetahui apakah request sedang berjalan dan untuk menyimpan pesan error:

```tsx
const [sedangMengirim, setSedangMengirim] = useState(false);
const [error, setError] = useState<string | null>(null);

async function kirimForm(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const teksBersih = teks.trim();
  if (teksBersih.length < 3) {
    setError("Todo minimal 3 karakter.");
    return;
  }

  setSedangMengirim(true);
  setError(null);

  try {
    await saatTambah(teksBersih);
    setTeks("");
  } catch (error) {
    setError(error instanceof Error ? error.message : "Gagal menyimpan Todo.");
  } finally {
    setSedangMengirim(false);
  }
}
```

Pasang validasi HTML dan status pengiriman pada elemen form:

```tsx
<form onSubmit={kirimForm}>
  <input
    value={teks}
    onChange={(event) => setTeks(event.target.value)}
    required
    minLength={3}
    disabled={sedangMengirim}
    aria-label="Todo baru"
  />
  <button type="submit" disabled={sedangMengirim}>
    {sedangMengirim ? "Mengirim..." : "Tambah"}
  </button>
  {error && <p role="alert">{error}</p>}
</form>
```

`setTeks("")` hanya berjalan setelah API berhasil menyimpan Todo. Jika API menolak request atau koneksi terputus, teks tetap ada dan pesan error ditampilkan.

## Validasi di browser dan di server

Validasi di browser membantu kamu memperbaiki input sebelum request dikirim. Namun, request tetap bisa dikirim langsung ke API tanpa melewati form. Karena itu API juga memeriksa teks dan membalas `400` jika teks kurang dari 3 karakter.

Validasi browser memberi petunjuk cepat saat mengisi form. Validasi API adalah pemeriksaan terakhir sebelum data disimpan.

## Buktikan alurnya

- Isi teks dengan 1 karakter lalu submit. Browser menghentikan submit karena `minLength`.
- Isi Todo yang valid. Tombol menampilkan "Mengirim..." selama request berjalan.
- Setelah API membalas sukses, Todo muncul. Refresh halaman dan pastikan Todo tetap ada.
- Coba kirim request dengan teks pendek lewat tab Network. API tetap menolak dengan status `400`.

## Ringkasan

- ✅ Atribut `required` dan `minLength` memberi validasi dasar dari browser.
- ✅ Form menunggu respons API sebelum memperbarui daftar Todo.
- ✅ Form hanya dikosongkan setelah API berhasil menyimpan Todo.
- ✅ Validasi API tetap diperlukan karena validasi browser bisa dilewati.

Berikutnya kita sambungkan edit dan delete ke API. Kita juga akan melihat perbedaan `PATCH` dan `PUT`.
