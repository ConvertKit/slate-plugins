const isList = (blocks, block) =>
  block.type == blocks.unordered_list || block.type == blocks.ordered_list;

export default ({ blocks }, editor, options = {}) => {
  const type = options.type || blocks.unordered_list;
  const rootBlocks = editor.value.document.getRootBlocksAtRange(
    editor.value.selection
  );

  editor.withoutNormalizing(() => {
    rootBlocks.forEach(block => {
      if (isList(blocks, block)) return;
      editor.wrapBlockByKey(block.key, type);
      editor.wrapBlockByKey(block.key, blocks.list_item);
      editor.setNodeByKey(block.key, blocks.list_item_child);
    });
  });
};
