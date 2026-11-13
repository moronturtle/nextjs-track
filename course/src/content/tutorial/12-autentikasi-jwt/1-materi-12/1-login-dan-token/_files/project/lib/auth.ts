import { API_URL } from "./todo-api";

// Token disimpan di localStorage supaya tetap ada setelah halaman di-refresh.
const KUNCI_TOKEN = "token";

export function bacaToken(): string | null {
  return localStorage.getItem(KUNCI_TOKEN);
}

async function mintaToken(alamat: string, nama: string, password: string) {
  const res = await fetch(`${API_URL}${alamat}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Gagal");
  }
  localStorage.setItem(KUNCI_TOKEN, data.token);
}

export function daftar(nama: string, password: string): Promise<void> {
  return mintaToken("/api/auth/register", nama, password);
}

export function masuk(nama: string, password: string): Promise<void> {
  return mintaToken("/api/auth/login", nama, password);
}

export function keluar(): void {
  localStorage.removeItem(KUNCI_TOKEN);
}
