const wrapWithOptions = (fn, options) => (...args) => fn(options, ...args);

const wrapBlockquote = ({ blocks }, editor, options = {}) => {
  const rootBlocks = editor.value.document.getRootBlocksAtRange(
    editor.value.selection
  );
  editor.withoutNormalizing(() => {
    if (rootBlocks.size === 1) {
      editor.wrapBlockByKey(editor.value.startBlock.key, blocks.blockquote);
      return;
    }
    rootBlocks.forEach(block => {
      editor.wrapBlockByKey(block.key, blocks.blockquote_line);
    });
    editor.wrapBlock(blocks.blockquote);
  });
};

const unwrapBlockquote = ({ blocks }, editor, options = {}) => {
  const startBlock = editor.value.startBlock;
  if (startBlock.type == blocks.blockquote_line) {
    const parent = editor.value.document.getParent(startBlock.key);
    editor.withoutNormalizing(() => {
      editor.unwrapBlockByKey(parent.key, { type: blocks.blockquote });
      parent.nodes.forEach(block => {
        editor.setNodeByKey(block.key, { type: blocks.default });
      });
    });
  }
};

const toggleBlockquote = ({ blocks }, editor, options = {}) => {
  const block = editor.value.startBlock;
  if (block.type == blocks.blockquote_line) {
    editor.unwrapBlockquote();
  } else {
    editor.wrapBlockquote();
  }
};

export default options => ({
  wrapBlockquote: wrapWithOptions(wrapBlockquote, options),
  unwrapBlockquote: wrapWithOptions(unwrapBlockquote, options),
  toggleBlockquote: wrapWithOptions(toggleBlockquote, options)
});
