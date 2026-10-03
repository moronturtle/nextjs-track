// Server statis mini — tanpa dependency, cuma Node.js bawaan.
// Tugasnya cuma satu: kirim file .html apa adanya ke browser.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jsx": "text/javascript",
  ".mjs": "text/javascript",
  ".tsx": "text/plain",
  ".svg": "image/svg+xml",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = path.join(__dirname, urlPath);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 — halaman nggak ketemu");
        return;
      }
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(file)] || "text/plain",
      });
      // Alat bantu demo: {{WAKTU}} di file .html diganti jam server,
      // jadi murid bisa melihat bukti bahwa tiap pindah halaman = request baru.
      if (file.endsWith(".html")) {
        const now = new Date();
        const pad = (n, len = 2) => String(n).padStart(len, "0");
        const waktu = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
        data = data.toString().replaceAll("{{WAKTU}}", waktu);
      }
      res.end(data);
    });
  })
  .listen(PORT, () =>
    console.log(`Demo server jalan → http://localhost:${PORT}`)
  );
