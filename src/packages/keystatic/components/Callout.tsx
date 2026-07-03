import { fields } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

export const Callout = wrapper({
  label: "Callout",
  schema: {
    icon: fields.text({ label: "Emoji icon..." }),
  },
  ContentView({ value, children }) {
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        <span contentEditable={false}>{value.icon}</span>
        <div>{children}</div>
      </div>
    );
  },
});
