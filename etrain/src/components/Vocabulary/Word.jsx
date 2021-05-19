import React, { Component } from "react";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import SpeakerSound from "./Sound";
import { BiStar } from "react-icons/bi";
import { ImCross } from "react-icons/im";

class Word extends Component {
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
                /{vocab.ipa}/ <SpeakerSound url={vocab.soundURL} />
              </div>
              <span>
                {vocab.type} {vocab.vn}
              </span>

              <p>{vocab.example1}</p>
              <p>{vocab.example2}</p>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Word;
