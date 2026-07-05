import type { NodeHandler } from "comark/render";

export const Callout: NodeHandler = async (node, { render }) => {
  const [, attributes, ...children] = node;
  return /*html*/ `<div style="display: flex; gap: 4px;">
    <span>${attributes.icon}</span>
    <div>${await render(children)}</div>
  </div>`;
};
