import { renderHTML } from "@comark/html";
import type { ComarkTree } from "comark";
import { renderMarkdown as _renderMarkdown } from "comark/render";
import { minify } from "html-minifier-next";
import * as components from "./components.ts";
import { anchors, highlight, tables } from "./plugins.ts";

export const render = async (ast: ComarkTree) => {
  ast = await highlight(anchors(tables(ast, "html")));
  return minify(await renderHTML(ast, { components }), {
    preset: "comprehensive",
  });
};

export const renderMarkdown = (ast: ComarkTree) => {
  ast = tables(ast, "comark");
  return _renderMarkdown(ast);
};
