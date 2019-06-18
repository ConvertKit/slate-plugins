import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import html from "../../../shared/htm";
import Blockquotes from "../src";

describe("wrapBlockquote", () => {
  const { editor, createValue } = SlateTest({ plugins: [Blockquotes()] });

  it("should unwrap the current blockquote", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line>Text<cursor /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.unwrapBlockquote();

    const expected = createValue(html`
      <paragraph>Text<cursor /></paragraph>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });
});
