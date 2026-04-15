import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  integrations: [react(), markdoc(), keystatic()],
  vite: { plugins: [tailwindcss(), yaml()] },
  adapter: node({ mode: "standalone" }),
});
