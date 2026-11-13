---
type: lesson
title: "Pertemuan 12 — Login dan token"
template: baca
previews: false
terminal: false
focus: /project/lib/auth.ts
---

# Pertemuan 12 — Login dan token

Selama ini aplikasimu memisahkan data lewat `?owner=nama`. Itu berhasil untuk latihan, tapi ada masalah besar: **siapa pun bisa mengaku sebagai siapa pun**. Request `?owner=budi` dari browser siapa saja membaca daftar milik budi — tidak ada pembuktian.

Pertemuan ini menggantinya dengan cara yang benar-benar dipakai aplikasi nyata: **login, dapatkan token, kirim token di setiap request**.

## Dari "mengaku" menjadi "membuktikan"

Alurnya seperti kartu anggota:

1. Kamu membuat akun dulu (register), lalu mengirim namamu + passwordmu ke server — `POST /api/auth/login` dengan body `{"nama": "budi", "password": "rahasia123"}`.
2. Server membuat **token** — sebuah teks panjang yang ditandatangani server, berisi namamu — dan membalas `{token, nama}`.
3. Setiap request berikutnya menyertakan token itu di header `Authorization`.
4. Server memeriksa tanda tangannya. Token palsu atau diubah → ditolak. Token asli → server tahu siapa pemiliknya.

Bedanya dengan `?owner=`: parameter bisa diketik siapa saja; token hanya bisa dibuat oleh server. Mengubah isinya membuat tanda tangannya tidak cocok — server langsung tahu ada pemalsuan.

## Apa itu JWT?

Token yang dipakai server latihan kita berbentuk **JWT** (JSON Web Token) — standar token yang isinya JSON, ditandatangani secara kriptografi. Kalau kamu buka isinya, bentuknya tiga bagian dipisah titik:

```text
eyJhbGciOi... .eyJvd25lciI6ImJ1ZGkifQ .SflKxwRJSMeKK...
   header          isi (payload)         tanda tangan
```

Bagian tengah berisi data — misalnya `{"owner": "budi"}`. Bagian ketiga adalah tanda tangan yang membuktikan isinya dibuat server dan tidak diubah. Kamu bisa menempelkan token di [jwt.io](https://jwt.io) untuk melihat isinya — **ingat, isinya bisa dibaca siapa saja; yang aman adalah pembuatannya**.

## Register dulu, baru login

API latihan kita punya dua langkah — sama seperti aplikasi nyata:

1. **Register** — membuat akun sekali: `POST /api/auth/register` dengan body `{"nama": "budi", "password": "rahasia123"}`. Server menyimpan password sebagai **hash** — bentuk acak yang tidak bisa dibalik jadi password asli — lalu langsung membalas token.
2. **Login** — setiap kali butuh token lagi: `POST /api/auth/login` dengan `{"nama": "budi", "password": "rahasia123"}`. Server memeriksa hash-nya cocok, baru menerbitkan token.

Kenapa hash? Karena database yang bocor tidak boleh ikut membocorkan password murid. Hash `salt:hash` di server bisa diverifikasi, tapi tidak bisa dibaca balik — itulah kenapa kamu akan melihat isinya aneh saat membuka Data Browser Upstash nanti.

```ts
const res = await fetch("http://localhost:3001/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nama: "budi", password: "rahasia123" }),
});
const data = await res.json();
// data = { token: "eyJhbG...", nama: "budi" }
```

Perhatikan jawabannya saat salah: nama belum terdaftar atau password keliru → server membalas **`401`** dengan pesan `"nama atau password salah"` — sengaja tidak memberitahu mana yang salah, supaya penyerang tidak bisa menebak nama yang terdaftar. Nama sudah dipakai saat register → **`409`**.

## Token disimpan di mana?

Token perlu bertahan saat halaman di-refresh — jadi tempatnya `localStorage`, seperti dulu daftar tugasmu. Buka `project/lib/auth.ts` — tiga fungsi kecil, dengan satu fungsi pembantu `mintaToken` yang dipakai `daftar` dan `masuk`:

```ts
const KUNCI_TOKEN = "token";

export function bacaToken(): string | null {
  return localStorage.getItem(KUNCI_TOKEN);
}

async function mintaToken(alamat: string, nama: string, password: string) {
  const res = await fetch(`${API_URL}${alamat}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Gagal");
  localStorage.setItem(KUNCI_TOKEN, data.token);
}

export function daftar(nama: string, password: string): Promise<void> {
  return mintaToken("/api/auth/register", nama, password);
}

export function masuk(nama: string, password: string): Promise<void> {
  return mintaToken("/api/auth/login", nama, password);
}

export function keluar(): void {
  localStorage.removeItem(KUNCI_TOKEN);
}
```

`mintaToken` adalah contoh pola yang akan sering kamu temui: satu fungsi yang menerima alamat, lalu `daftar`/`masuk` tinggal memilih endpoint-nya — register dan login membalas bentuk yang sama (`{token, nama}`), jadi setelah itu alurnya identik. `keluar` menghapus token — setara logout.

:::warning{title="Catatan jujur soal localStorage"}
localStorage mudah untuk belajar, tapi token di sana bisa dibaca script apa pun yang berjalan di halamanmu. Aplikasi produksi sering memakai cookie `httpOnly` yang tidak bisa disentuh JavaScript. Untuk latihan, localStorage cukup — tapi ingat batasannya.
:::

## Buktikan sendiri

Register lewat request di atas, lalu buka **Data Browser** di dashboard Upstash — ada key `users:budi` berisi `nama`, `dibuatPada`, dan `hash` (teks acak `salt:hash`, bukan passwordmu — itu buktinya password tidak disimpan polos). Login lewat request yang sama → `data.token` ada → tempel di jwt.io → payload berisi `nama`-mu.

## Ringkasan

- ✅ `?owner=` = mengaku; token = membuktikan — hanya server yang bisa membuatnya.
- ✅ Register membuat akun (password di-hash); login memverifikasi dan membalas `{token, nama}`; token disimpan di `localStorage`.
- ✅ `401` untuk nama/password salah — pesan tidak membocorkan mana yang keliru; `409` untuk nama yang sudah dipakai.
- ✅ JWT = JSON yang ditandatangani; isinya bisa dibaca, tapi tidak bisa dipalsukan.
- ✅ `keluar()` menghapus token — aplikasi kembali tidak dikenali.

Berikutnya: mengirim token di setiap request — header `Authorization` menggantikan `?owner=`.
