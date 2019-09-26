/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import html from "../../../shared/htm";
import Blockquotes from "../src";

describe("plugin", () => {
  const { editor, createValue } = SlateTest({ plugins: [Blockquotes()] });

  it("onBackspace should unwrap the blockquote if there's no text", () => {
    const input = createValue(html`
      <paragraph>Value</paragraph>
      <blockquote>
        <blockquote_line><cursor /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));

    const expected = createValue(
      html`
        <paragraph>Value</paragraph><paragraph><text /></paragraph>
      `
    );

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should unwrap all lines in the blockquote", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line><cursor />Quote 1</blockquote_line>
        <blockquote_line>Quote 2</blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));

    const expected = createValue(html`
      <paragraph>Quote 1</paragraph>
      <paragraph>Quote 2</paragraph>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should unwrap blockquote if there's no text in front of the cursor", () => {
    const input = createValue(html`
      <paragraph>Some value</paragraph>
      <blockquote>
        <blockquote_line><cursor />A</blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));
    editor.deleteBackward();

    const expected = createValue(html`
      <paragraph>Some valueA</paragraph>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should unwrap blockquote if there's no text in front of the cursor", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line><cursor />A</blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));
    editor.deleteBackward();

    const expected = createValue(html`
      <paragraph>A</paragraph>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should not unwrap blockquote if the selection is expanded", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line><anchor />Some text<focus /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));
    editor.deleteBackward();

    const expected = createValue(html`
      <blockquote>
        <blockquote_line><text /></blockquote_line>
      </blockquote>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should not unwrap blockquote if the cursor is offset", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line>A<cursor /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));
    editor.deleteBackward();

    const expected = createValue(html`
      <blockquote>
        <blockquote_line><text /></blockquote_line>
      </blockquote>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("onBackspace should not unwrap blockquote if there are multiple lines the blockquote", () => {
    const input = createValue(html`
      <blockquote>
        <blockquote_line>Quote 1</blockquote_line>
        <blockquote_line><cursor /></blockquote_line>
      </blockquote>
    `);

    editor.setValue(input);

    editor.run("onKeyDown", createEvent.keyDown({ key: "backspace" }));
    editor.deleteBackward();

    const expected = createValue(html`
      <blockquote>
        <blockquote_line>Quote 1</blockquote_line>
      </blockquote>
    `);

    expect(editor.value).toMatchSlateValue(expected);
  });
});
