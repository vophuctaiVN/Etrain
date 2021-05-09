import React, { Component } from "react";
import SpeakerSound from "./Sound";
import { BiStar } from "react-icons/bi";

class Word extends Component {
  state = { starColor: false };
  MemberForgetWord() {
    console.log(this.state.starColor);
    this.setState({
      starColor: !this.state.starColor,
    });
  }
  render() {
    let vocab = this.props.vocab;
    return (
      <>
        <div className="media post_item">
          <img className="vocab-img" src={vocab.imageURL} alt="post" />
          <div className="media-body">
            <h2>{vocab.en} </h2>
            <BiStar
              size={20}
              color={this.state.starColor ? "#f9b700" : null}
              style={{ float: "right", margin: "10px" }}
              onClick={() => this.MemberForgetWord()}
            />
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
