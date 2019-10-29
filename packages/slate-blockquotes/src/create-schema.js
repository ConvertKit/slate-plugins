export default ({ blocks }) => {
  return {
    blocks: {
      [blocks.blockquote]: {
        nodes: [
          {
            match: { type: blocks.blockquote_line },
            min: 1
          }
        ],
        normalize: (editor, error) => {
          switch (error.code) {
            case "child_min_invalid":
              editor.insertNodeByKey(error.node.key, 0, {
                object: "block",
                type: blocks.blockquote_line
              });
              return;
            case "child_type_invalid":
              editor.wrapBlockByKey(error.child.key, {
                type: blocks.blockquote_line
              });
              return;
            default:
              return;
          }
        }
      },
      [blocks.blockquote_line]: {
        parent: [{ type: blocks.blockquote }],
        nodes: [
          {
            match: [{ object: "text" }, { object: "inline" }]
          }
        ],
        normalize: (editor, error) => {
          switch (error.code) {
            case "child_object_invalid":
              error.child.nodes.forEach((node, index) => {
                editor.moveNodeByKey(node.key, error.node.key, index);
              });
              editor.removeNodeByKey(error.child.key);
              return;
            default:
              return;
          }
        }
      }
    }
  };
};
