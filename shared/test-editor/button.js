import React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import "./button.css";

const Button = ({ children, hiddenText, ...props }) => (
  <button className="editor-button" {...props}>
    {children}
    {hiddenText ? <VisuallyHidden>hiddenText</VisuallyHidden> : null}
  </button>
);

export default Button;
