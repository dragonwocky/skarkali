import type { AstroIntegration } from "astro";

export default function keystatic(): AstroIntegration {
  return {
    name: "keystatic",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: "keystatic",
                resolveId(id) {
                  if (id !== "keystatic:config") return null;
                  return this.resolve("keystatic.config");
                },
              },
            ],
          },
        });
        injectRoute({
          entrypoint: "./src/packages/keystatic/astro/keystatic-page.astro",
          pattern: "/keystatic/[...params]",
          prerender: false,
        });
        injectRoute({
          entrypoint: "./src/packages/keystatic/astro/keystatic-api.ts",
          pattern: "/api/keystatic/[...params]",
          prerender: false,
        });
      },
    },
  };
}
