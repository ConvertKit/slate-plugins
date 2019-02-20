export const getRootSelectionBlocks = editor => {
  const { selection, document, startBlock, endBlock } = editor.value;
  const { start, end } = selection;

  if (startBlock == endBlock) return [startBlock];

  const ancestor = document.getCommonAncestor(start.key, end.key);

  const startPath = ancestor.getPath(start.key);
  const endPath = ancestor.getPath(end.key);

  return ancestor.nodes.slice(startPath.first(), endPath.first() + 1).toJS();
};
