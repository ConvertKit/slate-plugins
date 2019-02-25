import React from "react";

export default ({ blocks, classNames }) => (props, editor, next) => {
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
    case blocks.list_item_child: {
      return (
        <div className={classNames.list_item_child} {...props.attributes}>
          {props.children}
        </div>
      );
    }
    default:
      return next();
  }
};
