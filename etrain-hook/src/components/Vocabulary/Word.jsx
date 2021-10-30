import React, { useState } from "react";
import { getCookiesValue } from "../../utils/helpers";
import { BiStar } from "react-icons/bi";
import Speech from "react-speech";
import { ImCross } from "react-icons/im";

function Word(props) {
  const [starColor, setStarColor] = useState(props.lightStar);
  const [hidden, setIsHidden] = useState(false);

  const MemberForgetWord = (isHidden = false, forgetID = null) => {
    window.AccountAPIsService_CheckAuth(getCookiesValue("authToken")).then(
      window
        .RememberForgetWordAPI({
          accountID: getCookiesValue("userID"),
          wordID: props.vocab.id,
        })
        .then(() => {
          if (forgetID !== null) props.updateNumberOfWords(forgetID);
          setStarColor(!starColor);
          setIsHidden(isHidden);
        })
    );
  };

  let vocab = props.vocab;

  return (
    <>
      {!hidden ? (
        <div className="media post_item">
          <img className="vocab-img" src={vocab.imageURL} alt="post" />
          <div className="media-body">
            <h2>{vocab.en} </h2>
            {props.isShow ? (
              <BiStar
                size={20}
                color={starColor ? "#f9b700" : null}
                style={{ float: "right", margin: "10px", cursor: "pointer" }}
                onClick={() => MemberForgetWord()}
              />
            ) : null}
            {props.crossIcon ? (
              <ImCross
                style={{ float: "right", margin: "10px", cursor: "pointer" }}
                onClick={() => MemberForgetWord(true, vocab.id)}
                color={"darkred"}
              />
            ) : null}
            <div>
              /{vocab.ipa}/
              <Speech
                text={vocab.en}
                pitch="1"
                rate="1"
                volume="1"
                lang="en-GB"
                voice="Google UK English Male"
              />
            </div>
            <span>{vocab.type} - </span>
            {vocab.vn}
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

export default Word;
