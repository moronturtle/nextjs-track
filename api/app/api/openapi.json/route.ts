import { jsonDenganCors, preflight } from "@/lib/cors";
import { spesifikasiOpenApi } from "@/lib/openapi";

export async function GET(request: Request) {
  return jsonDenganCors(request, spesifikasiOpenApi);
}

export async function OPTIONS(request: Request) {
  return preflight(request);
}
