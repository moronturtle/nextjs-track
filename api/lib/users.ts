import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

// User latihan: nama + password yang di-hash.
// Password TIDAK pernah disimpan polos — yang disimpan "salt:hash".
export type User = {
  nama: string;
  hash: string;
  dibuatPada: string;
};

// --- Hashing password dengan scrypt (bawaan Node, tanpa library) ---

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function cocokPassword(password: string, tersimpan: string): boolean {
  const [salt, hash] = tersimpan.split(":");
  if (!salt || !hash) return false;
  const uji = scryptSync(password, salt, 64);
  const asli = Buffer.from(hash, "hex");
  // timingSafeEqual mencegah penyerang menebak password lewat lama respon.
  return uji.length === asli.length && timingSafeEqual(uji, asli);
}

// --- Penyimpanan: Upstash Redis di Vercel, file .data/users.json di lokal ---

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
    })
  : null;

const FILE_USERS = path.join(process.cwd(), ".data", "users.json");

async function bacaFile(): Promise<Record<string, User>> {
  try {
    const isi = await readFile(FILE_USERS, "utf8");
    return JSON.parse(isi) as Record<string, User>;
  } catch {
    return {};
  }
}

async function tulisFile(data: Record<string, User>) {
  await mkdir(path.dirname(FILE_USERS), { recursive: true });
  await writeFile(FILE_USERS, JSON.stringify(data, null, 2));
}

const kunci = (nama: string) => `users:${nama.toLowerCase()}`;

export async function cariUser(nama: string): Promise<User | null> {
  if (redis) {
    return await redis.get<User>(kunci(nama));
  }
  const data = await bacaFile();
  return data[kunci(nama)] ?? null;
}

async function simpanUser(user: User): Promise<void> {
  if (redis) {
    await redis.set(kunci(user.nama), user);
    return;
  }
  const data = await bacaFile();
  data[kunci(user.nama)] = user;
  await tulisFile(data);
}

// --- Operasi register dan login ---

export async function daftarUser(
  nama: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ada = await cariUser(nama);
  if (ada) {
    return { ok: false, error: "nama sudah dipakai, silakan login" };
  }
  await simpanUser({
    nama,
    hash: hashPassword(password),
    dibuatPada: new Date().toISOString(),
  });
  return { ok: true };
}

// Mengembalikan nama kalau nama+password cocok, null kalau tidak.
// Pesan error selalu sama supaya tidak membocorkan mana yang salah.
export async function verifikasiUser(
  nama: string,
  password: string,
): Promise<string | null> {
  const user = await cariUser(nama);
  if (!user || !cocokPassword(password, user.hash)) return null;
  return user.nama;
}
