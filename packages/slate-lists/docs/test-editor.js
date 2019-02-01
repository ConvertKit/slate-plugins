import React, { Component } from "react";
import Editor from "../../../shared/test-editor";
import Lists from "../src";
import value from "./test-value";

const plugins = [Lists()];

export default class TestEditor extends Component {
  render() {
    return (
      <div>
        <Editor plugins={plugins} initialValue={value} />
      </div>
    );
  }
}
