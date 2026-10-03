export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Selamat Datang!</h1>
      <p className="mt-4">
        Ini mini site hasil latihan pertemuan 01. Ada 4 route:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-6">
        <li>
          <code>/tentang</code> — dari <code>app/tentang/page.tsx</code>
        </li>
        <li>
          <code>/blog</code> — dari <code>app/blog/page.tsx</code>
        </li>
        <li>
          <code>/kontak</code> — dari <code>app/kontak/page.tsx</code>
        </li>
        <li>
          <code>/quiz</code> — quiz interaktif
        </li>
      </ul>
      <p className="mt-4 text-sm text-gray-500">
        Nav di atas ditulis sekali di app/layout.tsx, tapi muncul di semua
        halaman — itulah gunanya layout.
      </p>
    </main>
  );
}
