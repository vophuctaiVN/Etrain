import React, { Component } from "react";

class GramExample extends Component {
  render() {
    let example = this.props.example;
    let exampleline = example.example;
    return (
      <div className="single-post-area">
        <div className="blog-author">
          <div className="media align-items-center">
            <img
              src={example.imageURL}
              alt = ""
            />
            <div className="media-body">
              <a href="# ">
                <h4>Example {this.props.id}</h4>
              </a>
              <p
                dangerouslySetInnerHTML={{ __html: exampleline }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GramExample;
