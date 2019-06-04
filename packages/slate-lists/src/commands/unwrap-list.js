import unwrapListByKey from "./unwrap-list-by-key";

export default ({ blocks }, editor) => {
  const listItemChildren = editor.value.document
    .getDescendantsAtRange(editor.value.selection)
    .filter(node => node.type == blocks.list_item_child);

  const furthestListItems = listItemChildren
    .map(listItemChild => {
      return editor.value.document.getFurthest(
        listItemChild.key,
        node => node.type == blocks.list_item
      );
    })
    .filter(
      (listItemChild, index, array) => array.indexOf(listItemChild) == index
    );

  furthestListItems.forEach(listItem => {
    unwrapListByKey({ blocks }, editor, listItem.key);
  });
};
