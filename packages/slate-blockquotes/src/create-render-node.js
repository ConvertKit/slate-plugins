import React from "react";

export default ({ blocks, classNames }) => (props, editor, next) => {
  const { node } = props;
  switch (node.type) {
    case blocks.blockquote:
      return (
        <blockquote className={classNames.blockquote} {...props.attributes}>
          {props.children}
        </blockquote>
      );
    case blocks.blockquote_line: {
      return (
        <div className={classNames.blockquote_line} {...props.attributes}>
          {props.children}
        </div>
      );
    }
    default:
      return next();
  }
};
