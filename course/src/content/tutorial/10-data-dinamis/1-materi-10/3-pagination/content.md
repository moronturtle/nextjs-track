---
type: lesson
title: "Pagination"
template: baca
previews: false
terminal: false
focus: /project/app/todo/_components/todo-pagination.tsx
---

# Langkah 3: pagination — data dibagi per halaman

Kalau datamu nanti berisi seribu tugas, menampilkan semuanya sekaligus tidak masuk akal — layar penuh dan request berat. Pagination membagi data menjadi halaman-halaman kecil: `?page=2&limit=5` meminta "halaman kedua, lima item per halaman".

## Server yang memotong, kita yang menyimpan nomor halaman

Konsepnya hanya dua state baru di Provider — `page` dan info dari server:

```tsx
const [page, setPage] = useState(1);
const [totalHalaman, setTotalHalaman] = useState(1);

const muat = useCallback(async () => {
  // ...
  const data = await api.bacaTodos(OWNER, { q, status, page, limit: 5 });
  setTodos(data.todos);
  setTotal(data.total);
  setTotalHalaman(data.totalHalaman);
  // ...
}, [q, status, page]);
```

Karena `page` ada di dependency `muat`, mengganti halaman = request baru dengan `?page=` baru. Server mengirim **hanya lima item** untuk halaman itu — browser tidak pernah menerima seribu sekaligus.

Satu detail penting: saat `q` atau `status` berubah, `page` harus kembali ke `1`. Kalau tidak, kamu bisa minta "halaman 3" dari pencarian yang cuma punya satu halaman. Karena itu `setQ` dan `setStatus` di Provider ikut memanggil `setPage(1)`.

## Komponen tombol halaman

Buka `project/app/todo/_components/todo-pagination.tsx`:

```tsx
export default function TodoPagination({
  page,
  totalHalaman,
  saatPindah,
}: {
  page: number;
  totalHalaman: number;
  saatPindah: (page: number) => void;
}) {
  return (
    <div className={styles.pagination}>
      <button disabled={page <= 1} onClick={() => saatPindah(page - 1)}>
        ← Sebelumnya
      </button>
      <span>
        Halaman {page} dari {totalHalaman}
      </span>
      <button disabled={page >= totalHalaman} onClick={() => saatPindah(page + 1)}>
        Berikutnya →
      </button>
    </div>
  );
}
```

Angka `totalHalaman` datang dari server — komponen tidak menghitung apa pun. Tombol "Sebelumnya" mati di halaman 1; "Berikutnya" mati di halaman terakhir.

:::tip{title="Infinite scroll?"}
Kurikulum menyebut infinite scroll — ide yang sama, beda pemicu: alih-alih tombol, request halaman berikutnya dikirim saat pengguna menggulir ke bawah dan daftarnya **ditambah** ke bawah (bukan diganti). Setelah paham `page` + `limit`, infinite scroll tinggal mengganti tombol dengan deteksi scroll — konsep datanya sama persis.
:::

## Buktikan sendiri

Data awal berisi 12 todo dengan `limit=5` → ada 3 halaman. Tekan "Berikutnya" → request `page=2` berangkat → 5 item berikutnya tampil. Tekan "Belum selesai" di halaman 3 → daftar melompat ke halaman 1 karena `setStatus` mengembalikan `page` ke 1.

## Ringkasan

- ✅ `?page=N&limit=M` meminta server memotong data — browser tidak menerima semuanya.
- ✅ `total` dan `totalHalaman` dari server menghidupkan tombol halaman.
- ✅ Mengganti `q`/`status` harus mengembalikan `page` ke 1 — halaman lama belum tentu ada di hasil baru.
- ✅ Infinite scroll = konsep yang sama, pemicunya scroll bukan tombol.

Selanjutnya quiz, lalu tugas — daftar Todo-mu dapat pencarian dan pagination sungguhan.
