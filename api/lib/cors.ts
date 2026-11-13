// Origin yang boleh mengakses API dari browser:
// - localhost dan 127.0.0.1 di port berapa pun (project murid, playground, api lokal)
// - semua subdomain vercel.app (deploy murid di materi 16, deploy course)
// - WebContainer/StackBlitz (editor course di browser)
const POLA_ORIGIN_DIIZINKAN = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https?:\/\/[\w-]+(\.[\w-]+)*\.vercel\.app$/,
  /^https?:\/\/[\w-]+(\.[\w-]+)*\.webcontainer\.io$/,
  /^https?:\/\/[\w-]+(\.[\w-]+)*\.stackblitz\.io$/,
];

function originDiizinkan(origin: string): boolean {
  return POLA_ORIGIN_DIIZINKAN.some((pola) => pola.test(origin));
}

export function headersCors(request: Request): HeadersInit {
  const origin = request.headers.get("origin");

  // Request tanpa Origin (curl, server ke server) selalu boleh.
  // "null" membuat browser menolak origin yang tidak ada di daftar.
  const allowOrigin = !origin ? "*" : originDiizinkan(origin) ? origin : "null";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function jsonDenganCors(
  request: Request,
  data: unknown,
  init?: ResponseInit,
): Response {
  return Response.json(data, {
    ...init,
    headers: { ...headersCors(request), ...(init?.headers ?? {}) },
  });
}

export function preflight(request: Request): Response {
  return new Response(null, { status: 204, headers: headersCors(request) });
}
