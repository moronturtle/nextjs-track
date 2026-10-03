---
type: lesson
title: Quiz
previews:
  - port: 3000
    title: "Quiz"
    pathname: /quiz
focus: /app/quiz/questions.ts
---

# Quiz — cek pemahamanmu

Saatnya ujian kecil: **8 soal pilihan ganda** dari materi pertemuan ini. Panel preview sudah langsung membuka `/quiz` — jawab di sana.

- Setiap jawaban langsung dinilai: benar/salah + pembahasan singkat
- Skor akhir muncul di akhir
- **Progres tersimpan di browser** (`localStorage`) — refresh atau pindah lesson pun tidak hilang
- Kalau skor belum memuaskan, baca ulang lesson Materi terus ulangi quiz-nya

> Mau kepo dikit? Buka `app/quiz/` di pohon file — quiz ini sendiri dibuat pakai route `app/quiz/page.tsx`, persis aturan yang baru kamu pelajari. Folder = URL. 😉

Target: minimal **6/8** sebelum lanjut ke tugas.
