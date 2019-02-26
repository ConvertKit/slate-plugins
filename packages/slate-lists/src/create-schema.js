export default ({ blocks }) => {
  return {
    blocks: {
      [blocks.unordered_list]: {
        nodes: [
          {
            match: { type: blocks.list_item }
          }
        ]
      },
      [blocks.ordered_list]: {
        nodes: [
          {
            match: { type: blocks.list_item }
          }
        ]
      },
      [blocks.list_item]: {
        parent: [
          { type: blocks.unordered_list },
          { type: blocks.ordered_list }
        ],
        nodes: [
          {
            match: { type: blocks.list_item_child },
            min: 1,
            max: 1
          },
          {
            match: [
              { type: blocks.unordered_list },
              { type: blocks.ordered_list }
            ],
            min: 0,
            max: 1
          }
        ],
        normalize: (editor, error) => {
          switch (error.code) {
            case "child_min_invalid":
              editor.insertNodeByKey(error.node.key, 0, {
                object: "block",
                type: blocks.list_item_child
              });
            case "child_type_invalid":
              editor.wrapBlockByKey(error.child.key, {
                type: blocks.list_item_child
              });
              return;
            case "parent_type_invalid":
              editor.wrapBlock(blocks.unordered_list);
              return;
            default:
              return;
          }
        }
      }
    }
  };
};
