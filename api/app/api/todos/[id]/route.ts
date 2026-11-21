import { ambilTodo, hapusTodo, ubahTodo } from "@/lib/store";
import { ownerDari } from "@/lib/auth";
import { headersCors, jsonDenganCors, preflight } from "@/lib/cors";
import type { Todo } from "@/lib/types";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const owner = await ownerDari(request);
  const { id } = await params;
  const todo = await ambilTodo(owner, Number(id));

  if (!todo) {
    return jsonDenganCors(
      request,
      { error: "Todo tidak ditemukan" },
      { status: 404 },
    );
  }
  return jsonDenganCors(request, todo);
}

async function ubah(
  request: Request,
  { params }: Context,
  mode: "PATCH" | "PUT",
) {
  const owner = await ownerDari(request);
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonDenganCors(
      request,
      { error: "Body harus berupa JSON" },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return jsonDenganCors(
      request,
      { error: "Body harus berupa objek Todo" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  const punyaTeks = "teks" in data;
  const punyaStatus = "selesai" in data;

  if (mode === "PUT" && (!punyaTeks || !punyaStatus)) {
    return jsonDenganCors(
      request,
      { error: "PUT wajib mengirim teks dan selesai" },
      { status: 400 },
    );
  }

  const perubahan: Partial<Pick<Todo, "teks" | "selesai">> = {};

  if (punyaTeks) {
    if (typeof data.teks !== "string" || data.teks.trim().length < 3) {
      return jsonDenganCors(
        request,
        { error: "teks harus berupa teks minimal 3 karakter" },
        { status: 400 },
      );
    }
    perubahan.teks = data.teks.trim();
  }
  if (punyaStatus) {
    if (typeof data.selesai !== "boolean") {
      return jsonDenganCors(
        request,
        { error: "selesai harus berupa boolean (true atau false)" },
        { status: 400 },
      );
    }
    perubahan.selesai = data.selesai;
  }

  if (Object.keys(perubahan).length === 0) {
    return jsonDenganCors(
      request,
      { error: "Tidak ada field yang diedit. Kirim teks atau selesai di body" },
      { status: 400 },
    );
  }

  const todo = await ubahTodo(owner, Number(id), perubahan);
  if (!todo) {
    return jsonDenganCors(
      request,
      { error: "Todo tidak ditemukan" },
      { status: 404 },
    );
  }
  return jsonDenganCors(request, todo);
}

export async function PATCH(request: Request, context: Context) {
  return ubah(request, context, "PATCH");
}

export async function PUT(request: Request, context: Context) {
  return ubah(request, context, "PUT");
}

export async function DELETE(request: Request, { params }: Context) {
  const owner = await ownerDari(request);
  const { id } = await params;

  const berhasil = await hapusTodo(owner, Number(id));
  if (!berhasil) {
    return jsonDenganCors(
      request,
      { error: "Todo tidak ditemukan" },
      { status: 404 },
    );
  }
  return new Response(null, { status: 204, headers: headersCors(request) });
}

export async function OPTIONS(request: Request) {
  return preflight(request);
}
