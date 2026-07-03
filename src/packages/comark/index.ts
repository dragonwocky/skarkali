import {
  type ComarkComment,
  type ComarkElement,
  type ComarkNode,
  type ComarkText,
} from "comark";

const isTag = (ast: unknown): ast is ComarkElement[0] =>
    !!ast && typeof ast === "string",
  isAttributes = (ast: unknown): ast is ComarkElement[1] =>
    !!ast && typeof ast === "object" && !Array.isArray(ast),
  isElement = (ast: unknown): ast is ComarkElement =>
    Array.isArray(ast) && ast.length >= 2 && isTag(ast[0]) &&
    isAttributes(ast[1]),
  isComment = (ast: unknown): ast is ComarkComment =>
    Array.isArray(ast) && ast.length >= 2 && ast[0] === null &&
    JSON.stringify(ast[1]) === "{}",
  isText = (ast: unknown): ast is ComarkText => typeof ast === "string",
  isNode = (ast: unknown): ast is ComarkNode =>
    isText(ast) || isElement(ast) || isComment(ast),
  isFragment = (ast: unknown): ast is ComarkNode[] =>
    Array.isArray(ast) && !isNode(ast),
  toFragment = (ast: ComarkNode | ComarkNode[]) =>
    isFragment(ast) ? ast : [ast];

export {
  isAttributes,
  isComment,
  isElement,
  isFragment,
  isNode,
  isTag,
  isText,
  toFragment,
};

export { fromMarkdoc } from "./parse.ts";
export { render, renderMarkdoc } from "./render.ts";
