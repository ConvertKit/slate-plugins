import React, { useRef } from "react";
import Editor from "../../../shared/test-editor";
import {
  OrderedList,
  UnorderedList,
  Indent,
  Outdent
} from "../../../shared/test-editor/icons";
import Button from "../../../shared/test-editor/button";
import Lists from "../src";
import value from "./test-value";

const plugins = [Lists()];

const TestEditor = () => {
  const editor = useRef(null);

  const toggleUnorderedList = event => {
    event.preventDefault();
    editor.current.toggleList();
  };

  const toggleOrderedList = event => {
    event.preventDefault();
    editor.current.toggleList({ type: "ordered-list" });
  };

  const indent = event => {
    event.preventDefault();
    editor.current.increaseListItemDepth();
  };

  const outdent = event => {
    event.preventDefault();
    editor.current.decreaseListItemDepth();
  };

  return (
    <div>
      <Button onMouseDown={toggleUnorderedList} hiddenText="Unordered List">
        <UnorderedList />
      </Button>
      <Button onMouseDown={toggleOrderedList} hiddenText="Ordered List">
        <OrderedList />
      </Button>
      <Button onMouseDown={indent} hiddenText="Indent">
        <Indent />
      </Button>
      <Button onMouseDown={outdent} hiddenText="Outdent">
        <Outdent />
      </Button>
      <Editor ref={editor} plugins={plugins} initialValue={value} />
    </div>
  );
};

export default TestEditor;
