import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import $ from "jquery";

export function MyStatefulEditor(props) {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  useEffect(() => {
    $(".IconButton__icon-align_left___1S9rt").parent().hide();
    $(".IconButton__icon-align_center___KBWGR").parent().hide();
    $(".IconButton__icon-align_right___1bWGZ").parent().hide();
    $(".IconButton__icon-align_justify___3eBV5").parent().hide();
    $(".IconButton__icon-unordered-list-item___Pvkrr").parent().hide();
    $(".IconButton__icon-blockquote___17VSX").parent().hide();
  }, []);

  const onChange = (value) => {
    setValue(value);
    props.exportValue(value.toString("html"));
  };

  return <RichTextEditor value={value} onChange={onChange} />;
}
