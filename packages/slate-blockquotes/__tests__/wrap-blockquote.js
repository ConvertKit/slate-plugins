/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import html from "../../../shared/htm";
import Blockquotes from "../src";

describe("wrapBlockquote", () => {
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

  it("should wrap the selected lines in blockquotes", () => {
    const input = createValue([
      <paragraph>
        <anchor />
        Quote 1
      </paragraph>,
      <paragraph>
        Quote 2<focus />
      </paragraph>
    ]);

    editor.setValue(input);

    editor.toggleBlockquote();

    const expected = createValue(html`
      <blockquote>
        <blockquote_line><anchor />Quote 1</blockquote_line>
        <blockquote_line>Quote 2<focus /></blockquote_line>
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
