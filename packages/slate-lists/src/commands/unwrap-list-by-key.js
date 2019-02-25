export default ({ blocks }, editor, key) => {
  const listItem = editor.value.document.getNode(key);

  editor.withoutNormalizing(() => {
    editor.unwrapNodeByKey(listItem.key);

    const parent = editor.value.document.getParent(listItem.key);
    const itemIndex = parent.nodes.findIndex(node => node.key === listItem.key);

    listItem.nodes.forEach((itemChild, index) => {
      editor.moveNodeByKey(itemChild.key, parent.key, index + itemIndex);

      if (itemChild.type == blocks.list_item_child) {
        editor.setNodeByKey(itemChild.key, { type: blocks.default });
      }
    });

    editor.removeNodeByKey(listItem.key);
  });
};
