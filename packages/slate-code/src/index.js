import React, { Component } from "react";
import SyntaxHighlight from "./plugins/syntax-highlight";
import KeyMap from "@convertkit/slate-keymap";
// import "./index.css";

export default (options = {}) => {
  const config = {
    highlight: true,
    block: "code",
    line: "code-line",
    ...options
  };

  const classNames = {
    block: "code",
    line: "code-line",
    ...config.classNames
  };

  const isCodeLine = editor => editor.value.startBlock.type == config.line;

  const onEnter = (event, editor, next) => {
    event.preventDefault();
    editor.splitBlock().setBlocks(config.line);
  };

  const onTab = (event, editor, next) => {
    event.preventDefault();
    editor.insertText("  ");
  };

  const onSelectAll = (event, editor, next) => {
    event.preventDefault();
    const startBlock = editor.value.startBlock;
    const document = editor.value.document;
    const parent = document.getParent(startBlock.key);

    editor.moveToRangeOfNode(parent);
  };

  const schema = {
    blocks: {
      code: {
        nodes: [
          {
            match: { type: config.line }
          }
        ]
      },
      code_line: {
        nodes: [
          {
            match: { object: "text" }
          }
        ]
      }
    }
  };

  return [
    {
      commands: {
        insertCode(editor, { code, language }) {
          editor.insertBlock({
            object: "block",
            type: config.block,
            data: { language },
            nodes: [
              {
                object: "block",
                type: config.line,
                nodes: [{ object: "text", leaves: [code] }]
              }
            ]
          });
        }
      },
      renderNode(props, editor, next) {
        const { node } = props;
        switch (node.type) {
          case config.block:
            const language = node.data.get("language") || "html";
            return (
              <pre
                className={`${classNames.block} language-${language}`}
                {...props.attributes}
              >
                <code className={`language-${language}`}>{props.children}</code>
              </pre>
            );
          case config.line: {
            return (
              <div className={classNames.line} {...props.attributes}>
                {props.children}
              </div>
            );
          }
          default:
            return next();
        }
      },
      schema
    },
    ...(config.highlight
      ? [SyntaxHighlight({ block: config.block, line: config.line })]
      : []),
    KeyMap(
      {
        "mod+a": onSelectAll,
        tab: onTab,
        enter: onEnter
      },
      { if: isCodeLine }
    )
  ];
};
