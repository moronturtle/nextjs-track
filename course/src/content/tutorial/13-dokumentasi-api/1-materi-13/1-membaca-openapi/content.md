---
type: lesson
title: "Pertemuan 13 — Membaca OpenAPI"
template: baca
previews: false
terminal: false
focus: /project/contoh-openapi.json
---

# Pertemuan 13 — Membaca dokumentasi API

Di pertemuan sebelumnya, kita memakai alamat API yang sudah dijelaskan di materi. Saat bekerja, kita juga perlu tahu cara memakai API yang belum pernah kita coba. Biasanya, informasi itu tersedia di **dokumentasi API**.

## OpenAPI: panduan untuk memakai API

**OpenAPI** adalah format standar untuk menjelaskan cara memakai API. Dokumen OpenAPI mencatat alamat, jenis request, parameter, data yang perlu dikirim, dan jawaban dari server. Satu alamat untuk satu pekerjaan disebut **endpoint**. Method seperti `GET` dan `POST` menjelaskan jenis pekerjaan yang diminta. Dengan membaca dokumen ini, kita tidak perlu menebak bentuk request.

API latihan kita menyediakan dokumen OpenAPI di alamat berikut:

```text
https://nextjs-track-api.vercel.app/api/openapi.json
```

Buka `project/contoh-openapi.json` di panel File. File itu berisi contoh bagian penting dari dokumen OpenAPI API latihan.

## Bagian yang perlu kamu kenali

Cuplikan berikut diringkas agar mudah dibaca. Tanda `...` berarti ada bagian lain yang tidak ditampilkan.

```json
{
  "openapi": "3.0.3",
  "info": { "title": "API Latihan Todo", "version": "1.0.0" },
  "paths": {
    "/api/todos": {
      "get": {
        "summary": "Daftar todo",
        "parameters": [
          { "name": "owner", "in": "query", "schema": { "type": "string" } },
          { "name": "q", "in": "query", "schema": { "type": "string" } },
          { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["semua", "belum", "selesai"] } },
          { "name": "page", "in": "query", "schema": { "type": "number" } }
        ],
        "responses": {
          "200": { "description": "Daftar todo dalam satu halaman", ... }
        }
      },
      "post": {
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["teks"],
                "properties": { "teks": { "type": "string" } }
              }
            }
          }
        },
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

| Bagian                                          | Menjawab pertanyaan                                               |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| `paths` → `"/api/todos"` → `get`/`post`         | Alamat dan method apa yang ada?                                   |
| `parameters`                                    | Nilai tambahan apa yang bisa dikirim? Apakah pilihannya dibatasi? |
| `requestBody` → `schema`                        | Data JSON apa yang perlu dikirim?                                 |
| `responses` → `200`/`201`/`400`/`404`           | Kode apa yang bisa dijawab server?                                |
| `components` → `schemas`                        | Apa saja isi objek seperti `Todo`?                                |
| `components` → `securitySchemes` → `bearerAuth` | Bagaimana bentuk header token?                                    |

`"$ref": "#/components/schemas/Todo"` berarti bagian itu memakai bentuk data `Todo` yang dijelaskan di `components`. Bentuk yang sama tidak perlu ditulis berulang kali.

Parameter juga memberi tahu letak nilainya. Contohnya, `owner` berada di query, seperti `?owner=budi`. Sementara itu, `id` pada `/api/todos/{id}` berada di bagian path, seperti `/api/todos/5`.

## Kenapa dokumentasi ini berguna?

- Kita bisa melihat data apa yang perlu dikirim sebelum menulis kode.
- Frontend dan backend memakai panduan yang sama.
- Alat seperti Swagger UI bisa membaca OpenAPI dan membuat halaman untuk mencoba request.

## Buktikan sendiri

Buka `https://nextjs-track-api.vercel.app/api/openapi.json` di browser. Cari `paths` → `/api/todos/{id}` → `patch`. Lihat `requestBody`-nya. Di sana tertulis bahwa request boleh mengirim `teks`, `selesai`, atau keduanya. Cocokkan dengan data yang dikirim fungsi `ubahTodo`.

## Ringkasan

- ✅ OpenAPI menjelaskan cara mengirim request dan membaca jawaban API.
- ✅ `paths` berisi alamat; `parameters` dan `requestBody` menjelaskan data yang dikirim.
- ✅ `responses` menjelaskan jawaban server; `schemas` menjelaskan bentuk data.
- ✅ `bearerAuth` menjelaskan cara mengirim token lewat header `Authorization`.

Dokumen JSON lebih mudah dibaca oleh kode daripada manusia. Berikutnya kita buka Swagger UI, halaman yang menampilkan dokumentasi dalam bentuk yang lebih mudah dicoba.
