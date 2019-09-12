/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import html from "../../../shared/htm";
import Blockquotes from "../src";

describe("plugin", () => {
  const { editor, createValue } = SlateTest({ plugins: [Blockquotes()] });

  it("onBackspace should not unwrap blockquote", () => {
    const input = createValue(
      <paragraph>
        Quote <anchor />
        text
        <focus />
      </paragraph>
    );

    editor.setValue(input);
    editor.toggleBlockquote();

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));

    const expected = createValue(html`
      <blockquote>
        <blockquote_line>Quote </blockquote_line>
      </blockquote>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });
});
