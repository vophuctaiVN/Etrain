import React, { Component } from "react";
import RichTextEditor from "react-rte";
import $ from "jquery";

export class MyStatefulEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue(),
  };

  componentDidMount() {
    $(".IconButton__icon-align_left___1S9rt").parent().hide();
    $(".IconButton__icon-align_center___KBWGR").parent().hide();
    $(".IconButton__icon-align_right___1bWGZ").parent().hide();
    $(".IconButton__icon-align_justify___3eBV5").parent().hide();
    $(".IconButton__icon-unordered-list-item___Pvkrr").parent().hide();
    $(".IconButton__icon-blockquote___17VSX").parent().hide();
  }

  onChange = (value) => {
    this.setState({ value });
    this.props.exportValue(value.toString("html"));
  };

  render() {
    return <RichTextEditor value={this.state.value} onChange={this.onChange} />;
  }
}
