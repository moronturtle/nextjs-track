# Quiz 01 — Pengenalan Next.js

Versi teks dari quiz interaktif di `/quiz` (jawab di sana untuk langsung tahu benar/salah). Di sini, jawab dulu di kepala, baru buka kuncinya.

---

**1. Apa itu HTML?**
- a. Bahasa pemrograman untuk logika website
- b. Bahasa penanda untuk menulis struktur halaman web
- c. Framework JavaScript untuk membangun UI
- d. Protokol untuk mengirim data antar server

<details><summary>Kunci</summary>

**b.** HTML menulis struktur (judul, paragraf, link). Semua website ujung-ujungnya HTML.
</details>

**2. Apa ciri khas SPA (Single-Page Application)?**
- a. Tiap halaman punya file HTML sendiri
- b. Browser hanya memuat satu HTML, JavaScript yang mengganti isi saat pindah halaman
- c. Website yang hanya punya satu halaman
- d. Website tanpa JavaScript sama sekali

<details><summary>Kunci</summary>

**b.** Satu HTML di awal, selebihnya JavaScript mengganti isi tanpa reload. Contoh: Gmail, Twitter/X.
</details>

**3. CSR (Client-Side Rendering) artinya halaman digambar...**
- a. Di server, lalu dikirim ke browser
- b. Di database
- c. Oleh JavaScript di browser user
- d. Oleh CDN

<details><summary>Kunci</summary>

**c.** Client = browser kamu. React SPA bekerja dengan CSR.
</details>

**4. Kenapa React SPA (CSR) bermasalah untuk SEO?**
- a. Karena Google melarang website pakai JavaScript
- b. Karena HTML awalnya kosong — crawler Google tidak melihat konten
- c. Karena SPA selalu lambat di semua kondisi
- d. Karena SPA tidak bisa punya judul halaman

<details><summary>Kunci</summary>

**b.** Crawler membaca file HTML. Kalau isinya cuma `<div id="root">` kosong, konten tidak tercatat.
</details>

**5. Apa beda utama SSR dengan CSR?**
- a. SSR pakai database, CSR tidak
- b. SSR menggambar HTML di server sehingga browser menerima halaman yang sudah jadi
- c. SSR tidak bisa interaktif sama sekali
- d. SSR hanya untuk halaman login

<details><summary>Kunci</summary>

**b.** Server merangkai HTML lengkap berisi konten → first paint cepat dan crawler bisa membacanya.
</details>

**6. Di Next.js App Router, file apa yang membuat folder jadi route yang bisa diakses?**
- a. `index.tsx`
- b. `route.tsx`
- c. `layout.tsx`
- d. `page.tsx`

<details><summary>Kunci</summary>

**d.** `page.tsx` yang membuat route bisa diakses. Folder tanpa `page.tsx` tidak jadi URL.
</details>

**7. File `app/blog/page.tsx` bisa diakses di URL apa?**
- a. `/page`
- b. `/app/blog`
- c. `/blog`
- d. `/blog/page`

<details><summary>Kunci</summary>

**c.** Folder = segmen URL. Nama file `page.tsx` tidak ikut ke URL.
</details>

**8. Apa fungsi `layout.tsx`?**
- a. Menentukan warna tema website
- b. UI bersama yang membungkus `page.tsx` dan semua route di bawahnya
- c. Mengatur posisi file di folder
- d. Menghubungkan project ke database

<details><summary>Kunci</summary>

**b.** `layout.tsx` membungkus halaman lewat prop `children` — cocok untuk navbar/footer.
</details>
