import React, { Component } from "react";

function GramExample(props) {
  let example = props.example;
  let exampleline = example.example;
  return (
    <div className="single-post-area">
      <div className="blog-author">
        <div className="media align-items-center">
          <img src={example.imageURL} alt="" />
          <div className="media-body">
            <a href="# ">
              <h4>Example {props.id}</h4>
            </a>
            <p dangerouslySetInnerHTML={{ __html: exampleline }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GramExample;
