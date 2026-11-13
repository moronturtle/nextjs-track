import { SignJWT, jwtVerify } from "jose";

const RAHASIA = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "rahasia-dev-lokal-ganti-di-vercel",
);

export async function buatToken(nama: string): Promise<string> {
  return new SignJWT({ nama })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(RAHASIA);
}

async function bacaToken(request: Request): Promise<string | null> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;

  try {
    const { payload } = await jwtVerify(header.slice(7), RAHASIA);
    return typeof payload.nama === "string" ? payload.nama : null;
  } catch {
    return null;
  }
}

// Owner diambil dari token JWT kalau ada; kalau tidak, dari ?owner=.
// Tanpa keduanya, pakai "demo" supaya contoh sederhana tetap jalan.
export async function ownerDari(request: Request): Promise<string> {
  const dariToken = await bacaToken(request);
  if (dariToken) return dariToken;

  const owner = new URL(request.url).searchParams.get("owner");
  return owner?.trim() || "demo";
}
