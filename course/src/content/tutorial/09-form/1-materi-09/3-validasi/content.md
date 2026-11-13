---
type: lesson
title: "Validasi form"
template: baca
previews: false
terminal: false
focus: /project/components/form-pendaftaran.tsx
---

# Validasi: periksa sebelum dikirim

Validasi menjawab pertanyaan: "bolehkah data ini dikirim?" Form yang baik memeriksa **sebelum request berangkat** — lebih cepat daripada menunggu server menolaknya.

## Periksa setiap kolom, kumpulkan pesannya

Buka `project/components/form-pendaftaran.tsx` — form dengan dua kolom yang masing-masing punya aturan:

```tsx
const [errors, setErrors] = useState<{ nama?: string; email?: string }>({});

function validasi(nama: string, email: string) {
  const salah: { nama?: string; email?: string } = {};
  if (nama.trim().length < 3) salah.nama = "Nama minimal 3 karakter";
  if (!email.includes("@")) salah.email = "Email harus berisi @";
  return salah;
}

async function kirim(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const salah = validasi(nama, email);
  setErrors(salah);
  if (Object.keys(salah).length > 0) return; // berhenti — jangan kirim

  // baru kirim ke server...
}
```

Poinnya:

- Satu fungsi `validasi` memeriksa semua kolom dan mengembalikan objek pesan — `salah.nama`, `salah.email`. Kolom yang lolos tidak ada di objek.
- `Object.keys(salah).length > 0` artinya "ada pesan error" → `return`, request tidak jadi dikirim.
- Pesan tampil di bawah kolomnya masing-masing: `{errors.nama && <p>{errors.nama}</p>}` — pengguna tahu persis kolom mana yang salah.

## Validasi bisa di tahap berbeda

- **Saat submit** (contoh di atas) — paling sederhana; pengguna lihat semua kesalahan sekaligus.
- **Saat mengetik** — periksa di `onChange`; responsif tapi bisa cerewet kalau kolom masih kosong.
- **Saat keluar dari kolom** (`onBlur`) — jalan tengah yang umum dipakai.

Mulai dari "saat submit" dulu — murah dan sudah cukup untuk kebanyakan form.

## Lapis kedua: server tetap memeriksa

Ini penting: **validasi di client bisa dilewati orang**. Siapa pun bisa mengirim request langsung ke API tanpa lewat form-mu — misalnya dari terminal. Karena itu API latihan kita tetap memeriksa dan membalas `400` untuk `teks` yang terlalu pendek, walau form sudah divalidasi.

Jadi aturan mainnya:

- **Validasi client** → untuk pengalaman: cepat, pesan jelas, tidak membuang request.
- **Validasi server** → untuk kebenaran: yang terakhir menentukan boleh tidaknya data masuk.

Bonusnya: saat server membalas `400`, body jawabannya berisi pesan — `{ "error": "teks wajib diisi dan minimal 3 karakter" }`. Kamu bisa membaca pesan itu dan menampilkannya ke pengguna, bukan cuma "gagal":

```ts
if (!res.ok) {
  const isi = await res.json();
  throw new Error(isi.error ?? `Server menjawab ${res.status}`);
}
```

## Coba di project-mu

Kirim `form-pendaftaran` dengan nama "ab" — kedua pesan tampil di bawah kolomnya dan request tidak berangkat. Perbaiki nama, kosongkan email — hanya pesan email yang tampil.

## Ringkasan

- ✅ Satu fungsi `validasi` mengumpulkan pesan per kolom → tampil di bawah kolomnya.
- ✅ `Object.keys(salah).length > 0` → hentikan submit sebelum request berangkat.
- ✅ Validasi client untuk pengalaman, validasi server untuk kebenaran — dua-duanya perlu.
- ✅ Pesan `error` dari jawaban `400` server bisa dibaca dan ditampilkan ke pengguna.

Selanjutnya quiz, lalu tugas — kamu akan membuat form pendaftaran tulisan dengan validasi di project-mu.
