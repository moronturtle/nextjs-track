import type { Metadata } from "next";
import Quiz from "./Quiz";
import { questions } from "./questions";

export const metadata: Metadata = {
  title: "Quiz — Pertemuan 01",
};

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <p className="text-sm text-gray-500">Pertemuan 01</p>
      <h1 className="text-3xl font-bold">Quiz — Pengenalan Next.js</h1>
      <div className="mt-6">
        <Quiz questions={questions} />
      </div>
    </main>
  );
}
