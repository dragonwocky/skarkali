import { FieldPrimitive } from "@keystar/ui/field";
import { TextField } from "@keystar/ui/text-field";
import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { HexColorPicker } from "react-colorful";

class FieldDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FieldDataError";
  }
}

export function colour({ label, defaultValue, description }: {
  label: string;
  defaultValue: string;
  description?: string;
}): BasicFormField<string> {
  const parse = (value: FormFieldStoredValue) => {
      if (value === undefined) {
        return defaultValue;
      }
      if (typeof value !== "string") {
        throw new FieldDataError("Must be a string");
      }
      if (!/^#[A-Za-z0-9]{6}$/.test(value)) {
        return defaultValue;
      }
      return value;
    },
    serialize = (value: string) => ({ value }),
    validate = (value: string) => value;
  return {
    kind: "form",
    Input: (props) => (
      <FieldPrimitive
        label={label}
        description={description}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            flexDirection: "column",
            width: "var(--kui-size-alias-single-line-width)",
            gap: "16px",
          }}
        >
          <HexColorPicker color={props.value} onChange={props.onChange} />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .react-colorful{width:auto;overflow:clip;border-radius:var(--kui-size-radius-regular)}
              .react-colorful__saturation,.react-colorful__last-control{border-radius:0}
              .react-colorful__pointer{width:18px;height:18px}`,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: props.value,
                borderRadius: "var(--kui-size-radius-regular)",
                aspectRatio: "1 / 1",
              }}
            >
            </div>
            <TextField value={props.value} onChange={props.onChange}>
            </TextField>
          </div>
        </div>
      </FieldPrimitive>
    ),
    defaultValue: () => defaultValue,
    parse,
    serialize,
    validate,
    reader: { parse: (value) => validate(parse(value)) },
  };
}
