import type { Node as MarkdocNode } from "@markdoc/markdoc";
import highlight from "@comark/html/plugins/highlight";
import githubLight from "@shikijs/themes/github-light";
import githubDark from "@shikijs/themes/github-dark";
import { fromMarkdoc } from "./parse.ts";
import { renderHTML } from "@comark/html";
import type { ComarkTree } from "comark";
import { addHeadingAnchors } from "./plugins.ts";
import { Aside } from "./components/Aside.ts";

export const render = (ast: ComarkTree) => {
  addHeadingAnchors(ast);
  return renderHTML(ast, {
    plugins: [highlight({ themes: { light: githubLight, dark: githubDark } })],
    components: { Aside },
  });
};

export const renderMarkdoc = (node: MarkdocNode) => render(fromMarkdoc(node));
