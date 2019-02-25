const sameType = (node, other) => node.type == other.type;

export default ({ blocks }) => {
  const isList = block =>
    block &&
    (block.type == blocks.unordered_list || block.type == blocks.ordered_list);

  return (node, editor, next) => {
    if (node.object !== "document" && node.object !== "block") return next();

    const mergable = node.nodes
      .map((child, index) => {
        if (!isList(child)) {
          return null;
        }

        const adjacent = node.nodes.get(index + 1);

        if (!adjacent || !isList(adjacent) || !sameType(child, adjacent)) {
          return null;
        }

        return [child, adjacent];
      })
      .filter(node => node);

    if (mergable.isEmpty()) return next();

    return editor => {
      mergable.reverse().forEach(([list, adjacent]) => {
        const updatedAdjacent = editor.value.document.getDescendant(
          adjacent.key
        );

        updatedAdjacent.nodes.forEach((child, index) => {
          editor.withoutNormalizing(() => {
            editor.moveNodeByKey(child.key, list.key, list.nodes.size + index);
          });
        });

        editor.withoutNormalizing(() => {
          editor.removeNodeByKey(adjacent.key);
        });
      });
    };
  };
};
