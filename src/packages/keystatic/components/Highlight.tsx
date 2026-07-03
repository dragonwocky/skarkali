import { fields } from "@keystatic/core";
import { mark } from "@keystatic/core/content-components";

export const Highlight = mark({
  label: "Highlight",
  style: ({ value }) => ({
    fontWeight: value.variant === "fluro" ? "bold" : "bolder",
  }),
  icon: (
    <>
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </>
  ),
  schema: {
    variant: fields.select({
      label: "Variant",
      options: [
        { label: "Fluro", value: "fluro" },
        { label: "Minimal", value: "minimal" },
        { label: "Brutalist", value: "brutalist" },
      ],
      defaultValue: "fluro",
    }),
  },
});
