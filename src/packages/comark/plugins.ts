import { textContent, visit } from "comark/utils";
import { isElement } from "./index.ts";
import type { ComarkElement, ComarkNode, ComarkTree } from "comark";

const toSlug = (str: string, ids: string[] = []): string => {
  let duplicates = 0;
  const slug = str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!ids.includes(slug)) return slug;
  do {
    duplicates++;
  } while (ids.includes(`${slug}-${duplicates}`));
  return `${slug}-${duplicates}`;
};

const isElementWithId = (node: ComarkNode) =>
    isElement(node) && typeof node[1].id === "string",
  isHeadingWithoutId = (node: ComarkNode) =>
    isElement(node) && /^h\d$/.test(node[0]) && !node[1].id;

export const addHeadingAnchors = (ast: ComarkTree) => {
  const ids: string[] = [];
  visit(ast, isElementWithId, (node) => {
    ids.push(<string> (<ComarkElement> node)[1].id);
    return node;
  });
  visit(ast, isHeadingWithoutId, (node) => {
    const slug = toSlug(textContent(node), ids);
    (<ComarkElement> node)[1].id = slug;
    ids.push(slug);
    return node;
  });
};
