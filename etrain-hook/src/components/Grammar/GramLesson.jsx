import React from "react";
import GramExample from "./GramExample";

export function GramLesson(props) {
  let content = props.content;
  const formular = content.formular;
  const usage = content.usage;

  let id = 1;
  let listExamples = props.examples.map((example) => (
    <GramExample key={Math.random()} example={example} id={id++} />
  ));
  return (
    <>
      <div className="content_wrapper">
        <h4 className="title">{content.title}</h4>

        <div className="single-post-area">
          <div className="quote-wrapper">
            <p
              className="quotes"
              dangerouslySetInnerHTML={{ __html: formular }}
            />
          </div>
        </div>
      </div>

      <div className="content">
        <p className="quotes" dangerouslySetInnerHTML={{ __html: usage }} />
        <br />
        <br />
        {content.note !== "0" ? <b>{content.note}</b> : null}
      </div>
      {listExamples}
    </>
  );
}

export default GramLesson;
