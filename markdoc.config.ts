import {
  component,
  defineMarkdocConfig as config,
} from "@astrojs/markdoc/config";

export default config({
  tags: {
    aside: {
      render: component("./src/packages/markdoc/Aside.astro"),
      attributes: {
        icon: { type: String },
        colour: { type: String },
      },
    },
  },
});
