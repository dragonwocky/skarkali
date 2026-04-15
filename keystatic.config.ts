import {
  type Collection,
  type ComponentSchema,
  config,
  type Singleton,
} from "@keystatic/core";

type Schema = Record<string, ComponentSchema>;
type Collections = Record<string, Collection<Schema, string>>;
type Singletons = Record<string, Singleton<Schema>>;

const collections: Collections = {},
  singletons: Singletons = {};

export default config({
  storage: { kind: "local" },
  ui: {
    navigation: {
      "Content": Object.keys(collections),
      "Settings": Object.keys(singletons),
    },
  },
  singletons,
  collections,
});
