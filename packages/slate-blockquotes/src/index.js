import Keymap from "@convertkit/slate-keymap";
import createCommands from "./create-commands";
import createRenderBlock from "./create-render-block";
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
    const parent = editor.value.document.getParent(startBlock.key);
    if (parent.nodes.first().key !== startBlock.key) return next();
    event.preventDefault();
    editor.unwrapBlockquote();
  };

  const isBlockquoteLine = editor =>
    editor.value.startBlock.type === blocks.blockquote_line;

  const renderBlock = createRenderBlock({ blocks, classNames });
  const commands = createCommands({ blocks });
  const schema = createSchema({ blocks });

  return [
    {
      commands,
      renderBlock,
      renderNode: renderBlock, // COMPAT: renderNode is removed in slate
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
