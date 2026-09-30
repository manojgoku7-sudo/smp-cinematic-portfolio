import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("react-dom") || id.includes("wouter") || id.includes("/react/")) return "vendor-react";
            if (id.includes("sonner") || id.includes("clsx") || id.includes("tailwind-merge")) return "vendor-utils";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
