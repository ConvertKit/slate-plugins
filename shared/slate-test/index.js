/** @jsx h */
import { Editor } from "slate";
import h from "../hyperscript";
import hyperprint from "slate-hyperprint";
import events from "./events";

const SlateTest = options => {
  // Create a value that is normalized using the same options as the editor.
  const createValue = children => {
    const editor = new Editor(options);
    const value = (
      <value>
        <document>{children}</document>
      </value>
    );
    editor.setValue(value);
    return editor.value;
  };

  const editor = new Editor(options);

  return { editor, createValue };
};

export { SlateTest as default, events };
