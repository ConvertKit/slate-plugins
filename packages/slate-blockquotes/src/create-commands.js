const wrapWithOptions = (fn, options) => (...args) => fn(options, ...args);

const wrapBlockquote = ({ blocks }, editor, options = {}) => {
  editor.withoutNormalizing(() => {
    editor.setBlocks(blocks.blockquote);
  });
};

const unwrapBlockquote = ({ blocks }, editor, options = {}) => {
  editor.withoutNormalizing(() => {
    editor.unwrapBlock(blocks.blockquote);
    editor.setBlocks(blocks.default);
  });
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
