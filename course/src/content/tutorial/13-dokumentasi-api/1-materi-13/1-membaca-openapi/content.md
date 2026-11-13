---
type: lesson
title: "Pertemuan 13 — Membaca OpenAPI"
template: baca
previews: false
terminal: false
focus: /project/contoh-openapi.json
---

# Pertemuan 13 — Dokumentasi API

Selama enam pertemuan kamu mengetahui endpoint API latihan dari materi. Di kerja nyata, tidak ada mentor yang menjelaskan satu per satu — yang ada adalah **dokumentasi API**. Pertemuan ini mengajari caramu membacanya.

## OpenAPI: kontrak tertulis sebuah API

**OpenAPI** adalah format standar (JSON) untuk menuliskan seluruh kontrak sebuah API: alamat apa yang ada, method apa yang diterima, parameter apa yang dibutuhkan, dan jawaban apa yang dikembalikan. Satu file `openapi.json` menjawab semua pertanyaan itu — tanpa membaca kode servernya.

API latihan kita menyediakannya di `GET /api/openapi.json`. Buka `project/contoh-openapi.json` — potongan nyata dari file tersebut.

## Bagian-bagian yang kamu baca

```json
{
  "openapi": "3.0.3",
  "info": { "title": "API Latihan Todo", "version": "1.0.0" },
  "paths": {
    "/api/todos": {
      "get": {
        "summary": "Daftar todo",
        "parameters": [
          { "name": "q", "in": "query", "schema": { "type": "string" } },
          { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["semua", "belum", "selesai"] } },
          { "name": "page", "in": "query", "schema": { "type": "number" } }
        ],
        "responses": {
          "200": { "description": "Daftar todo dalam satu halaman", ... }
        }
      },
      "post": {
        "requestBody": { "content": { "application/json": { "schema": { "$ref": "#/components/schemas/TodoInput" } } } },
        "responses": {
          "201": { "description": "Todo berhasil dibuat" },
          "400": { "description": "Validasi gagal" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Todo": {
        "properties": {
          "id": { "type": "number" },
          "teks": { "type": "string" },
          "selesai": { "type": "boolean" }
        }
      }
    }
  }
}
```

Cara membacanya:

| Bagian | Menjawab pertanyaan |
| --- | --- |
| `paths` → `"/api/todos"` → `get`/`post` | Alamat dan method apa yang ada? |
| `parameters` | Query/path parameter apa, wajib atau tidak, tipe apa, nilai yang diizinkan (`enum`)? |
| `requestBody` → `schema` | Body JSON apa yang harus dikirim? |
| `responses` → `200`/`201`/`400`/`404` | Kode apa yang kembali, dan isinya seperti apa? |
| `components` → `schemas` | Bentuk tiap objek (`Todo` punya `id`, `teks`, `selesai`)? |
| `components` → `securitySchemes` → `bearerAuth` | Bagaimana cara autentikasi? |

`"$ref": "#/components/schemas/Todo"` adalah rujukan — artinya "bentuknya sama dengan definisi `Todo` di bawah", jadi tidak ditulis ulang di tiap endpoint.

## Kenapa kontrak tertulis penting?

- **Frontend tidak menebak** — parameter `status` punya `enum: ["semua","belum","selesai"]`; kamu tahu `"done"` akan ditolak `400` tanpa mencoba.
- **Satu sumber kebenaran** — frontend dan backend membaca dokumen yang sama, bukan ingatan masing-masing.
- **Mesin bisa ikut membaca** — dari file ini, alat bisa membuat dokumentasi interaktif, klien otomatis, bahkan tes.

## Buktikan sendiri

Buka `http://localhost:3001/api/openapi.json` di browser. Temukan `paths → /api/todos/{id} → patch` — baca `requestBody`-nya: field apa saja yang boleh diubah? Cocokkan dengan yang kamu kirim di `ubahTodo` — persis sama.

## Ringkasan

- ✅ OpenAPI = kontrak tertulis API dalam satu file JSON standar.
- ✅ `paths` menjawab "alamat + method", `parameters`/`requestBody` menjawab "kirim apa", `responses` menjawab "kembali apa".
- ✅ `components/schemas` adalah definisi bentuk data yang dipakai ulang via `$ref`.
- ✅ `securitySchemes` memberi tahu cara autentikasi — `bearerAuth` = header `Authorization: Bearer`.

File JSON mentah itu sulit dibaca manusia — berikutnya kita lihat bentuk ramahnya: Swagger UI di `/docs`.
