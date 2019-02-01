/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { events } from "../../../shared/slate-test";

import Lists from "../src";

describe("insertList", () => {
  it("should insert an unordered list", () => {
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
          <cursor />
        </list_item>
      </unordered_list>
    ]);

    editor.insertList();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
