import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";
import type { Todo } from "./types";

// Di Vercel: pakai Upstash Redis (env wajib diisi).
// Di lokal tanpa env: pakai file .data/todos.json supaya bisa dicoba langsung.
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
    })
  : null;

const FILE_DATA = path.join(process.cwd(), ".data", "todos.json");

async function bacaFile(): Promise<Record<string, Todo[]>> {
  try {
    const isi = await readFile(FILE_DATA, "utf8");
    return JSON.parse(isi) as Record<string, Todo[]>;
  } catch {
    return {};
  }
}

async function tulisFile(data: Record<string, Todo[]>) {
  await mkdir(path.dirname(FILE_DATA), { recursive: true });
  await writeFile(FILE_DATA, JSON.stringify(data, null, 2));
}

const kunci = (owner: string) => `todos:${owner}`;

export async function bacaTodos(owner: string): Promise<Todo[] | null> {
  if (redis) {
    return await redis.get<Todo[]>(kunci(owner));
  }
  const data = await bacaFile();
  return data[kunci(owner)] ?? null;
}

export async function simpanTodos(owner: string, todos: Todo[]): Promise<void> {
  if (redis) {
    await redis.set(kunci(owner), todos);
    return;
  }
  const data = await bacaFile();
  data[kunci(owner)] = todos;
  await tulisFile(data);
}
