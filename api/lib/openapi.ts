// Spesifikasi OpenAPI untuk semua endpoint. Ditampilkan di /docs lewat Swagger UI
// dan tersedia mentah di /api/openapi.json.
export const spesifikasiOpenApi = {
  openapi: "3.0.3",
  info: {
    title: "API Latihan Todo",
    version: "1.0.0",
    description:
      "API latihan untuk materi pertemuan 07–13. Setiap murid memakai parameter " +
      "`owner` dengan namanya sendiri supaya datanya tidak bercampur. " +
      "Setelah login, `owner` diambil dari token sehingga `?owner=` tidak perlu dikirim.",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token dari POST /api/auth/login. Kirim sebagai `Authorization: Bearer <token>`.",
      },
    },
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: { type: "number", example: 1 },
          teks: { type: "string", example: "Belajar dasar fetch" },
          selesai: { type: "boolean", example: false },
        },
      },
      DaftarTodos: {
        type: "object",
        properties: {
          todos: { type: "array", items: { $ref: "#/components/schemas/Todo" } },
          total: { type: "number", example: 12 },
          page: { type: "number", example: 1 },
          limit: { type: "number", example: 10 },
          totalHalaman: { type: "number", example: 2 },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string", example: "teks wajib diisi dan minimal 3 karakter" },
        },
      },
    },
    parameters: {
      owner: {
        name: "owner",
        in: "query",
        description: "Nama pemilik data. Tidak perlu dikirim jika memakai token JWT.",
        schema: { type: "string", example: "budi" },
      },
    },
  },
  paths: {
    "/api/todos": {
      get: {
        summary: "Daftar todo",
        description:
          "Mengambil daftar todo milik owner. Mendukung pagination, pencarian, dan filter status.",
        parameters: [
          { $ref: "#/components/parameters/owner" },
          {
            name: "page",
            in: "query",
            description: "Nomor halaman, mulai dari 1.",
            schema: { type: "number", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Jumlah item per halaman (maksimal 50).",
            schema: { type: "number", default: 100 },
          },
          {
            name: "q",
            in: "query",
            description: "Cari todo yang teksnya mengandung kata ini.",
            schema: { type: "string" },
          },
          {
            name: "status",
            in: "query",
            description: "Filter berdasarkan status pengerjaan.",
            schema: { type: "string", enum: ["semua", "belum", "selesai"], default: "semua" },
          },
        ],
        responses: {
          "200": {
            description: "Daftar todo beserta info pagination.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/DaftarTodos" } },
            },
          },
          "400": {
            description: "Parameter tidak valid.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      post: {
        summary: "Tambah todo",
        parameters: [{ $ref: "#/components/parameters/owner" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["teks"],
                properties: {
                  teks: { type: "string", example: "Mengerjakan tugas pertemuan 08" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Todo baru berhasil dibuat.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Todo" } } },
          },
          "400": {
            description: "Body tidak valid.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/api/todos/{id}": {
      get: {
        summary: "Detail satu todo",
        parameters: [
          { $ref: "#/components/parameters/owner" },
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": {
            description: "Data todo.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Todo" } } },
          },
          "404": {
            description: "Todo tidak ditemukan.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      patch: {
        summary: "Ubah todo",
        description: "Mengubah `teks` dan/atau `selesai`. PUT juga tersedia dengan perilaku sama.",
        parameters: [
          { $ref: "#/components/parameters/owner" },
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  teks: { type: "string" },
                  selesai: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Todo setelah diubah.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Todo" } } },
          },
          "400": {
            description: "Body tidak valid.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Todo tidak ditemukan.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        summary: "Hapus todo",
        parameters: [
          { $ref: "#/components/parameters/owner" },
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "204": { description: "Todo berhasil dihapus (tanpa body)." },
          "404": {
            description: "Todo tidak ditemukan.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        summary: "Register akun baru",
        description:
          "Membuat akun nama+password lalu langsung membalas token JWT — " +
          "register sekaligus login. Password disimpan sebagai hash, " +
          "tidak pernah disimpan polos.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nama", "password"],
                properties: {
                  nama: { type: "string", example: "budi" },
                  password: { type: "string", example: "rahasia123" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Akun dibuat dan token JWT diterbitkan.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    nama: { type: "string", example: "budi" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validasi gagal (nama/password terlalu pendek).",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "Nama sudah dipakai.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login dengan nama dan password",
        description:
          "Memverifikasi nama+password lalu membalas token JWT. Nama di dalam " +
          "token menjadi owner untuk request berikutnya, jadi `?owner=` tidak " +
          "perlu dikirim lagi.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nama", "password"],
                properties: {
                  nama: { type: "string", example: "budi" },
                  password: { type: "string", example: "rahasia123" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Token JWT dan nama pemiliknya.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    nama: { type: "string", example: "budi" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Body tidak valid.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "401": {
            description: "Nama atau password salah.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
  },
} as const;
