/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Lists from "../src";

describe("normalizing", () => {
  describe("child_min_invalid", () => {
    it("should insert list_item_child", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Lists()
      });

      editor.setValue(
        createValue(
          <unordered_list>
            <list_item>
              <unordered_list>
                <list_item>
                  <list_item_child>
                    <text />
                  </list_item_child>
                </list_item>
              </unordered_list>
            </list_item>
          </unordered_list>
        )
      );

      const expected = createUnnormalizedValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              <text />
            </list_item_child>
            <unordered_list>
              <list_item>
                <list_item_child>
                  <text />
                </list_item_child>
              </list_item>
            </unordered_list>
          </list_item>
        </unordered_list>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });

  describe("child_invalid_type", () => {
    it("should wrap with list_item_child", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Lists()
      });

      editor.setValue(
        createValue(
          <unordered_list>
            <list_item />
          </unordered_list>
        )
      );

      const expected = createUnnormalizedValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              <text />
            </list_item_child>
          </list_item>
        </unordered_list>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });

  describe("parent_invalid_type", () => {
    it("should wrap with unordered_list", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Lists()
      });

      editor.setValue(
        createValue(
          <list_item>
            <list_item_child>
              <text />
            </list_item_child>
          </list_item>
        )
      );

      const expected = createUnnormalizedValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              <text />
            </list_item_child>
          </list_item>
        </unordered_list>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });
});
