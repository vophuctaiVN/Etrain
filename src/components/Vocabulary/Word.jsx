import React, { Component } from "react";
import SpeakerSound from "./Sound";
class Word extends Component {
  render() {
    let vocab = this.props.vocab;
    return (
      <>
        <div className="media post_item">
          <img className ="vocab-img" src={vocab.imageURL} alt="post" />
          <div className="media-body">
            <h2>{vocab.en} </h2>
            <div>
              /{vocab.ipa}/ <SpeakerSound url={vocab.soundURL} />
            </div>
            <span>
              {vocab.type} {vocab.vn}
            </span>

            <p>{vocab.example1}</p>
            <p>{vocab.example2}</p>
          </div>
        </div>
      </>
    );
  }
}

export default Word;
