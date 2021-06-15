import React, { Component } from "react";
import RichTextEditor from "react-rte";

export class MyStatefulEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue(),
  };

  onChange = (value) => {
    this.setState({ value });
    this.props.exportValue(value.toString("html"));
  };

  render() {
    console.log(this.state.value.toString("html"));
    return <RichTextEditor value={this.state.value} onChange={this.onChange} />;
  }
}
