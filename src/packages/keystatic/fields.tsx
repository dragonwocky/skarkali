import { FieldPrimitive } from "@keystar/ui/field";
import { TextField } from "@keystar/ui/text-field";
import type {
  BasicFormField,
  FormFieldInputProps,
  FormFieldStoredValue,
} from "@keystatic/core";
import { HexColorPicker } from "react-colorful";

export const colour = ({ label, defaultValue, description }: {
  label: string;
  defaultValue: string;
  description?: string;
}): BasicFormField<string> => {
  const parse = (value: FormFieldStoredValue) => {
      if (value === undefined) return defaultValue;
      if (typeof value !== "string") {
        throw new Error("Colour fields must contain strings");
      }
      return value;
    },
    validate = (value: string) => {
      if (!/^#[A-Za-z0-9]{6}$/.test(value)) {
        throw new Error("Colour fields must contain hex colour codes");
      }
      return value;
    };

  const Input = (props: FormFieldInputProps<string>) => (
      <>
        <HexColorPicker color={props.value} onChange={props.onChange} />
        <style
          dangerouslySetInnerHTML={{
            __html:
              `.react-colorful{width:auto;overflow:clip;border-radius:var(--kui-size-radius-regular)} .react-colorful__saturation,.react-colorful__last-control{border-radius:0} .react-colorful__pointer{width:18px;height:18px}`,
          }}
        />
      </>
    ),
    Preview = (props: FormFieldInputProps<string>) => (
      <div style={{ display: "flex", gap: "12px" }}>
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
    );

  return {
    kind: "form",
    Input: (props: FormFieldInputProps<string>) => (
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
          <Input {...props} />
          <Preview {...props} />
        </div>
      </FieldPrimitive>
    ),
    parse,
    validate,
    defaultValue: () => defaultValue,
    serialize: (value: string) => ({ value }),
    reader: { parse: (value) => validate(parse(value)) },
  };
};
