---
type: lesson
title: useCallback
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# `useCallback`: gunakan kembali fungsi

Di lesson sebelumnya, `useMemo` menyimpan hasil penyaringan daftar Todo. Saat state berubah, React merender ulang komponen, yaitu menjalankan komponen lagi untuk memperbarui tampilannya.

`useCallback` membantu menjaga fungsi yang dikirim ke komponen anak tetap sama selama dependency-nya tidak berubah.

## Daftar Todo disimpan oleh Context

Daftar Todo perlu tersedia di halaman daftar dan halaman detail. Kita simpan daftarnya di `TodoProvider`, lalu komponen membaca data lewat hook `useTodos`.

Buka `project/contexts/todo-context.tsx`:

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TODO_AWAL } from "@/data/todo";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  ubahSelesai: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(TODO_AWAL);

  const ubahSelesai = useCallback((id: number) => {
    setTodos((daftarLama) =>
      daftarLama.map((todo) =>
        todo.id === id ? { ...todo, selesai: !todo.selesai } : todo,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ todos, ubahSelesai }),
    [todos, ubahSelesai],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }
  return context;
}
```

`setTodos` menerima fungsi yang mendapat daftar terbaru lewat `daftarLama`. Karena `ubahSelesai` tidak membaca `todos` dari luar fungsi, daftar dependency `[]` tetap kosong. Setter dari `useState` tetap sama selama komponen berjalan.

`useMemo` menjaga object `value` tetap sama jika daftar dan fungsi `ubahSelesai` tidak berubah. Provider membagikan object ini ke komponen di dalamnya.

## Komponen anak menerima fungsi

Buka `project/app/todo/_components/todo-app.tsx`. `TodoApp` membaca data Context, lalu mengirim data dan fungsi ke `TodoItem`:

```tsx
"use client";

import { useTodos } from "@/contexts/todo-context";
import TodoItem from "./todo-item";

export default function TodoApp() {
  const { todos, ubahSelesai } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          saatDicentang={ubahSelesai}
        />
      ))}
    </ul>
  );
}
```

Di `project/app/todo/_components/todo-item.tsx`, komponen anak memanggil fungsi tersebut saat kotak centang ditekan:

```tsx
onChange={() => saatDicentang(todo.id)}
```

`memo(TodoItem)` membantu React melewati render ulang item yang props-nya tidak berubah. `useCallback` menjaga fungsi `ubahSelesai` tetap sama saat Context diperbarui.

## Kapan memakai `useCallback`?

Gunakan `useCallback` saat fungsi dikirim ke komponen anak yang memakai `memo`. Kalau fungsi tidak dikirim sebagai props atau komponen anak tidak memakai `memo`, biasanya kamu tidak perlu menambah `useCallback`.

## Ringkasan

- ✅ `useCallback` menjaga fungsi yang dikirim ke komponen anak tetap sama selama dependency-nya tetap sama.
- ✅ `TodoProvider` menyimpan daftar bersama; `useTodos` membagikan akses ke komponen.
- ✅ `memo` dapat melewati render ulang komponen anak jika props-nya tidak berubah.
- ❌ `useCallback` tidak perlu dipakai pada setiap fungsi.

Berikutnya, kita lihat susunan folder Todo dan tempat setiap bagian disimpan.
