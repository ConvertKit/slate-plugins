import { createHyperscript } from "slate-hyperscript";

export default createHyperscript({
  blocks: {
    code: "code",
    code_line: "code-line",
    paragraph: "paragraph"
  },
  inlines: {},
  marks: {}
});
