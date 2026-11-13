import { ownerDari } from "@/lib/auth";
import { jsonDenganCors, preflight } from "@/lib/cors";
import { daftarTodos, tambahTodo } from "@/lib/store";
import type { StatusTodo } from "@/lib/types";

const STATUS_DIIZINKAN: StatusTodo[] = ["semua", "belum", "selesai"];

export async function GET(request: Request) {
  const owner = await ownerDari(request);
  const url = new URL(request.url);

  const status = url.searchParams.get("status") ?? "semua";
  if (!STATUS_DIIZINKAN.includes(status as StatusTodo)) {
    return jsonDenganCors(
      request,
      { error: "status harus salah satu dari: semua, belum, selesai" },
      { status: 400 },
    );
  }

  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit")) || 100));
  const q = url.searchParams.get("q")?.trim() ?? "";

  const hasil = await daftarTodos(owner, {
    q,
    status: status as StatusTodo,
    page,
    limit,
  });

  return jsonDenganCors(request, hasil);
}

export async function POST(request: Request) {
  const owner = await ownerDari(request);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonDenganCors(
      request,
      { error: "Body harus berupa JSON, misalnya {\"teks\": \"Belajar fetch\"}" },
      { status: 400 },
    );
  }

  const teks =
    typeof body === "object" && body !== null && "teks" in body && typeof body.teks === "string"
      ? body.teks.trim()
      : "";

  if (teks.length < 3) {
    return jsonDenganCors(
      request,
      { error: "teks wajib diisi dan minimal 3 karakter" },
      { status: 400 },
    );
  }

  const todo = await tambahTodo(owner, teks);
  return jsonDenganCors(request, todo, { status: 201 });
}

export async function OPTIONS(request: Request) {
  return preflight(request);
}
