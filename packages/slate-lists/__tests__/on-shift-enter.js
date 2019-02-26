/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest, { createEvent } from "@convertkit/slate-testing-library";
import Lists from "../src";

describe("onShiftEnter", () => {
  it("should soft break", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              Item 1<cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>
            {"Item 1\n"}
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.run(
      "onKeyDown",
      createEvent.keyDown({ key: "Enter", shiftKey: true })
    );

    expect(editor.value).toMatchSlateValue(expected);
  });
});
