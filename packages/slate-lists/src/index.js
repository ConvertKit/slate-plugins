import React, { Component } from "react";
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
    default: "paragraph",
    ...config.blocks
  };

  const classNames = {
    unordered_list: "unordered-list",
    ordered_list: "ordered-list",
    list_item: "list-item",
    ...config.classNames
  };

  const onEnter = (event, editor, next) => {
    const selection = editor.value.selection;
    if (selection.isExpanded) editor.delete();
    if (!(selection.start.offset === 0)) return next();

    event.preventDefault();

    editor.unwrapList();
  };

  const onTab = (event, editor, next) => {
    event.preventDefault();
  };

  const isListItem = editor => editor.value.startBlock.type == blocks.list_item;

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
                type: blocks.list_item
              }
            ]
          });
        },
        unwrapList(editor) {
          const startBlock = editor.value.startBlock;
          const listType = editor.value.document.getParent(startBlock.key).type;
          editor.withoutNormalizing(() => {
            editor.setBlocks(blocks.default);
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
          default:
            return next();
        }
      },
      schema
    },

    KeyMap(
      {
        enter: onEnter,
        tab: onTab
      },
      { if: isListItem }
    )
  ];
};
