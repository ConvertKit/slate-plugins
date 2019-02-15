/** @jsx h */
import h from "../../../shared/hyperscript";

export default (
  <value>
    <document>
      <paragraph>Edit the list below:</paragraph>
      <unordered_list>
        <list_item>
          <list_item_child>Item 1</list_item_child>
          <unordered_list>
            <list_item>
              <list_item_child>Subitem 1</list_item_child>
            </list_item>
            <list_item>
              <list_item_child>Subitem 2</list_item_child>
            </list_item>
          </unordered_list>
        </list_item>
        <list_item>
          <list_item_child>Item 2</list_item_child>
        </list_item>
      </unordered_list>
    </document>
  </value>
);
