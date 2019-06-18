import React, { useRef } from "react";
import html from "../../../shared/htm";
import Editor from "../../../shared/test-editor";
import { Quote } from "../../../shared/test-editor/icons";
import Button from "../../../shared/test-editor/button";
import Blockquotes from "../src";
import "./test-editor.css";

const plugins = [Blockquotes()];

const initialValue = html`
  <value>
    <document>
      <paragraph>Hello</paragraph>
      <blockquote>
        <blockquote_line>This is a quote!</blockquote_line>
      </blockquote>
    </document>
  </value>
`;

const TestEditor = () => {
  const editor = useRef(null);

  const toggleBlockquote = event => {
    event.preventDefault();
    editor.current.toggleBlockquote();
  };

  return (
    <div>
      <Button onMouseDown={toggleBlockquote} hiddenText="Blockquote">
        <Quote />
      </Button>

      <Editor ref={editor} plugins={plugins} initialValue={initialValue} />
    </div>
  );
};

export default TestEditor;
