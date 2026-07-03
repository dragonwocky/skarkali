import { textContent, visit } from "comark/utils";
import { isElement } from "./index.ts";
import type { ComarkElement, ComarkNode, ComarkTree } from "comark";
import githubLight from "@shikijs/themes/github-light";
import githubDark from "@shikijs/themes/github-dark";
import {
  highlightCodeBlocks,
  type HighlightOptions,
} from "comark/plugins/highlight";

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
  },
  replaceTags = (ast: ComarkTree, from: string, to: string) => {
    visit(ast, (node) => isElement(node) && node[0] === from, (node) => {
      (<ComarkElement> node)[0] = to;
      return node;
    });
  };

const isElementWithId = (node: ComarkNode) =>
    isElement(node) && typeof node[1].id === "string",
  isHeadingWithoutId = (node: ComarkNode) =>
    isElement(node) && /^h\d$/.test(node[0]) && !node[1].id;

export const anchors = (ast: ComarkTree) => {
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
  return ast;
};

export const tables = (ast: ComarkTree, format: "comark" | "html") => {
  if (format === "html") {
    replaceTags(ast, "Table", "table");
    replaceTags(ast, "TableHead", "thead");
    replaceTags(ast, "TableBody", "tbody");
    replaceTags(ast, "TableRow", "tr");
    replaceTags(ast, "TableHeader", "th");
    replaceTags(ast, "TableData", "td");
  } else if (format === "comark") {
    replaceTags(ast, "table", "Table");
    replaceTags(ast, "thead", "TableHead");
    replaceTags(ast, "tbody", "TableBody");
    replaceTags(ast, "tr", "TableRow");
    replaceTags(ast, "th", "TableHeader");
    replaceTags(ast, "td", "TableData");
  }
  return ast;
};

export const highlight = (ast: ComarkTree, options: HighlightOptions = {
  themes: { light: githubLight, dark: githubDark },
}) => highlightCodeBlocks(ast, options);
