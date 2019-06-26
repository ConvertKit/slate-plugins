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

  it("should decrease the indent of children", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Test 1</list_item_child>
            <unordered_list>
              <list_item>
                <list_item_child>
                  <cursor />
                  Test 2
                </list_item_child>
                <unordered_list>
                  <list_item>
                    <list_item_child>Test 2</list_item_child>
                  </list_item>
                </unordered_list>
              </list_item>
            </unordered_list>
          </list_item>
          <list_item>
            <list_item_child>Other Item</list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <unordered_list>
        <list_item>
          <list_item_child>Test 1</list_item_child>
        </list_item>
        <list_item>
          <list_item_child>
            <cursor />
            Test 2
          </list_item_child>
          <unordered_list>
            <list_item>
              <list_item_child>Test 2</list_item_child>
            </list_item>
          </unordered_list>
        </list_item>
        <list_item>
          <list_item_child>Other Item</list_item_child>
        </list_item>
      </unordered_list>
    );

    editor.decreaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should do nothing outside of a list", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <paragraph>
          <cursor />
        </paragraph>
      )
    );

    const expected = createValue(
      <paragraph>
        <cursor />
      </paragraph>
    );

    editor.decreaseListItemDepth();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
