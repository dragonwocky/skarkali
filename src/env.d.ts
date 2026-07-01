/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "keystatic:config" {
  import type { Config } from "../keystatic.config.ts";
  export type {
    Collection,
    Collections,
    Config,
    Schema,
    Singleton,
    Singletons,
  } from "../keystatic.config.ts";

  const config: Config;
  export default config;
}
