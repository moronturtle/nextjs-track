// CONTOH sisi server — bukan untuk disalin ke project murid.
// Gambaran Route Handler Next.js untuk login dengan refresh token
// di cookie httpOnly, plus rotasi refresh token.

// === POST /api/auth/login ===
// Login: access token pendek di body + refresh token di cookie httpOnly.
// Nama+password diverifikasi terhadap user tersimpan (hash) — sama seperti API latihan.
export async function POST_login(request: Request) {
  const { nama, password } = await request.json();
  if (typeof nama !== "string" || nama.trim().length < 3) {
    return Response.json({ error: "nama wajib diisi" }, { status: 400 });
  }
  if (!(await verifikasiUser(nama, password))) {
    return Response.json({ error: "nama atau password salah" }, { status: 401 });
  }

  const accessToken = await buatToken(nama, "15m"); // umur pendek
  const refreshToken = await buatToken(nama, "30d"); // umur panjang
  await simpanRefresh(refreshToken, nama); // server mencatat refresh aktif

  const res = Response.json({ accessToken, nama });
  res.headers.set(
    "Set-Cookie",
    [
      `rt=${refreshToken}`,
      "HttpOnly", // tidak bisa dibaca JavaScript
      "Secure", // hanya HTTPS
      "SameSite=Lax", // tidak dikirim dari situs lain (anti-CSRF)
      "Path=/api/auth", // hanya terkirim ke endpoint auth
      "Max-Age=2592000", // 30 hari
    ].join("; "),
  );
  return res;
}

// === POST /api/auth/refresh ===
// Rotasi: baca rt dari cookie → verifikasi masih yang terbaru →
// terbitkan (a2, r2) dan hanguskan r1.
export async function POST_refresh(request: Request) {
  const rt = bacaCookie(request, "rt");
  if (!rt) return Response.json({ error: "tidak ada sesi" }, { status: 401 });

  const nama = await verifikasiToken(rt).catch(() => null);
  const masihAktif = nama && (await refreshMasihTerbaru(rt, nama));
  if (!masihAktif) {
    // rt lama dipakai lagi — bisa jadi dicuri. Cabut rangkaian sesinya.
    if (nama) await cabutSemuaRefresh(nama);
    return Response.json({ error: "sesi tidak valid" }, { status: 401 });
  }

  const accessToken = await buatToken(nama, "15m");
  const refreshBaru = await buatToken(nama, "30d");
  await gantiRefresh(rt, refreshBaru, nama); // r1 hangus, r2 tercatat

  const res = Response.json({ accessToken });
  res.headers.set(
    "Set-Cookie",
    `rt=${refreshBaru}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=2592000`,
  );
  return res;
}

// === POST /api/auth/logout ===
// Hapus catatan refresh + hapus cookie.
export async function POST_logout(request: Request) {
  const rt = bacaCookie(request, "rt");
  if (rt) await hapusRefresh(rt);

  const res = Response.json({ ok: true });
  res.headers.set("Set-Cookie", "rt=; HttpOnly; Secure; Path=/api/auth; Max-Age=0");
  return res;
}

// --- Fungsi bantu yang dibayangkan (isinya tergantung penyimpananmu) ---
declare function buatToken(nama: string, umur: string): Promise<string>;
declare function verifikasiToken(token: string): Promise<string>;
declare function simpanRefresh(token: string, nama: string): Promise<void>;
declare function refreshMasihTerbaru(token: string, nama: string): Promise<boolean>;
declare function gantiRefresh(lama: string, baru: string, nama: string): Promise<void>;
declare function cabutSemuaRefresh(nama: string): Promise<void>;
declare function hapusRefresh(token: string): Promise<void>;
declare function bacaCookie(request: Request, nama: string): string | null;
declare function verifikasiUser(nama: string, password: string): Promise<boolean>;
