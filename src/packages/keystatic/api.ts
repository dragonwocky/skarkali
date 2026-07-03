import type { APIContext } from "astro";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import config from "keystatic:config";

const handler = makeGenericAPIRouteHandler({ config });

export const ALL = async (context: APIContext) => {
  const { body, status } = await handler(context.request);
  if (context.url.pathname == "/api/keystatic/update") {
    //
  }
  return new Response(<BodyInit> body, { status });
};

export const prerender = false;
