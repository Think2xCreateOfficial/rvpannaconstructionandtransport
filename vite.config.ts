import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      ...(process.env["NITRO_PRESET"]
        ? { preset: process.env["NITRO_PRESET"] as "node-server" }
        : process.env["VERCEL"]
          ? { preset: "vercel" }
          : {}),
    }),
    react(),
  ],
});
