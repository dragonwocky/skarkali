import type {
  Collection as _Collection,
  ComponentSchema,
  Config as _Config,
  Singleton as _Singleton,
} from "@keystatic/core";

export type Schema = Record<string, ComponentSchema>;
export type Collection = _Collection<Schema, string>;
export type Collections = { [k: string]: Collection };
export type Singleton = _Singleton<Schema>;
export type Singletons = { [k: string]: _Singleton<Record<string, ComponentSchema>> };
export type Config = _Config<Collections, Singletons>;
