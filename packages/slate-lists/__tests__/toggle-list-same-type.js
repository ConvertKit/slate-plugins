/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("toggleList", () => {
  it("should unwrap the list when it's the same type", () => {
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

    editor.toggleList();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
