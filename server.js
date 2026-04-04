const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 3000);
const root = __dirname;
const runtimeConfig = {
  supabaseUrl: String(process.env.SUPABASE_URL || "").trim(),
  supabaseAnonKey: String(process.env.SUPABASE_ANON_KEY || "").trim()
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (path.basename(filePath) === "index.html") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<!doctype html><html><body><h1>Pathlight</h1><p>index.html is missing from this deployment.</p></body></html>");
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

function sendRuntimeConfig(res) {
  const payload = `window.PATHLIGHT_SUPABASE_CONFIG = Object.assign({}, window.PATHLIGHT_SUPABASE_CONFIG || {}, ${JSON.stringify({
    url: runtimeConfig.supabaseUrl,
    anonKey: runtimeConfig.supabaseAnonKey
  })});`;

  res.writeHead(200, {
    "Content-Type": "text/javascript; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/runtime-config.js") {
    sendRuntimeConfig(res);
    return;
  }

  const requestPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const safePath = path.normalize(requestPath).replace(/^\.\.(?:\\|\/|$)+/, "");
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(res, filePath);
});

server.listen(port, () => {
  console.log(`Pathlight server listening on ${port}`);
});
