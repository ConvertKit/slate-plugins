/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("insertList", () => {
  it("should insert an unordered list by default", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <paragraph>
          <cursor />
        </paragraph>
      )
    );

    const expected = createValue([
      <paragraph />,
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    ]);

    editor.insertList();

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

    const expected = createValue([
      <paragraph />,
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    ]);

    editor.insertList({ type: "unordered-list" });

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

    const expected = createValue([
      <paragraph />,
      <unordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    ]);

    editor.insertList({ type: "unordered-list" });

    expect(editor.value).toMatchSlateValue(expected);
  });
});
