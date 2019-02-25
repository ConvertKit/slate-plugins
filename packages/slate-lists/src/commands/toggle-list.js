export default ({ blocks }, editor, options = {}) => {
  const { document, startBlock } = editor.value;
  const type = options.type || blocks.unordered_list;
  const parent = document.getParent(startBlock.key);
  const isList = parent.type == blocks.list_item;

  if (isList) {
    editor.unwrapList();
  } else {
    editor.wrapList({ type });
  }
};
