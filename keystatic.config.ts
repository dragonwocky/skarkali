import {
  type Collection as CollectionGeneric,
  type ComponentSchema,
  type Config as ConfigGeneric,
  config,
  type Singleton as SingletonGeneric,
} from "@keystatic/core";
import { posts, tags } from "@/schema/collections.tsx";
import {
  appearance,
  developer,
  metadata,
  navigation,
  socials,
  users,
} from "@/schema/singletons.ts";

export type Schema = Record<string, ComponentSchema>;
export type Collection = CollectionGeneric<Schema, string>;
export type Collections = Record<string, Collection>;
export type Singleton = SingletonGeneric<Schema>;
export type Singletons = Record<string, Singleton>;
export type Config = ConfigGeneric<Collections, Singletons>;

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
