/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("toggleList", () => {
  it("should change the list to the specified type if it's different", () => {
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
      <ordered_list>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </ordered_list>
    );

    editor.toggleList({ type: "ordered-list" });

    expect(editor.value).toMatchSlateValue(expected);
  });
});
