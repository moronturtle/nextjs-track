import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex gap-4 border-b bg-white p-4">
      <Link href="/">Beranda</Link>
      <Link href="/todo">Todo</Link>
    </nav>
  );
}
