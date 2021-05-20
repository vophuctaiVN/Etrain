import React, { Component } from "react";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import SpeakerSound from "./Sound";
import { BiStar } from "react-icons/bi";
import Speech from "react-speech";
import { ImCross } from "react-icons/im";

class Word extends Component {
  speechRef = React.createRef();
  state = { starColor: this.props.lightStar };
  MemberForgetWord(isHidden = false) {
    window.AccountAPIsService_CheckAuth(getCookiesValue("authToken")).then(
      window
        .RememberForgetWordAPI({
          accountID: getCookiesValue("userID"),
          wordID: this.props.vocab.id,
        })
        .then(
          this.setState({
            starColor: !this.state.starColor,
            hidden: isHidden,
          })
        )
    );
  }
  render() {
    let vocab = this.props.vocab;
    return (
      <>
        {!this.state.hidden ? (
          <div className="media post_item">
            <img className="vocab-img" src={vocab.imageURL} alt="post" />
            <div className="media-body">
              <h2>{vocab.en} </h2>
              {this.props.isShow ? (
                <BiStar
                  size={20}
                  color={this.state.starColor ? "#f9b700" : null}
                  style={{ float: "right", margin: "10px", cursor: "pointer" }}
                  onClick={() => this.MemberForgetWord()}
                />
              ) : null}
              {this.props.crossIcon ? (
                <ImCross
                  style={{ float: "right", margin: "10px", cursor: "pointer" }}
                  onClick={() => this.MemberForgetWord(true)}
                  color={"darkred"}
                />
              ) : null}
              <div>
                /{vocab.ipa}/ {/* <SpeakerSound url={vocab.soundURL} />{" "} */}
                <Speech
                  text={vocab.en}
                  pitch="1"
                  rate="1"
                  volume="1"
                  lang="en-GB"
                  voice="Google UK English Male"
                />
              </div>
              <span>
                {vocab.type} {vocab.vn}
              </span>
              <p>
                {vocab.example1}{" "}
                <Speech
                  text={vocab.example1}
                  pitch="1"
                  rate="1"
                  volume="1"
                  lang="en-GB"
                  voice="Google UK English Male"
                />
              </p>{" "}
              <p>
                {vocab.example2}{" "}
                <Speech
                  text={vocab.example2}
                  pitch="1"
                  rate="1"
                  volume="1"
                  lang="en-GB"
                  voice="Google UK English Male"
                />
              </p>{" "}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Word;
