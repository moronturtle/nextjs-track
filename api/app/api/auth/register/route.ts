import { buatToken } from "@/lib/auth";
import { jsonDenganCors, preflight } from "@/lib/cors";
import { daftarUser } from "@/lib/users";

// Register latihan: buat akun nama+password, langsung dapat token.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonDenganCors(
      request,
      { error: "Body harus berupa JSON, misalnya {\"nama\": \"budi\", \"password\": \"rahasia123\"}" },
      { status: 400 },
    );
  }

  const nama =
    typeof body === "object" && body !== null && "nama" in body && typeof body.nama === "string"
      ? body.nama.trim()
      : "";
  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof body.password === "string"
      ? body.password
      : "";

  if (nama.length < 3) {
    return jsonDenganCors(request, { error: "nama wajib diisi dan minimal 3 karakter" }, { status: 400 });
  }
  if (password.length < 6) {
    return jsonDenganCors(
      request,
      { error: "password wajib diisi dan minimal 6 karakter" },
      { status: 400 },
    );
  }

  const hasil = await daftarUser(nama, password);
  if (!hasil.ok) {
    return jsonDenganCors(request, { error: hasil.error }, { status: 409 });
  }

  const token = await buatToken(nama);
  return jsonDenganCors(request, { token, nama }, { status: 201 });
}

export async function OPTIONS(request: Request) {
  return preflight(request);
}
