import type { Todo } from "./types";

// Data awal untuk setiap owner baru. Jumlahnya sengaja lebih dari sepuluh
// supaya pagination di materi 10 langsung terlihat.
export const TODO_AWAL: Todo[] = [
  { id: 1, teks: "Belajar dasar fetch", selesai: true },
  { id: 2, teks: "Membaca status response", selesai: true },
  { id: 3, teks: "Menampilkan loading state", selesai: false },
  { id: 4, teks: "Menangani error state", selesai: false },
  { id: 5, teks: "Mengirim data dengan POST", selesai: false },
  { id: 6, teks: "Mengubah data dengan PATCH", selesai: false },
  { id: 7, teks: "Menghapus data dengan DELETE", selesai: false },
  { id: 8, teks: "Memvalidasi form sebelum submit", selesai: false },
  { id: 9, teks: "Mencari todo dengan query q", selesai: false },
  { id: 10, teks: "Memfilter todo yang belum selesai", selesai: true },
  { id: 11, teks: "Mencoba pagination halaman dua", selesai: false },
  { id: 12, teks: "Login dan memakai token JWT", selesai: false },
];
