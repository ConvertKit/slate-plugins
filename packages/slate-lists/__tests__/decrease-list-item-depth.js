/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("decreaseListItemDepth", () => {
  it("should decrease the depth", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Test</list_item_child>
            <unordered_list>
              <list_item>
                <list_item_child>
                  <cursor />
                </list_item_child>
              </list_item>
            </unordered_list>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>Test</list_item_child>
        </list_item>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.decreaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should do nothing at the top level", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Test</list_item_child>
          </list_item>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>Test</list_item_child>
        </list_item>
        <list_item>
          <list_item_child>
            <cursor />
          </list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.decreaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
