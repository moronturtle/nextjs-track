"use client";

// Komponen ini interaktif (pakai state & event handler) — belum perlu kamu
// pahami sekarang, cara kerjanya dibahas di pertemuan selanjutnya.
// Yang penting sekarang: file ini hidup di route /quiz. Routing = folder. 🙂

import { useState } from "react";
import type { Question } from "./questions";

export default function Quiz({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const last = current + 1 === questions.length;

  function pilih(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.jawaban) setScore((s) => s + 1);
  }

  function lanjut() {
    if (last) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function ulangi() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pesan =
      score === questions.length
        ? "Sempurna! Kamu siap lanjut ke tugas."
        : score >= questions.length / 2
          ? "Lumayan! Ulangi bagian materi yang masih bikin bingung, terus coba lagi."
          : "Nggak apa-apa — baca lagi materinya pelan-pelan, terus coba lagi ya.";

    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="text-5xl font-bold">
          {score}/{questions.length}
        </p>
        <p className="mt-3">{pesan}</p>
        <button
          onClick={ulangi}
          className="mt-5 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Ulangi quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500">
        Soal {current + 1} dari {questions.length}
      </p>
      <h2 className="mt-1 text-xl font-semibold">{q.soal}</h2>

      <ul className="mt-4 space-y-2">
        {q.opsi.map((opsi, i) => {
          let warna = "border-gray-300 hover:border-blue-500";
          if (selected !== null) {
            if (i === q.jawaban) warna = "border-green-500 bg-green-50 text-green-800";
            else if (i === selected) warna = "border-red-500 bg-red-50 text-red-800";
            else warna = "border-gray-200 opacity-50";
          }
          return (
            <li key={i}>
              <button
                onClick={() => pilih(i)}
                disabled={selected !== null}
                className={`w-full rounded-lg border px-4 py-3 text-left transition ${warna}`}
              >
                {opsi}
              </button>
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="font-semibold">
            {selected === q.jawaban ? "✅ Benar!" : "❌ Kurang tepat."}
          </p>
          <p className="mt-1 text-sm">{q.pembahasan}</p>
          <button
            onClick={lanjut}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {last ? "Lihat skor" : "Soal berikutnya →"}
          </button>
        </div>
      )}
    </div>
  );
}
