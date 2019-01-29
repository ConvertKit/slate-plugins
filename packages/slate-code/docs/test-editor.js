import React, { Component } from "react";
import Editor from "../../../shared/test-editor";
import Code from "../src";
import value from "./test-value";
import "./test-editor.css";

const plugins = [Code()];

export default class TestEditor extends Component {
  render() {
    return (
      <div>
        <script src="https://unpkg.com/prettier@1.13.0/standalone.js" />
        <Editor plugins={plugins} initialValue={value} />
      </div>
    );
  }
}
