/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("wrapList", () => {
  it("should insert an unordered list by default", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <paragraph>
          <cursor />
        </paragraph>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.wrapList();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should insert an unordered list when specified", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <paragraph>
          <cursor />
        </paragraph>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.wrapList({ type: "unordered-list" });

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should insert an ordered list when specified", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <paragraph>
          <cursor />
        </paragraph>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.wrapList({ type: "unordered-list" });

    expect(editor.value).toMatchSlateValue(expected);
  });
});
