/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@convertkit/slate-testing-library";

import Blockquotes from "../src";

describe("blockquote", () => {
  describe("child_type_invalid", () => {
    it("should wrap child with blockquote_line", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Blockquotes()
      });

      editor.setValue(createValue(<blockquote />));

      const expected = createUnnormalizedValue(
        <blockquote>
          <blockquote_line />
        </blockquote>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });
});

describe("blockquote-line", () => {
  describe("parent_type_invalid", () => {
    it("should wrap blockquote_line with blockquote block", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Blockquotes()
      });

      editor.setValue(createValue(<blockquote_line />));

      const expected = createUnnormalizedValue(
        <blockquote>
          <blockquote_line />
        </blockquote>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });

  describe("child_type_invalid", () => {
    it("should remove invalid child node and append its children", () => {
      const { editor, createValue, createUnnormalizedValue } = SlateTest({
        plugins: Blockquotes()
      });

      editor.setValue(
        createValue(
          <blockquote>
            <blockquote_line>
              <unordered_list>
                Text 1<link>Text 2</link>
              </unordered_list>
            </blockquote_line>
          </blockquote>
        )
      );

      const expected = createUnnormalizedValue(
        <blockquote>
          <blockquote_line>
            Text 1<link>Text 2</link>
          </blockquote_line>
        </blockquote>
      );
      expect(editor.value).toMatchSlateValue(expected);
    });
  });
});
