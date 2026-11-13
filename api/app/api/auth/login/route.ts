import { buatToken } from "@/lib/auth";
import { jsonDenganCors, preflight } from "@/lib/cors";
import { verifikasiUser } from "@/lib/users";

// Login latihan: kirim nama + password, dapat token JWT.
// Password dicek terhadap hash yang disimpan saat register —
// server tidak pernah tahu password aslinya.
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

  const cocok = await verifikasiUser(nama, password);
  if (!cocok) {
    return jsonDenganCors(request, { error: "nama atau password salah" }, { status: 401 });
  }

  const token = await buatToken(cocok);
  return jsonDenganCors(request, { token, nama: cocok });
}

export async function OPTIONS(request: Request) {
  return preflight(request);
}
