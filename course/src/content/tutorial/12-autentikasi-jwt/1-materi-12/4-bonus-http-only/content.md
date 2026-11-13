---
type: lesson
title: "Bonus: httpOnly dan refresh token"
template: baca
previews: false
terminal: false
focus: /project/contoh-server-auth.ts
---

# Materi bonus — httpOnly cookie dan refresh token

Materi utama memakai Bearer token di `localStorage` — pola paling umum untuk API yang dipakai banyak client. Lesson ini menunjukkan versi yang lebih aman untuk aplikasi web: **access token berumur pendek + refresh token di cookie `httpOnly`, dengan rotasi**.

Kamu tidak perlu mengubah project — baca dan pahami polanya saja.

## Masalah yang dipecahkan

Token di `localStorage` punya satu kelemahan besar: bisa dibaca **script apa pun** yang berjalan di halamanmu — termasuk script jahat yang menyusup lewat dependency atau celah XSS. Kalau token itu berumur 7 hari, pencurinya bisa menyamar seminggu penuh.

Solusinya bukan "token lebih panjang", malah sebaliknya — **bagi dua**:

- **Access token** — umur pendek (5–15 menit), dikirim di header `Authorization` seperti biasa. Kalau dicuri, cepat kedaluwarsa.
- **Refresh token** — umur panjang (hari/minggu), disimpan server sebagai cookie `httpOnly`. Dipakai hanya untuk menukar access token baru.

Cookie `httpOnly` tidak bisa dibaca JavaScript sama sekali — script jahat pun tidak bisa menyentuhnya. Browser mengirimnya otomatis, jadi client tidak pernah memegang nilainya.

## Rotasi: a1 r1 → a2 r2 → a3 r3

Refresh token juga **dirotasi**: setiap kali dipakai, server menerbitkan refresh token baru dan menganggap yang lama hangus. Jadi pasangannya bergerak terus: `(a1, r1)` → `(a2, r2)` → `(a3, r3)` …

Kenapa? **Deteksi pencurian.** Kalau pencuri memakai `r1` — padahal kamu sudah menggantinya dengan `r2` — server melihat `r1` dipakai lagi dan tahu ada masalah: seluruh rangkaian token keluarga itu bisa dicabut.

## Kode sisi server (Next.js Route Handler)

Buka `project/contoh-server-auth.ts` — tiga route dalam satu file contoh:

```ts
// POST /api/auth/login — access token pendek + refresh cookie
const accessToken = await buatToken(nama, "15m");
const refreshToken = await buatToken(nama, "30d");
await simpanRefresh(refreshToken, nama); // dicatat di server

const res = Response.json({ accessToken });
res.headers.set(
  "Set-Cookie",
  `rt=${refreshToken}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=2592000`,
);
return res;
```

Kunci-kuncinya:

- `HttpOnly` — JavaScript tidak bisa membaca cookie ini.
- `Secure` — hanya terkirim lewat HTTPS.
- `SameSite=Lax` — tidak terkirim dari situs lain (perlindungan CSRF).
- `Path=/api/auth` — cookie hanya terkirim ke endpoint auth, bukan semua request.

Route `/api/auth/refresh` membaca cookie `rt`, memverifikasi, mengecek apakah token itu **masih yang terbaru** di catatan server — lalu menerbitkan `(a2, r2)` dan menghanguskan `r1`.

## Kode sisi client

Buka `project/lib/api-cookie.ts` — `kirimRequest` versi cookie. Polanya: kirim access token di header seperti biasa; kalau jawabannya `401`, panggil `/api/auth/refresh` sekali, lalu ulangi requestnya:

```ts
const res = await fetch(`${API_URL}${alamat}`, {
  ...init,
  credentials: "include", // cookie refresh ikut dikirim ke /api/auth/refresh
  headers: { ...init?.headers, Authorization: `Bearer ${accessToken}` },
});

if (res.status === 401) {
  await fetch(`${API_URL}/api/auth/refresh`, { method: "POST", credentials: "include" });
  // baca accessToken baru, lalu ulangi request awal
}
```

`credentials: "include"` memberi tahu fetch untuk membawa cookie — tanpa ini cookie `rt` tidak ikut.

## Syarat di CORS

Cookie lintas origin punya aturan tambahan — ini alasan kenapa versi Bearer lebih sederhana untuk API kita:

- Server harus menjawab `Access-Control-Allow-Credentials: true`.
- `Access-Control-Allow-Origin` **tidak boleh `*`** — harus menyebut origin persisnya.
- Client wajib `credentials: "include"` di setiap request yang membawa cookie.

## Kapan pakai yang mana?

| Situasi | Pilihan |
| --- | --- |
| API untuk banyak client (web, mobile, CLI) | Bearer + access token |
| Web first-party, keamanan maksimal | Access token pendek + refresh httpOnly berotasi |
| Latihan belajar fetch/auth | Bearer + localStorage — seperti materi utama |

## Ringkasan

- ✅ `httpOnly` menjadikan refresh token tidak bisa disentuh JavaScript — benteng terhadap XSS.
- ✅ Access token pendek + refresh panjang = jendela pencurian kecil, sesi tetap lama.
- ✅ Rotasi membuat pemakaian refresh token curian terdeteksi — rangkaian bisa dicabut.
- ✅ Harganya: `credentials`, CORS ketat, dan logika rotasi — itulah kenapa materi utama memakai versi sederhananya dulu.

Selanjutnya quiz, lalu tugas pertemuan 12 seperti biasa — materi bonus ini tidak mengubah tugasnya.
