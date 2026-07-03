import { defineConfig } from "astro/config";
import keystatic from "./src/packages/keystatic/astro.ts";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  integrations: [keystatic(), react()],
  vite: { plugins: [tailwindcss()] },
  adapter: node({ mode: "standalone" }),
});