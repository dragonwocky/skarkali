import {
  type Collection,
  type ComponentSchema,
  config,
  type Singleton,
} from "@keystatic/core";
import { posts, tags } from "./src/schema/collections.ts";
import {
  appearance,
  developer,
  metadata,
  navigation,
  socials,
  users,
} from "./src/schema/singletons.ts";

type Schema = Record<string, ComponentSchema>;
type Collections = Record<string, Collection<Schema, string>>;
type Singletons = Record<string, Singleton<Schema>>;

const isAdministrator = true,
  isEditor = isAdministrator || false,
  isContributor = isEditor || false;

const collections: Collections = {},
  singletons: Singletons = {};
isContributor && Object.assign(collections, { posts, tags });
isEditor && Object.assign(singletons, { metadata, appearance });
isEditor && Object.assign(singletons, { navigation, socials });
isAdministrator && Object.assign(singletons, { developer, users });

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: import.meta.env.PUBLIC_HOSTNAME },
    navigation: {
      "Content": Object.keys(collections),
      "Settings": Object.keys(singletons),
    },
  },
  singletons,
  collections,
});
