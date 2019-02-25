import { Block } from "slate";

export default ({ blocks }, editor) => {
  const { document, startBlock } = editor.value;
  const listItem = document.getParent(startBlock.key);
  const previousListItem = document.getPreviousSibling(listItem.key);
  const list = document.getParent(listItem.key);

  if (!listItem) return;
  if (!previousListItem) return;

  const newList = Block.create({
    object: "block",
    type: list.type
  });

  editor.withoutNormalizing(() => {
    editor.insertNodeByKey(
      previousListItem.key,
      previousListItem.nodes.size,
      newList
    );
    editor.moveNodeByKey(listItem.key, newList.key, 0);
  });
};
