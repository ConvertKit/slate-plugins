/** @jsx h */
import { Editor } from "slate";
import { createHyperscript } from "slate-hyperscript";
import hyperprint from "slate-hyperprint";
import events from "./events";
import diff from "jest-diff";

const h = createHyperscript({});

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

const print = value => hyperprint(value, { strict: true });

expect.extend({
  toMatchSlateValue(received, expected) {
    const receivedDocument = print(received.document);
    const expectedDocument = print(expected.document);
    const pass = this.equals(received.toJSON(), expected.toJSON());

    const message = () =>
      `Difference:\n${diff(receivedDocument, expectedDocument)}`;
    return { actual: received, message, pass };
  }
});

export { SlateTest as default, events as createEvent };
