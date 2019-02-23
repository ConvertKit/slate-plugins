import { createHyperscript } from "slate-hyperscript";
import htm from "htm";

export const createHTM = options => {
  const h = createHyperscript(options);
  return htm.bind(h);
};
