"use client";

// Komponen ini interaktif (state + event handler) — belum perlu dipahami
// sekarang. Yang penting: progresmu disimpan di localStorage browser.

import { useEffect, useState } from "react";
import type { Question } from "./questions";

const STORAGE_KEY = "nextjs-track-quiz-01";

type Saved = { current: number; score: number; done: boolean };

function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

const btn =
  "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition shadow-sm";

export default function Quiz({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Pulihkan progres dari localStorage saat pertama load (client only)
  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setCurrent(saved.current);
      setScore(saved.score);
      setDone(saved.done);
    }
    setHydrated(true);
  }, []);

  // Simpan progres setiap berubah
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ current, score, done }));
    }
  }, [current, score, done, hydrated]);

  const q = questions[current];
  const last = current + 1 === questions.length;
  const progress = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100;

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
    localStorage.removeItem(STORAGE_KEY);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (!hydrated) return null;

  if (done) {
    const sempurna = score === questions.length;
    const pesan = sempurna
      ? "Sempurna! Kamu siap lanjut ke tugas."
      : score >= questions.length / 2
        ? "Lumayan! Ulangi bagian materi yang masih bikin bingung, terus coba lagi."
        : "Nggak apa-apa — baca lagi materinya pelan-pelan, terus coba lagi ya.";

    return (
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="text-6xl">{sempurna ? "🏆" : score >= questions.length / 2 ? "💪" : "📖"}</div>
        <p className="mt-4 text-5xl font-bold text-gray-900">
          {score}
          <span className="text-2xl text-gray-400">/{questions.length}</span>
        </p>
        <p className="mt-3 text-gray-600">{pesan}</p>
        <button onClick={ulangi} className={`${btn} mt-6`}>
          ↺ Ulangi quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-500">
          {current + 1}/{questions.length}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-gray-900">{q.soal}</h2>

      <ul className="mt-4 space-y-2.5">
        {q.opsi.map((opsi, i) => {
          let gaya =
            "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-sm";
          if (selected !== null) {
            if (i === q.jawaban)
              gaya = "border-green-500 bg-green-50 text-green-900 shadow-sm";
            else if (i === selected)
              gaya = "border-red-400 bg-red-50 text-red-900";
            else gaya = "border-gray-200 opacity-40";
          }
          return (
            <li key={i}>
              <button
                onClick={() => pilih(i)}
                disabled={selected !== null}
                className={`w-full rounded-xl border px-4 py-3.5 text-left transition ${gaya}`}
              >
                {opsi}
              </button>
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <div
          className={`mt-5 rounded-xl border p-4 ${
            selected === q.jawaban
              ? "border-green-300 bg-green-50"
              : "border-amber-300 bg-amber-50"
          }`}
        >
          <p className="font-semibold">
            {selected === q.jawaban ? "✅ Benar!" : "❌ Kurang tepat."}
          </p>
          <p className="mt-1 text-sm text-gray-700">{q.pembahasan}</p>
          <button onClick={lanjut} className={`${btn} mt-4`}>
            {last ? "Lihat skor →" : "Soal berikutnya →"}
          </button>
        </div>
      )}
    </div>
  );
}
