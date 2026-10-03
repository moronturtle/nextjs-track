---
type: lesson
title: "Eksperimen: buktiin sendiri"
template: demo-spa
previews:
  - port: 5173
    title: "React SPA (CSR)"
focus: /index.html
---

# Eksperimen: buktiin sendiri

Yang di editor sekarang adalah **React SPA murni** (React + Vite, tanpa Next.js). Kita jadi "robot Google" sebentar.

## Langkah 1 — lihat HTML mentahnya

Buka `index.html` di editor: isinya cuma `<div id="root">` kosong. Itu yang benar-benar dikirim server.

## Langkah 2 — jalanin & lihat hasilnya

Di panel preview sebelah, aplikasinya jalan dan kelihatan normal — padahal HTML-nya kosong. Karena JavaScript yang menggambarnya di browser.

## Langkah 3 — pakai "mata crawler"

Di terminal (bawah), jalankan:

```bash
curl -s http://localhost:5173
```

`curl` membaca HTML mentah persis seperti robot Google — **tidak menjalankan JavaScript**. Lihat outputnya: cuma wadah kosong. Inilah kenapa SPA susah muncul di Google.

## Bonus — trik di browser biasa

Kalau nanti mau cek website lain di laptop: klik kanan → **View Page Source**, atau di DevTools `Ctrl+Shift+P` → "Disable JavaScript" → reload. Halaman kosong = CSR, tetap tampil = server-rendered.

## Sekarang bandingkan

Di lesson berikutnya, kita lakukan `curl` yang sama ke project **Next.js** — lihat bedanya sendiri. 👉
