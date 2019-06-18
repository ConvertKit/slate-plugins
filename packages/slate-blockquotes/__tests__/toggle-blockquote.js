import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import html from "../../../shared/htm";
import Blockquotes from "../src";

describe("toggleBlockquote", () => {
  const { editor, createValue } = SlateTest({ plugins: [Blockquotes()] });

  it("should wrap the current line in a blockquote", () => {
    const input = createValue(html`
      <paragraph>Text<cursor /></paragraph>
    `);

    editor.setValue(input);

    editor.toggleBlockquote();

    const expected = createValue(html`
      <blockquote>
        <blockquote_line>Text<cursor /></blockquote_line>
      </blockquote>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should unwrap the current blockquote", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line>Text<cursor /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.toggleBlockquote();

    const expected = createValue(html`
      <paragraph>Text<cursor /></paragraph>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });
});
