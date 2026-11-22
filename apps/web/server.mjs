import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import sirv from "sirv";

let loadHttpConfig;
try {
  loadHttpConfig = (await import("@flowdesk/config")).loadHttpConfig;
} catch {
  try {
    loadHttpConfig = (await import("@wabrix/config")).loadHttpConfig;
  } catch {
    loadHttpConfig = (_service, defaultPort) => ({
      PORT: process.env.PORT ? Number(process.env.PORT) : defaultPort
    });
  }
}

const config = loadHttpConfig("web", 3000);
const serve = sirv(fileURLToPath(new URL(".", import.meta.url)), {
  single: true,
  dev: false,
  setHeaders(res, pathname) {
    if (pathname.startsWith("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
  }
});

const server = createServer((request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
  );

  const url = request.url ? request.url.split("?")[0] : "";
  if (!url.startsWith("/assets/") && (url === "/" || !url.includes(".") || url.endsWith(".html"))) {
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");
  }

  if (request.url === "/livez" || request.url === "/readyz") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok", service: "web" }));
    return;
  }
  serve(request, response);
});
server.listen(config.PORT, "0.0.0.0");
for (const signal of ["SIGTERM", "SIGINT"]) process.once(signal, () => server.close());
