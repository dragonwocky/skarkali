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
                  const config = () => this.resolve("./keystatic.config");
                  if (id === "keystatic:config") return config();
                  return null;
                },
              },
            ],
          },
        });
        injectRoute({
          entrypoint: "./src/packages/keystatic/App.astro",
          pattern: "/keystatic/[...params]",
          prerender: false,
        });
        injectRoute({
          entrypoint: "./src/packages/keystatic/api.ts",
          pattern: "/api/keystatic/[...params]",
          prerender: false,
        });
      },
    },
  };
}
