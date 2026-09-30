import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import fs from "fs";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Custom pet image upload endpoint
  app.post("/api/upload-kitsune", async (req, res) => {
    try {
      const { imageBase64, imageUrl } = req.body;
      let buffer: Buffer;

      if (imageBase64) {
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        buffer = Buffer.from(base64Data, "base64");
      } else if (imageUrl) {
        const fetchRes = await fetch(imageUrl);
        const arrayBuf = await fetchRes.arrayBuffer();
        buffer = Buffer.from(arrayBuf);
      } else {
        return res.status(400).json({ error: "Missing imageBase64 or imageUrl in request body" });
      }

      const publicDir = path.resolve(process.cwd(), "client/public/images");
      const distDir = path.resolve(process.cwd(), "dist/public/images");

      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

      fs.writeFileSync(path.join(publicDir, "kitsune-pet.png"), buffer);
      fs.writeFileSync(path.join(distDir, "kitsune-pet.png"), buffer);

      return res.json({ success: true, url: "/images/kitsune-pet.png" });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message || "Failed to save image" });
    }
  });

  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 3000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
