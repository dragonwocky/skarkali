import type { NodeHandler } from "comark/render";

export const Highlight: NodeHandler = async (node, { render }) => {
  const [, , ...children] = node;
  return /*html*/ `<mark>${await render(children)}</mark>`;
};
