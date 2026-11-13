---
type: lesson
title: "Halaman login dan gerbang"
template: baca
previews: false
terminal: false
focus: /project/app/login/_components/form-login.tsx
---

# Langkah 3: halaman login dan gerbang aplikasi

Terakhir: antarmuka untuk masuk. Pengguna mengetik nama + password → token tersimpan → dibawa ke daftar tugas.

## Form login — dan register

Buka `project/app/login/_components/form-login.tsx` — form controlled dengan **dua kolom** dan dua mode: `masuk` atau `daftar`. State `mode` menentukan fungsi mana yang dipanggil:

```tsx
const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
const [nama, setNama] = useState("");
const [password, setPassword] = useState("");

async function kirim(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (nama.trim().length < 3 || password.length < 6 || sedangMasuk) return;

  setSedangMasuk(true);
  setError(null);
  try {
    if (mode === "daftar") await daftar(nama.trim(), password);
    else await masuk(nama.trim(), password);
    window.location.assign("/todo");
  } catch (e) {
    setError(e instanceof Error ? e.message : "Gagal");
    setSedangMasuk(false);
  }
}
```

Karena `daftar` dan `masuk` membalas bentuk yang sama (`{token, nama}`), setelah `await` keduanya alurnya identik — token tersimpan, pindah ke `/todo`.

Di bawah tombol ada tautan kecil untuk berganti mode: `"Belum punya akun? Daftar"` ↔ `"Sudah punya akun? Masuk"`. Itu pola umum — satu form, dua fungsi, berganti lewat state.

Tiga pilihan yang sengaja dibuat:

- `window.location.assign("/todo")` — berpindah dengan **muat ulang penuh**. Sengaja: `TodoProvider` memuat ulang dari awal dan request pertamanya sudah membawa token baru.
- Pesan error dari server ditampilkan apa adanya — `"nama atau password salah"` (401), `"nama sudah dipakai, silakan login"` (409), atau validasi `400` — pola yang sama dengan pertemuan 09.

Halamannya sendiri, `app/login/page.tsx`, tipis seperti halaman lain — memasang `FormLogin` di tengah layar.

## Gerbang di TodoApp

Halaman login ada, tapi siapa pun masih bisa langsung membuka `/todo`. Jadi `todo-app.tsx` diberi gerbang — memeriksa token saat pertama jalan:

```tsx
const [adaToken, setAdaToken] = useState(false);
useEffect(() => {
  setAdaToken(bacaToken() !== null);
}, []);

if (!adaToken) {
  return (
    <div className={styles.card}>
      <p>Masuk dulu untuk melihat daftar tugasmu.</p>
      <Link href="/login">Ke halaman login</Link>
    </div>
  );
}
```

`useEffect` dipakai karena `localStorage` baru bisa dibaca setelah komponen berjalan di browser — alasan yang sama dengan pertemuan 06.

## Saat server menjawab 401

Satu perbaikan kecil di `kirimRequest` (`lib/todo-api.ts`) — jawaban `401` mendapat pesan yang bisa dimengerti pengguna:

```ts
if (res.status === 401) {
  throw new Error("Sesi berakhir. Silakan login kembali.");
}
```

Pesan itu tampil di layar lewat state `error` yang sudah ada — pengguna tahu harus login ulang, bukan menebak kenapa daftar kosong.

## Tombol keluar

Lengkapi dengan tombol kecil di `TodoApp`:

```tsx
<button
  onClick={() => {
    keluar();
    window.location.assign("/login");
  }}
>
  Keluar
</button>
```

`keluar()` menghapus token, lalu muat ulang ke halaman login. Sesi selesai — request berikutnya kembali "tidak dikenal".

## Buktikan sendiri

- Buka `/todo` tanpa login → gerbang "Masuk dulu" tampil.
- Daftar sebagai `budi` + password → langsung masuk (register membalas token juga). Coba daftar `budi` lagi → `409` "nama sudah dipakai".
- Login `budi` dengan password salah → `401` "nama atau password salah".
- Login benar → tambah tugas → `POST` membawa header `Authorization` di tab Network.
- Keluar, daftar sebagai `siti` → daftarnya kosong (data `siti` beda dengan `budi`).
- Ubah satu huruf token di Local Storage → muat ulang → `401` dan pesan "Sesi berakhir".

## Ringkasan

- ✅ Satu form dengan mode `masuk`/`daftar` — `daftar` dan `masuk` membalas bentuk sama, jadi setelahnya identik.
- ✅ Form login memanggil `daftar()`/`masuk()` → token tersimpan → pindah ke `/todo` dengan muat ulang penuh.
- ✅ `401` dan `409` dari server ditampilkan apa adanya; tombol Keluar menghapus token.
- ✅ Gerbang memeriksa token lewat `useEffect` — `localStorage` baru ada setelah di browser.
- ✅ Identitas kini dibuktikan token — bukan teks di URL yang bisa diketik siapa saja.

Selanjutnya ada materi bonus opsional: versi yang lebih aman dengan cookie `httpOnly` dan refresh token — cukup dibaca, tidak mengubah tugas.
