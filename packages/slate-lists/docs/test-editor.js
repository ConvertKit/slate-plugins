import React, { useRef } from "react";
import Editor from "../../../shared/test-editor";
import Lists from "../src";
import value from "./test-value";

const plugins = [Lists()];

const TestEditor = () => {
  const editor = useRef(null);

  const wrapList = event => {
    event.preventDefault();
    editor.current.wrapList();
  };

  return (
    <div>
      <button onMouseDown={wrapList}>wrapList</button>
      <Editor ref={editor} plugins={plugins} initialValue={value} />
    </div>
  );
};

export default TestEditor;
