import { collection, fields } from "@keystatic/core";

const CONTENT_PATH = "src/content";

export const tags = collection({
  label: "Tags",
  path: `${CONTENT_PATH}/tags/*`,
  slugField: "name",
  schema: {
    name: fields.slug({
      name: { label: "Name", validation: { isRequired: true } },
    }),
    excerpt: fields.text({
      label: "Description",
      multiline: true,
      validation: { length: { max: 512 } },
    }),
    tag_image: fields.image({ label: "Tag image" }),
  },
});

export const posts = collection({
  label: "Posts",
  path: `${CONTENT_PATH}/posts/*`,
  slugField: "title",
  entryLayout: "content",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: { label: "Title", validation: { isRequired: true } },
    }),
    published_at: fields.date({
      label: "Published",
      defaultValue: { kind: "today" },
    }),
    excerpt: fields.text({
      label: "Excerpt",
      multiline: true,
      validation: { length: { max: 512 } },
    }),
    tags: fields.array(
      fields.relationship({ label: "Tags", collection: "tags" }),
      { label: "Tags", itemLabel: (props) => props.value || "" },
    ),
    visibility: fields.select({
      label: "Visibility",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Public", value: "public" },
        { label: "Featured", value: "featured" },
        { label: "Archived", value: "archived" },
      ],
    }),
    feature_image: fields.image({ label: "Feature image" }),
    content: fields.markdoc({ label: "Content", extension: "mdoc" }),
  },
});
