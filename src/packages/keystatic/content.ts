import process from "node:process";
import { createReader, type Entry } from "@keystatic/core/reader";
import config from "keystatic:config";
import type { Collection } from "keystatic:config";

const reader = createReader(process.cwd(), config);

export const getSingleton = (id: string) =>
  reader.singletons[id].read()
    .then((content: unknown) => content || {});

export const getCollection = (id: string) =>
  reader.collections[id].list()
    .then((content: unknown) => content || []);

export const getEntry = <E extends Collection>(
  id: string,
  slug: string,
): Entry<E> =>
  reader.collections[id].read(slug)
    .then((content: unknown) => content || {});
