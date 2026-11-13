---
type: lesson
title: "Cari dan filter ke server"
template: baca
previews: false
terminal: false
focus: /project/contexts/todo-context.tsx
---

# Langkah 2: kotak cari dan filter tersambung ke server

Sekarang `q` dan `status` menjadi state — setiap berubah, request baru berangkat dan daftar berganti. Buka `project/contexts/todo-context.tsx`.

## Provider memegang parameter pencarian

```tsx
const [q, setQ] = useState("");
const [status, setStatus] = useState<FilterTodo>("semua");

const muat = useCallback(async () => {
  setSedangMemuat(true);
  setError(null);
  try {
    const data = await api.bacaTodos(OWNER, { q, status });
    setTodos(data.todos);
    setTotal(data.total);
  } catch {
    setError("Gagal memuat daftar tugas dari server");
  } finally {
    setSedangMemuat(false);
  }
}, [q, status]);

useEffect(() => {
  const timer = setTimeout(muat, 300);
  return () => clearTimeout(timer);
}, [muat]);
```

Alurnya berantai:

1. Kamu mengetik di kotak cari → `setQ` berubah.
2. `muat` dibuat ulang (dependency `[q, status]`) → `useEffect` berjalan.
3. `muat` mengirim request dengan `?q=...&status=...` → hasil masuk `setTodos`.

`q` dan `status` ikut dibagikan lewat Context — komponen mana pun bisa mengubah pencariannya.

## Jeda 300 ms: debounce

Perhatikan `setTimeout(muat, 300)` di `useEffect`. Teknik ini namanya **debounce** — "tunggu sebentar, batalkan kalau ada yang baru":

- Kamu mengetik "b" → timer 300 ms mulai.
- Sebelum habis kamu mengetik "be" → timer lama **dibatalkan** (`clearTimeout` saat cleanup), timer baru mulai.
- Request baru berangkat setelah kamu berhenti mengetik 300 ms.

Tanpa debounce, setiap huruf = satu request. Mengetik "belajar" mengirim 7 request yang 6 di antaranya tidak berguna.

## Setelah mengubah, minta ulang

`tambahTodo`, `ubahSelesai`, dan `hapusTodo` sekarang memanggil `muat()` setelah request-nya sukses — bukan menyunting `todos` sendiri:

```tsx
const tambahTodo = useCallback(async (teks: string) => {
  await api.tambahTodo(OWNER, teks);
  await muat(); // minta ulang daftar terbaru dari server
}, [muat]);
```

Kenapa? Karena daftar sekarang **milik server** — filter `status` atau kata `q` yang sedang aktif menentukan apa yang tampil. Cara paling pasti agar layar selalu benar adalah minta ulang ke server setelah setiap perubahan.

## TodoApp tinggal menyambungkan

Di `app/todo/_components/todo-app.tsx`, filter `useMemo` lokal digantikan kotak cari + tombol status yang mengubah state di Context:

```tsx
const { todos, sedangMemuat, error, q, setQ, status, setStatus } = useTodos();

<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari tugas..." />
<TodoFilter pilihan={status} saatPilih={setStatus} />
```

Daftar `todos` dari Context sudah hasil saringan server — tidak perlu `useMemo` lagi. Dan ada keadaan baru yang perlu tampilan sendiri: **hasil kosong** — server menjawab `todos: []` saat pencarian tidak menemukan apa pun. `TodoList` sudah menampilkannya.

## Buktikan sendiri

- Buka DevTools → Network → ketik pelan-pelan di kotak cari — request baru berangkat hanya setelah kamu berhenti mengetik.
- Tekan "Belum selesai" → request berisi `status=belum` → daftar hanya berisi yang belum.
- Cari kata yang tidak ada → server menjawab `todos: []` → layar menampilkan keadaan kosong.

## Ringkasan

- ✅ `q` dan `status` jadi state di Context → berubah → refetch.
- ✅ Debounce 300 ms menahan request sampai pengguna berhenti mengetik.
- ✅ Mutasi memanggil `muat()` — minta ulang daftar lebih pasti daripada menyunting state sendiri.
- ✅ Hasil kosong adalah keadaan sah yang perlu tampilannya sendiri.

Daftar sudah bisa dicari dan difilter. Berikutnya: pagination — supaya seribu tugas tidak ditampilkan sekaligus.
