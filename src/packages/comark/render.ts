import { renderHTML } from "@comark/html";
import type { ComarkTree } from "comark";
import { renderMarkdown as _renderMarkdown } from "comark/render";
import { anchors, highlight, tables } from "./plugins.ts";
import { Aside } from "./components/Aside.ts";

export const render = async (ast: ComarkTree) => {
  ast = await highlight(anchors(tables(ast, "html")));
  return renderHTML(ast, { components: { Aside } });
};

export const renderMarkdown = (ast: ComarkTree) => {
  ast = tables(ast, "comark");
  return _renderMarkdown(ast);
};
