import Keymap from "@convertkit/slate-keymap";
import createCommands from "./create-commands";
import createRenderNode from "./create-render-node";
import createSchema from "./create-schema";

export default (options = {}) => {
  const config = {
    ...options
  };

  const blocks = {
    blockquote: "blockquote",
    blockquote_line: "blockquote-line",
    default: "paragraph",
    ...config.blocks
  };

  const classNames = {
    blockquote: "blockquote",
    blockquote_line: "blockquote-line",
    ...config.classNames
  };

  const onEnter = (event, editor, next) => {
    const { selection, startBlock } = editor.value;
    if (selection.start.offset === 0 && startBlock.getText() === "") {
      event.preventDefault();
      if (selection.isExpanded) editor.delete();
      console.log("unwrap");
      editor.unwrapBlockquote();

      return;
    }
    return next();
  };

  const onBackspace = (event, editor, next) => {
    const { selection, startBlock } = editor.value;
    if (selection.isExpanded) return next();
    if (selection.start.offset !== 0) return next();
    if (startBlock.getText() !== "") return next();
    const parent = editor.value.document.getParent(startBlock.key);
    if (parent.nodes.size > 1) return next();
    event.preventDefault();
    editor.delete();
    editor.unwrapBlockquote();
  };

  const isBlockquoteLine = editor =>
    editor.value.startBlock.type === blocks.blockquote_line;

  const renderNode = createRenderNode({ blocks, classNames });
  const commands = createCommands({ blocks });
  const schema = createSchema({ blocks });

  return [
    {
      commands,
      renderNode,
      schema
    },
    Keymap(
      {
        enter: onEnter,
        backspace: onBackspace
      },
      { if: isBlockquoteLine }
    )
  ];
};
