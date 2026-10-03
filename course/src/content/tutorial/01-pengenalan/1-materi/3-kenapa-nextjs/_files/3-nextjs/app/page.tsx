// File: app/page.tsx → route "/" (halaman Beranda)
// Tanpa "use client" → komponen ini DI-RENDER DI SERVER (SSR):
// HTML-nya sudah jadi saat sampai di browser, jadi bisa dibaca Google.
// Perhatikan: di sini hanya ada KONTEN — Nav dan Footer datang dari layout.tsx.

export default function Beranda() {
  return (
    <>
      <h1>Toko Roti Kecil</h1>
      <p>Selamat datang!</p>
    </>
  );
}
