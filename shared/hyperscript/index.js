import { createHyperscript } from "slate-hyperscript";

export default createHyperscript({
  blocks: {
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
