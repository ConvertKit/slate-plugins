import { Block } from "slate";

export default ({ blocks }, editor) => {
  const { document, startBlock } = editor.value;

  const listItem = document.getParent(startBlock.key);
  if (listItem.type != blocks.list_item) return;
  const list = document.getParent(listItem.key);
  const parentListItem = document.getParent(list.key);
  if (parentListItem.type != blocks.list_item) return;
  const parentList = document.getParent(parentListItem.key);

  const index = parentList.nodes.indexOf(parentListItem);

  const otherItems = list.nodes.skipUntil(item => item === listItem).rest();

  if (!otherItems.isEmpty()) {
    const newList = Block.create({
      object: "block",
      type: list.type
    });

    editor.withoutNormalizing(() => {
      editor.insertNodeByKey(listItem.key, listItem.nodes.size, newList);

      editor.moveNodeByKey(listItem.key, parentList.key, index + 1);

      otherItems.forEach((item, index) =>
        editor.moveNodeByKey(item.key, newList.key, newList.nodes.size + index)
      );
    });
  } else {
    editor.moveNodeByKey(listItem.key, parentList.key, index + 1);
  }
};
