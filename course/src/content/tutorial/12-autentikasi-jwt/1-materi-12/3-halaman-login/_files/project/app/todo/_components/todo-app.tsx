"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Tombol from "@/components/tombol";
import { bacaToken, keluar } from "@/lib/auth";
import { useTodos } from "@/contexts/todo-context";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import TodoPagination from "./todo-pagination";

export default function TodoApp() {
  const {
    todos,
    total,
    sedangMemuat,
    error,
    q,
    setQ,
    status,
    setStatus,
    page,
    totalHalaman,
    setPage,
    tambahTodo,
    ubahSelesai,
    hapusTodo,
  } = useTodos();
  const [adaToken, setAdaToken] = useState(false);

  useEffect(() => {
    setAdaToken(bacaToken() !== null);
  }, []);

  if (!adaToken) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          Masuk dulu untuk melihat daftar tugasmu.
        </p>
        <Link
          href="/login"
          className="mt-2 inline-block text-sm font-medium text-indigo-600"
        >
          Ke halaman login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex justify-end">
        <Tombol
          varian="netral"
          onClick={() => {
            keluar();
            window.location.assign("/login");
          }}
        >
          Keluar
        </Tombol>
      </div>
      <TodoForm saatTambah={tambahTodo} />
      <input
        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Cari tugas..."
        aria-label="Cari tugas"
      />
      <TodoFilter pilihan={status} saatPilih={setStatus} />
      {sedangMemuat ? (
        <p className="text-sm text-slate-500">Memuat daftar tugas dari server...</p>
      ) : error ? (
        <p className="text-sm text-rose-600">{error}</p>
      ) : (
        <>
          <TodoList todos={todos} saatDicentang={ubahSelesai} saatDihapus={hapusTodo} />
          <TodoPagination page={page} totalHalaman={totalHalaman} saatPindah={setPage} />
        </>
      )}
      <p className="text-sm text-slate-500">{total} tugas cocok dengan pencarian</p>
    </div>
  );
}
