/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { createEvent } from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("onEnter", () => {
  it("should unwrap a list", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <paragraph>
        <cursor />
      </paragraph>
    );

    editor.run("onKeyDown", createEvent.keyDown({ key: "Enter" }));

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should unwrap at the current item", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Item</list_item_child>
          </list_item>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue([
      <unordered_list>
        <list_item>
          <list_item_child>Item</list_item_child>
        </list_item>
      </unordered_list>,
      <paragraph>
        <cursor />
      </paragraph>
    ]);

    editor.run("onKeyDown", createEvent.keyDown({ key: "Enter" }));

    expect(editor.value).toMatchSlateValue(expected);
  });
});
