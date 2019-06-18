import { createHTM } from "@convertkit/slate-htm";

export default createHTM({
  blocks: {
    blockquote: "blockquote",
    blockquote_line: "blockquote-line",
    code: "code",
    code_line: "code-line",
    list_item: "list-item",
    list_item_child: "list-item-child",
    ordered_list: "ordered-list",
    paragraph: "paragraph",
    unordered_list: "unordered-list"
  },
  inlines: {},
  marks: {}
});
