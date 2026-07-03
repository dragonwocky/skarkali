---
title: Title
published_at: 2026-07-02
tags: []
visibility: draft
---
Paragraph

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

**Bold text.** *Italic text.* ***Bold and italic text.*** ~~Strikethrough text.~~ `Inline code.`
{% Highlight variant="fluro" %}Highlighted text.{% /Highlight %} [Linked text.](https://comark.dev/)

- Bulleted list.
  - Indented list.
    1. Numbered list.
       1. Ordered list.
- [x] Completed task
- [ ] Pending task
- [x] Another completed task
  - [ ] Nested pending task
  - [x] Nested completed task

Hello :wave: Welcome to our docs! :rocket:

Comark supports footnotes[^1] with back-references[^2].

[^1]: Footnotes are rendered as a list at the end of the document.
[^2]: Each footnote includes a back-reference link to return to the text.

{% Callout icon="⌛" %}
Callout.
{% /Callout %}

> ## Quoted heading.
> 
> Quoted text.

```html
<div>Code block!</div>
```

![Image caption.](7c76d226-4913-4b7a-90fb-c835971f58dc.jpg)

{% table %}
- TH1
- TH2
- TH3
---
- TR1C1
- TR1C2

  ```html
  <div>Code block!</div>
  ```
- TR1C3
---
- TR2C1
- TR2C2
- TR2C3
{% /table %}

<!-- Comment -->

{% table %}
- Left Aligned
- Center Aligned
- Right Aligned
---
- Left
- Center
- Right
---
- Text
- Text
- Text
{% /table %}
