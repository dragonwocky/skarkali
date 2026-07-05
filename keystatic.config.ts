import { config } from "@keystatic/core";
import type {
  Collections,
  Singletons,
} from "./src/packages/keystatic/types.ts";
import { posts, tags } from "./src/schema/collections.tsx";
import {
  appearance,
  developer,
  metadata,
  navigation,
  socials,
  users,
} from "./src/schema/singletons.ts";

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
  singletons,
  collections,
  storage: { kind: "local" },
  ui: {
    navigation: {
      "Content": Object.keys(collections),
      "Settings": Object.keys(singletons),
    },
  },
});
