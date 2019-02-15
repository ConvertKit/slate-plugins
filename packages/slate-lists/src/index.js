import React from "react";
import { Block } from "slate";
import KeyMap from "@convertkit/slate-keymap";
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

  const getPreviousListItem = editor => {
    return editor.value.document.getPreviousSibling(
      getListItem(editor, editor.value.startBlock).key
    );
  };

  const isListItem = block => block && block.type == blocks.list_item;

  const getListItem = (editor, block) => {
    const possibleListItem = editor.value.document.getParent(block.key);

    return isListItem(possibleListItem) ? possibleListItem : null;
  };

  const isList = block =>
    block &&
    (block.type == blocks.unordered_list || block.type == block.ordered_list);

  const getList = (editor, block) => {
    const possibleList = editor.value.document.getParent(block.key);
    return isList(possibleList) ? possibleList : null;
  };

  const onEnter = (event, editor, next) => {
    const { selection } = editor.value;
    event.preventDefault();
    if (selection.isExpanded) editor.delete();
    if (selection.start.offset === 0) {
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

  const onTab = (event, editor, next) => {
    event.preventDefault();
    editor.increaseListItemDepth();
  };

  const onShiftTab = (event, editor, next) => {
    event.preventDefault();
    editor.decreaseListItemDepth();
  };

  const schema = createSchema({ blocks });

  return [
    {
      commands: {
        insertList(editor) {
          editor.insertBlock({
            object: "block",
            type: blocks.unordered_list,
            nodes: [
              {
                object: "block",
                type: blocks.list_item,
                nodes: [
                  {
                    object: "block",
                    type: blocks.list_item_child
                  }
                ]
              }
            ]
          });
        },
        decreaseListItemDepth(editor) {
          const { value } = editor;
          const listItem = getListItem(editor, value.startBlock);
          const list = getList(editor, listItem);
          const parentListItem = getListItem(editor, list);
          if (!parentListItem) return;
          const parentList = getList(editor, parentListItem);

          const otherItems = list.nodes
            .skipUntil(item => item === listItem)
            .rest();

          if (!otherItems.isEmpty()) {
            const newList = Block.create({
              object: "block",
              type: list.type
            });

            editor.withoutNormalizing(() => {
              editor.insertNodeByKey(
                listItem.key,
                listItem.nodes.size,
                newList
              );

              editor.moveNodeByKey(
                listItem.key,
                parentList.key,
                parentList.nodes.indexOf(parentListItem) + 1
              );

              otherItems.forEach((item, index) =>
                editor.moveNodeByKey(
                  item.key,
                  newList.key,
                  newList.nodes.size + index
                )
              );
            });
          } else {
            editor.moveNodeByKey(
              listItem.key,
              parentList.key,
              parentList.nodes.size
            );
          }
        },
        increaseListItemDepth(editor) {
          const listItem = getListItem(editor, editor.value.startBlock);
          const previousListItem = getPreviousListItem(editor);

          if (!listItem) return;
          if (!previousListItem) return;

          const newList = Block.create({
            object: "block",
            type: blocks.unordered_list
          });

          editor.withoutNormalizing(() => {
            editor.insertNodeByKey(
              previousListItem.key,
              previousListItem.nodes.size,
              newList
            );
            editor.moveNodeByKey(listItem.key, newList.key, 0);
          });
        },
        unwrapList(editor) {
          const listItem = getListItem(editor, editor.value.startBlock);
          const listType = editor.value.document.getParent(listItem.key).type;
          editor.withoutNormalizing(() => {
            editor.setBlocks(blocks.default);
            editor.unwrapBlock(blocks.list_item);
            editor.unwrapBlock(listType);
          });
        }
      },
      renderNode(props, editor, next) {
        const { node } = props;
        switch (node.type) {
          case blocks.unordered_list:
            return (
              <ul className={classNames.unordered_list} {...props.attributes}>
                {props.children}
              </ul>
            );
          case blocks.ordered_list: {
            return (
              <ol className={classNames.ordered_list} {...props.attributes}>
                {props.children}
              </ol>
            );
          }
          case blocks.list_item: {
            return (
              <li className={classNames.list_item} {...props.attributes}>
                {props.children}
              </li>
            );
          }
          case blocks.list_item_child: {
            return (
              <span
                className={classNames.list_item_child}
                {...props.attributes}
              >
                {props.children}
              </span>
            );
          }
          default:
            return next();
        }
      },
      schema
    },

    KeyMap(
      {
        enter: onEnter,
        tab: onTab,
        "shift+tab": onShiftTab
      },
      { if: editor => !!getListItem(editor, editor.value.startBlock) }
    )
  ];
};
