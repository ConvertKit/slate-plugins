/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("increaseListItemDepth", () => {
  it("should increase the depth", () => {
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
          <unordered_list>
            <list_item>
              <list_item_child>
                <cursor />
              </list_item_child>
            </list_item>
          </unordered_list>
        </list_item>
      </unordered_list>
    );

    editor.increaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should not increase beyond one level deeper than the parent", () => {
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
          <unordered_list>
            <list_item>
              <list_item_child>
                <cursor />
              </list_item_child>
            </list_item>
          </unordered_list>
        </list_item>
      </unordered_list>
    );

    editor.increaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should not delete the content", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Test</list_item_child>
            <unordered_list>
              <list_item>
                <list_item_child>Item 1</list_item_child>
              </list_item>
            </unordered_list>
          </list_item>
          <list_item>
            <list_item_child>
              Item 2<cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>Test</list_item_child>
          <unordered_list>
            <list_item>
              <list_item_child>Item 1</list_item_child>
            </list_item>
            <list_item>
              <list_item_child>Item 2</list_item_child>
            </list_item>
          </unordered_list>
        </list_item>
      </unordered_list>
    );

    editor.increaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
