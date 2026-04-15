/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.yaml" {
  // deno-lint-ignore no-explicit-any
  const value: any;
  export default value;
}
