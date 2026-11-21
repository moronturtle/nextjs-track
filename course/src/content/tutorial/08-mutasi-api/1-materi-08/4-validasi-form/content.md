---
type: lesson
title: "Validasi form dengan React Hook Form"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-form.tsx
---

# Langkah 4: pilih validasi form yang rapi

Di lesson sebelumnya, kita menggunakan validasi bawaan HTML untuk form Todo. Cara validasi bawaan sudah cukup untuk form sederhana. Jika jumlah input dan aturan validasi bertambah, pengaturan pesan error dan status submit bisa menjadi panjang.

Untuk form Todo ini, kita gunakan **React Hook Form**. Library ini membantu mengelola nilai input, validasi, pesan error, dan status submit tanpa membuat state terpisah untuk setiap field.

## Bandingkan validasi native dan React Hook Form

Validasi native memakai atribut HTML seperti `required` dan `minLength`:

```tsx
<input name="teks" required minLength={3} />
```

Keuntungannya, validasi native langsung tersedia di browser dan tidak perlu memasang library tambahan. Kekurangannya, pesan validasi sulit disamakan di semua browser, dan aturan yang lebih kompleks bisa membuat komponen menjadi panjang.

Dengan React Hook Form, aturan validasi disimpan bersama input yang didaftarkan. Kita bisa mengatur pesan validasi sendiri dan menampilkannya tepat di bawah field yang salah.

Pasang library di project:

```bash
npm install react-hook-form
```

## Daftarkan aturan validasi pada input

Buka `app/todo/_components/todo-form.tsx`. Fungsi `register` menghubungkan input dengan React Hook Form. Fungsi `handleSubmit` menjalankan fungsi `kirim` hanya jika validasi berhasil.

```tsx
type TodoFormValues = {
  teks: string;
};

const {
  register,
  handleSubmit,
  reset,
  setError,
  formState: { errors, isSubmitting },
} = useForm<TodoFormValues>({
  defaultValues: { teks: "" },
});
```

Aturan ini memastikan teks Todo memiliki minimal 3 karakter setelah spasi di awal dan akhir dibuang:

```tsx
<div>
  <input
    {...register("teks", {
      required: "Tulis Todo terlebih dahulu.",
      validate: (nilai) =>
        nilai.trim().length >= 3 || "Todo minimal 3 karakter.",
    })}
    aria-invalid={Boolean(errors.teks)}
    aria-describedby={errors.teks ? "teks-error" : undefined}
  />
  {errors.teks && (
    <p id="teks-error" role="alert">
      {errors.teks.message}
    </p>
  )}
</div>
```

Atribut `aria-invalid` menandai input yang sedang salah dan `aria-describedby` menghubungkan input dengan pesan errornya. Keduanya membantu pembaca layar memberi tahu pengguna kolom mana yang perlu diperbaiki.

## Kirim data dan tampilkan error dari API

`handleSubmit` memberi data yang sudah lolos validasi ke fungsi `kirim`. Kita tetap menunggu respons API. Form hanya dikosongkan setelah server berhasil menyimpan Todo.

```tsx
async function kirim(data: TodoFormValues) {
  try {
    await saatTambah(data.teks.trim());
    reset();
  } catch (error) {
    setError("root.server", {
      type: "server",
      message: error instanceof Error ? error.message : "Gagal menyimpan Todo.",
    });
  }
}
```

Hubungkan fungsi `kirim` ke form:

```tsx
<form onSubmit={handleSubmit(kirim)} noValidate>
  {/* input yang memakai register */}
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Mengirim..." : "Tambah"}
  </button>
  {errors.root && errors.root.server && (
    <p role="alert">{errors.root.server.message}</p>
  )}
</form>
```

Atribut `noValidate` mematikan popup validasi bawaan browser agar pesan dari React Hook Form yang ditampilkan. Tombol memakai `isSubmitting`, jadi kamu tidak bisa mengirim request yang sama berulang kali saat request masih berjalan.

## Validasi di browser bukan pengganti validasi API

React Hook Form memvalidasi input untuk membantu kamu mengisi form. API tetap memvalidasi ulang sebelum menyimpan data. Request bisa dikirim langsung ke API tanpa melewati form, jadi keputusan terakhir tetap ada di server.

Jika API membalas status `400`, fungsi `kirimRequest` di `lib/todo-api.ts` membaca pesan error dari body. Form menampilkan pesan error melalui `setError`, sehingga kamu tahu alasan request gagal.

## Coba di project-mu

Jalankan form Todo di project-mu, lalu coba kirim:

- Input kosong — pesan wajib diisi tampil tanpa request ke API.
- Teks satu atau dua karakter — pesan minimal 3 karakter tampil.
- Teks yang valid — tombol berubah menjadi "Mengirim..." dan Todo baru muncul setelah API membalas sukses.
- Refresh halaman — Todo yang berhasil ditambahkan tetap ada.

## Ringkasan

- ✅ Validasi native sederhana dan tidak membutuhkan library tambahan.
- ✅ React Hook Form lebih mudah dirawat saat form memiliki beberapa aturan dan pesan per field.
- ✅ `handleSubmit`, `register`, `errors`, dan `isSubmitting` mengelola alur submit form.
- ✅ API tetap memvalidasi data dan mengirim status `400` jika request tidak valid.

Di tugas pertemuan ini, kita lanjut memakai React Hook Form agar aturan validasi dan alur submit form konsisten.
