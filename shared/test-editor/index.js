import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

export default class TestEditor extends Component {
  constructor(props) {
    super(props);
    this.plugins = props.plugins;
    this.state = {
      value: Value.fromJSON(props.initialValue)
    };
  }

  handleChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    const { plugins, ...props } = this.props;
    return (
      <Editor
        plugins={this.plugins}
        value={this.state.value}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
