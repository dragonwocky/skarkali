import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import type { APIContext } from "astro";
import config from "keystatic:config";

const handler = makeGenericAPIRouteHandler({ config });

export const ALL = async (context: APIContext) => {
  const { body, status } = await handler(context.request);
  return new Response(<BodyInit> body, { status });
};
