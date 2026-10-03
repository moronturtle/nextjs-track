export type Question = {
  soal: string;
  opsi: string[];
  jawaban: number; // index opsi yang benar
  pembahasan: string;
};

export const questions: Question[] = [
  {
    soal: "Apa itu HTML?",
    opsi: [
      "Bahasa pemrograman untuk logika website",
      "Bahasa penanda untuk menulis struktur halaman web",
      "Framework JavaScript untuk membangun UI",
      "Protokol untuk mengirim data antar server",
    ],
    jawaban: 1,
    pembahasan:
      "HTML (HyperText Markup Language) menulis struktur: judul, paragraf, link, gambar. Semua website ujung-ujungnya HTML.",
  },
  {
    soal: "Apa ciri khas SPA (Single-Page Application)?",
    opsi: [
      "Tiap halaman punya file HTML sendiri",
      "Browser hanya memuat satu HTML, JavaScript yang mengganti isi saat pindah halaman",
      "Website yang hanya punya satu halaman",
      "Website tanpa JavaScript sama sekali",
    ],
    jawaban: 1,
    pembahasan:
      "SPA = satu HTML di awal, selebihnya JavaScript mengganti isi halaman tanpa reload. Contoh: Gmail, Twitter/X.",
  },
  {
    soal: "CSR (Client-Side Rendering) artinya halaman digambar...",
    opsi: [
      "Di server, lalu dikirim ke browser",
      "Di database",
      "Oleh JavaScript di browser user",
      "Oleh CDN",
    ],
    jawaban: 2,
    pembahasan:
      "Client = browser kamu. React SPA bekerja dengan CSR: server kirim wadah kosong, JS yang menggambar isi halaman.",
  },
  {
    soal: "Kenapa React SPA (CSR) bermasalah untuk SEO?",
    opsi: [
      "Karena Google melarang website pakai JavaScript",
      "Karena HTML awalnya kosong — crawler Google tidak melihat konten",
      "Karena SPA selalu lambat di semua kondisi",
      "Karena SPA tidak bisa punya judul halaman",
    ],
    jawaban: 1,
    pembahasan:
      "Crawler membaca file HTML. Kalau isinya cuma <div id=\"root\"> kosong, kontenmu tidak tercatat di Google.",
  },
  {
    soal: "Apa beda utama SSR dengan CSR?",
    opsi: [
      "SSR pakai database, CSR tidak",
      "SSR menggambar HTML di server sehingga browser menerima halaman yang sudah jadi",
      "SSR tidak bisa interaktif sama sekali",
      "SSR hanya untuk halaman login",
    ],
    jawaban: 1,
    pembahasan:
      "SSR = server merangkai HTML lengkap berisi konten → first paint cepat dan crawler bisa membacanya.",
  },
  {
    soal: "Di Next.js App Router, file apa yang membuat sebuah folder jadi route yang bisa diakses?",
    opsi: ["index.tsx", "route.tsx", "layout.tsx", "page.tsx"],
    jawaban: 3,
    pembahasan:
      "page.tsx yang membuat route bisa diakses. Folder tanpa page.tsx tidak jadi URL — cocok untuk naro komponen pembantu.",
  },
  {
    soal: "File app/blog/page.tsx bisa diakses di URL apa?",
    opsi: ["/page", "/app/blog", "/blog", "/blog/page"],
    jawaban: 2,
    pembahasan:
      "Folder = segmen URL, nama file page.tsx tidak ikut ke URL. Jadi app/blog/page.tsx → /blog.",
  },
  {
    soal: "Apa fungsi layout.tsx?",
    opsi: [
      "Menentukan warna tema website",
      "UI bersama yang membungkus page.tsx dan semua route di bawahnya",
      "Mengatur posisi file di folder",
      "Menghubungkan project ke database",
    ],
    jawaban: 1,
    pembahasan:
      "layout.tsx membungkus halaman lewat prop children — cocok untuk navbar/footer yang tampil di semua halaman.",
  },
];
