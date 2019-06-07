import KeyMap from "@convertkit/slate-keymap";
import createCommands from "./create-commands";
import createNormalizeNode from "./create-normalize-node";
import createRenderBlock from "./create-render-block";
import createSchema from "./create-schema";

export default (options = {}) => {
  const config = {
    ...options
  };

  const blocks = {
    unordered_list: "unordered-list",
    ordered_list: "ordered-list",
    list_item: "list-item",
    list_item_child: "list-item-child",
    default: "paragraph",
    ...config.blocks
  };

  const classNames = {
    unordered_list: "unordered-list",
    ordered_list: "ordered-list",
    list_item: "list-item",
    list_item_child: "list-item-child",
    ...config.classNames
  };

  const commands = createCommands({ blocks });

  const isListItem = block => block && block.type == blocks.list_item;

  const getListItem = (editor, block) => {
    const possibleListItem = editor.value.document.getParent(block.key);

    return isListItem(possibleListItem) ? possibleListItem : null;
  };

  const isList = block =>
    block &&
    (block.type == blocks.unordered_list || block.type == blocks.ordered_list);

  const getList = (editor, block) => {
    const possibleList = editor.value.document.getParent(block.key);
    return isList(possibleList) ? possibleList : null;
  };

  const onBackspace = (event, editor, next) => {
    const { selection } = editor.value;
    if (selection.isExpanded) return next();
    if (selection.start.offset !== 0) return next();
    const listItem = getListItem(editor, editor.value.startBlock);
    const list = getList(editor, listItem);
    const parentListItem = getListItem(editor, list);

    if (parentListItem) {
      editor.decreaseListItemDepth();
      return;
    }

    editor.unwrapList();
  };

  const onEnter = (event, editor, next) => {
    const { selection, startBlock } = editor.value;
    event.preventDefault();
    if (selection.isExpanded) editor.delete();
    if (selection.start.offset === 0 && startBlock.getText() === "") {
      const listItem = getListItem(editor, editor.value.startBlock);
      const list = getList(editor, listItem);
      const parentListItem = getListItem(editor, list);

      if (parentListItem) {
        editor.decreaseListItemDepth();
        return;
      }

      editor.unwrapList();

      return;
    }

    const listItem = getListItem(editor, editor.value.startBlock);

    editor.splitDescendantsByKey(
      listItem.key,
      selection.start.key,
      selection.start.offset
    );
  };

  const onShiftEnter = (event, editor, next) => {
    event.preventDefault();
    editor.insertText("\n");
  };

  const schema = createSchema({ blocks });
  const normalizeNode = createNormalizeNode({ blocks });
  const renderBlock = createRenderBlock({ blocks, classNames });

  return [
    {
      commands: {
        wrapList: commands.wrapList,
        unwrapList: commands.unwrapList,
        toggleList: commands.toggleList,
        decreaseListItemDepth: commands.decreaseListItemDepth,
        increaseListItemDepth: commands.increaseListItemDepth
      },
      normalizeNode,
      renderBlock,
      schema
    },

    KeyMap(
      {
        backspace: onBackspace,
        enter: onEnter,
        "shift+enter": onShiftEnter,
        tab: "increaseListItemDepth",
        "shift+tab": "decreaseListItemDepth"
      },
      { if: editor => !!getListItem(editor, editor.value.startBlock) }
    )
  ];
};
