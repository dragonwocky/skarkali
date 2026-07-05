import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname == "/api/keystatic/update") console.log("update!");
  return next();
});
