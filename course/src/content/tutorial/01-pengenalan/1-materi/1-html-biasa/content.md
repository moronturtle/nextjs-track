---
type: lesson
title: HTML biasa
template: baca
previews:
  - port: 3000
    title: Preview
    pathname: /1-html-biasa/
focus: /1-html-biasa/tentang.html
---

# HTML biasa

Sebelum mengenal Next.js, kita mulai dari cara yang paling mendasar dalam membuat website: **satu halaman = satu file `.html`**.

Buka `1-html-biasa/tentang.html` di panel File. File inilah yang dikirim server ke browser — apa adanya, tanpa proses apa pun.

:::tip{title="Coba sekarang"}
Di preview sebelah, klik **"Tentang"** pada menu navigasi — lalu perhatikan **angka waktu di bagian bawah halaman**. Klik kembali **"Beranda"** dan perhatikan angkanya lagi.
:::

Angkanya berubah, kan? Padahal halamannya terlihat mirip-mirip saja. Perubahan kecil itu adalah bukti bahwa baru saja terjadi **reload total** — browser membuang seluruh halaman lama, meminta file baru ke server, lalu menggambar ulang semuanya dari awal.

![Alur reload total](/diagrams/reload-total.svg)

## Kenapa tidak terlihat "kedip"-nya?

Reload total biasanya terlihat sebagai layar yang **berkedip** — sempat putih sekejap sebelum halaman baru muncul. Tapi halaman demo ini sangat kecil, jadi prosesnya selesai dalam sekejap mata dan kedipnya tidak sempat terlihat.

Di website asli yang lebih berat — banyak gambar, iklan, atau script — kedip itu akan jelas terasa. Dan walaupun tidak terlihat, akibatnya tetap ada: posisi scroll hilang dan seluruh tampilan dibangun ulang dari nol.

Itulah gunanya angka waktu tadi — **bukti yang tidak bisa bohong**. Setiap kali kamu klik link, server benar-benar membuat dan mengirim halaman baru.

:::info{title="Penasaran dari mana angka itu berasal?"}
Kalau kamu buka `tentang.html` di panel File, di sana tertulis `{{WAKTU}}` — bukan jam. Server demo kitalah yang menggantinya dengan waktu saat ini setiap kali file diminta. Jadi kalau angkanya berubah, artinya responsnya memang baru dibuat.
:::

## Masalah kedua: kode yang ditulis berulang

Sekarang bandingkan `index.html` dengan `tentang.html` di editor.

**Bagian `<nav>` dan `<footer>`-nya ditulis dua kali, kan?** Setiap halaman menuliskan bagian yang sama. Kalau mau mengubah menu, kamu harus mengedit semua file satu per satu — bayangkan kalau halamannya ada 50.

## Ringkasan

Satu hal yang perlu kamu tahu dulu: supaya halamanmu bisa muncul di hasil pencarian, **Google harus bisa membaca isinya**. Yang dibaca Google adalah file HTML yang dikirim server — persis seperti yang diterima browser. Kalau file itu berisi tulisan, Google membacanya. Kalau isinya hanya `<div>` kosong ditambah script, Google melihat... kosong. Google tidak menunggu JavaScript menulis/menggambar isi halamanmu.

- ✅ **Mudah muncul di Google** — semua isi halaman tertulis langsung di file HTML, jadi Google bisa membacanya dengan mudah
- ✅ Halaman langsung tampil tanpa menunggu apa pun
- ❌ Setiap pindah halaman = reload total — halaman digambar ulang dari nol (terasa sebagai "kedip" kalau websitenya berat)
- ❌ Kode yang sama harus ditulis ulang di setiap halaman (menu, footer, dan lain-lain)
- ❌ Ingin membuat fitur interaktif (dropdown, pencarian langsung)? Semuanya harus ditulis manual — memakan waktu dan mudah berantakan

Orang pun mulai berpikir: *"Bisakah berpindah halaman tanpa reload? Seperti aplikasi di HP."* — jawabannya ada di lesson berikutnya.
