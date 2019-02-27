export default ({ blocks }, editor, options = {}) => {
  const { document, startBlock } = editor.value;
  const type = options.type || blocks.unordered_list;
  const parent = document.getParent(startBlock.key);
  const isList = parent.type == blocks.list_item;
  if (!isList) return editor.wrapList({ type });

  const list = document.getParent(parent.key);
  const sameType = list.type == type;

  if (sameType) {
    editor.unwrapList();
  } else {
    editor.setNodeByKey(list.key, type);
  }
};
