import express from "express";
import { createServer, ServerResponse } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function storagePlaceholder(key: string, res: ServerResponse) {
  const label = key.split("/").pop()?.replace(/[_-]+/g, " ").replace(/\.[a-z0-9]+$/i, "").slice(0, 26) || "SMP visual";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#0b0912"/><g fill="none" stroke="#8b5cf6" stroke-width="2" opacity=".45"><circle cx="600" cy="430" r="210"/><circle cx="600" cy="430" r="118"/><path d="M600 150v560M380 400l440-120M380 460l440 120"/></g><text x="600" y="380" text-anchor="middle" font-family="monospace" font-size="34" letter-spacing="6" fill="#efeaff">${label}</text><text x="600" y="436" text-anchor="middle" font-family="monospace" font-size="22" letter-spacing="4" fill="#bda9ff">SMP / VISUAL</text></svg>`;
  res.writeHead(200, { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" });
  res.end(svg);
}

function storageProxy() {
  return async (req: express.Request, res: express.Response) => {
    const key = decodeURIComponent(req.url.replace(/^\//, ""));
    if (!key) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing storage key");
      return;
    }

    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!forgeBaseUrl || !forgeKey) {
      storagePlaceholder(key, res);
      return;
    }

    try {
      const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${forgeKey}` },
      });

      if (!forgeResp.ok) {
        storagePlaceholder(key, res);
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        storagePlaceholder(key, res);
        return;
      }

      res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
      res.end();
    } catch {
      storagePlaceholder(key, res);
    }
  };
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Local files in dist/public/manus-storage take priority.
  app.use(express.static(staticPath));

  // Resolve remaining /manus-storage assets via the external storage backend,
  // falling back to a graceful placeholder when it is unavailable.
  app.use("/manus-storage", storageProxy());

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
