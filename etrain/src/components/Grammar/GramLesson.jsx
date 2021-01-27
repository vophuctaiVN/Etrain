import React, { Component } from "react";
import GramExample from "./GramExample";

export class GramLesson extends Component {
  render() {
    let content = this.props.content;
    let formular = content.formular;

    let id = 1;
    let listExamples = this.props.examples.map((example) => (
      <GramExample key={Math.random()} example={example} id={id++} />
    ));
    return (
      <>
        <div className="content_wrapper">
          <h4 className="title">{content.title}</h4>

          <div className="single-post-area">
            <div className="quote-wrapper">
              {/* <div className="quotes">{<strike>S + V/s-es</strike>}</div> */}
              <p
                className="quotes"
                dangerouslySetInnerHTML={{ __html: formular }}
              />
            </div>
          </div>
        </div>

        <div className="content">
          {content.usage}
          <br />
          <br />
          {content.note !== "0" ? <b>{content.note}</b> : null}
        </div>
        {listExamples}
      </>
    );
  }
}

export default GramLesson;
