// CONTOH sisi client — versi cookie + refresh token.
// Access token disimpan di memori (umurnya pendek); refresh token
// tidak pernah disentuh JavaScript karena ada di cookie httpOnly.

const API_URL = "http://localhost:3001";

let accessToken: string | null = null; // di memori, bukan localStorage

export function setAccessToken(token: string | null) {
  accessToken = token;
}

// Refresh sekali saja walau banyak request 401 berbarengan.
let janjiRefresh: Promise<boolean> | null = null;

async function segarkan(): Promise<boolean> {
  janjiRefresh ??= (async () => {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include", // cookie rt ikut terkirim
    });
    if (!res.ok) return false;
    const data = await res.json();
    accessToken = data.accessToken;
    return true;
  })().finally(() => {
    janjiRefresh = null;
  });
  return janjiRefresh;
}

export async function kirimRequest(alamat: string, init?: RequestInit): Promise<Response> {
  const headers = {
    ...init?.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let res = await fetch(`${API_URL}${alamat}`, { ...init, headers });

  // Access token kedaluwarsa → tukar lewat refresh cookie → ulangi sekali.
  if (res.status === 401 && (await segarkan())) {
    res = await fetch(`${API_URL}${alamat}`, {
      ...init,
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    });
  }

  return res;
}
