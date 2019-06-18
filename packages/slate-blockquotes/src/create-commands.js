const wrapWithOptions = (fn, options) => (...args) => fn(options, ...args);

const wrapBlockquote = ({ blocks }, editor, options = {}) => {
  const block = editor.value.startBlock;
  editor.withoutNormalizing(() => {
    editor.wrapBlockByKey(block.key, blocks.blockquote);
    editor.wrapBlockByKey(block.key, blocks.blockquote_line);
  });
};

const unwrapBlockquote = ({ blocks }, editor, options = {}) => {
  const block = editor.value.startBlock;
  if (block.type == blocks.blockquote_line) {
    const parent = editor.value.document.getParent(block.key);
    editor.withoutNormalizing(() => {
      editor.unwrapBlockByKey(parent.key, { type: blocks.blockquote });
      editor.setNodeByKey(block.key, { type: blocks.default });
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
