import type { ComarkElement, NodeHandler } from "comark";

export const Aside: NodeHandler = async (node: ComarkElement, { render }) => {
  const [, attributes, ...children] = node;
  return `<div style="display: flex; gap: 4px;">
    <span>${attributes.icon}</span>
    <div>${await render(children)}</div>
  </div></header>`;
};
