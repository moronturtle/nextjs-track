export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <p className="bg-slate-100 px-6 py-2 text-sm text-slate-600">
        Bagian: Blog — strip ini hanya tampil di halaman-halaman /blog
      </p>
      {children}
    </section>
  );
}
