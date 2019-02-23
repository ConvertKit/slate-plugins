---
name: Slate HTM
route: /slate-htm
---

# Slate HTM

Provides JSX like syntax for creating Slate values.

## Install

```sh
yarn add -D @convertkit/slate-htm
```

## Usage

```jsx

import { createHTM } from "@convertkit/slate-htm";

const html = createHTM(({
  blocks: {
    paragraph: "paragraph",

  },
  inlines: {
    link: "link"
  },
  marks: {
    bold: "bold"
  }
})

const value = html`
  <value>
    <document>
      <paragraph>Example <link>link</link></paragraph>
    </document>
  </value>
`
```
