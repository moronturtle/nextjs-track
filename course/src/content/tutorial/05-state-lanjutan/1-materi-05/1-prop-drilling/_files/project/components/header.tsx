import MenuProfil from "@/components/menu-profil";

export default function Header({ namaUser }: { namaUser: string }) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="font-bold">Blog Saya</span>
      <MenuProfil namaUser={namaUser} />
    </header>
  );
}
