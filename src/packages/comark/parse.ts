import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { ComarkNode, ComarkTree } from "comark";
import { isTag, toFragment } from "./index.ts";

const fromMarkdocNode = (
  node: MarkdocNode,
  ids: string[] = [],
): ComarkNode | ComarkNode[] => {
  let tag = node.tag;
  const attributes = structuredClone(node.attributes),
    children = node.children.reduce((children, child) => {
      children.push(...toFragment(fromMarkdocNode(child)));
      return children;
    }, <ComarkNode[]> []);
  if (attributes.id) ids.push(attributes.id);

  if (node.type === "hardbreak") return ["br", {}];
  if (node.type === "hr") return ["hr", {}];

  if (node.type === "text" || node.type === "code") {
    children.push(attributes.content);
    delete attributes.content;
  }

  if (node.type === "paragraph") tag = "p";
  if (node.type === "blockquote") tag = "blockquote";
  if (node.type === "image") tag = "img";
  if (node.type === "code") tag = "code";
  if (node.type === "link") tag = "a";
  if (node.type === "s") tag = "del";
  if (node.type === "em" || node.type === "strong") {
    tag = node.type;
    delete attributes.marker;
  }

  if (node.type === "heading") {
    tag = `h${attributes.level}`;
    delete attributes.level;
  }

  if (node.type === "item") tag = "li";
  if (node.type === "list") {
    if (attributes.ordered) tag = "ol";
    else tag = "ul";
    delete attributes.ordered;
    delete attributes.marker;
  }

  if (node.type === "fence") {
    tag = "pre";
    children.pop();
    children.push(["code", {}, attributes.content.replace(/\n\s*$/, "")]);
    delete attributes.content;
  }

  // markdoc supports tables with rich content
  // - rendering to html will preserve lines
  // - rendering to markdown will merge lines
  // if serialising, preserve tables as custom
  // components instead of commonmark tables
  if (tag === "table") tag = "";
  if (node.type === "table") tag = "table";
  if (node.type === "thead") tag = "thead";
  if (node.type === "tbody") tag = "tbody";
  if (node.type === "tr") tag = "tr";
  if (node.type === "th") tag = "th";
  if (node.type === "td") tag = "td";
  if ((node.type === "th" || node.type === "td") && attributes.align) {
    if (!attributes.style) attributes.style = "";
    else if (!attributes.style.endsWith(";")) attributes.style += ";";
    attributes.style += `text-align:${attributes.align}`;
    delete attributes.align;
  }

  // document, text, inline, softbreak, and error
  // node types fall through to their children
  return isTag(tag) ? [tag, attributes, ...children] : children;
};

export const fromMarkdoc = (node: MarkdocNode): ComarkTree => ({
  nodes: toFragment(fromMarkdocNode(node)),
  frontmatter: node.attributes?.frontmatter || {},
  meta: {},
});
