import React, { useEffect, useState } from "react";
import {
  getCookiesValue,
  showAlert,
  USER_IMAGE_DOMAIN,
} from "../../utils/helpers";
import { Link } from "react-router-dom";

function GramA(props) {
  const [gramA, setGramA] = useState({
    answerList: [],
    totalitems: 0,
    ranking: [],
  });

  useEffect(() => getListAnswer(props.questionID), []);

  const getListAnswer = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .ForumAnswerList_Query(queryObj)
      .then((result) => {
        window
          .Rank_Query({ top: 5 })
          .then(async (ranking) =>
            setGramA({
              answerList: result.json.result.items,
              totalitems: result.json.result.totalRows,
              ranking: ranking.json.result.items,
            })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      Detail: document.getElementById(props.questionID).value,
      IDaccount: getCookiesValue("userID"),
      IDquestion: props.questionID,
    };
    window.Answer_Create_APIsService_Update(formData).then((result) => {
      switch (result.statusCode) {
        case 400:
        case 404:
        case 500:
          break;
        case 200:
          showAlert(result.json.error.message, "You added new answer!");
          document.getElementById(props.questionID).value = "";
          getListAnswer(props.questionID);
          break;
        default:
          break;
      }
    });
  };

  const date = (Time) => {
    const dateObj = new Date(Time);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const newdate = year + "/" + month + "/" + day;
    const time = hour + ":" + minutes;

    return newdate + " at " + time;
  };

  let lisquestions;
  if (gramA.answerList)
    lisquestions = gramA.answerList.map((element, index) => {
      let isStar = false;
      gramA.ranking.forEach((profile) => {
        if (profile.iD_account == element.profile.iD_account) isStar = true;
      });
      return (
        <div key={index} className="comment-list">
          <div className="single-comment single-reviews justify-content-between d-flex">
            <div className="user justify-content-between display-webkit-box">
              <div>
                <img
                  className="gram-answer-image"
                  src={`${USER_IMAGE_DOMAIN}/${element.profile.image}`}
                  alt=""
                />
              </div>
              <div className="desc">
                <h5>
                  <a>
                    {element.profile.name} - {element.profile.level}
                    {isStar ? (
                      <a>
                        <img
                          src="img/icon/color_star.svg"
                          style={{ marginLeft: "5px" }}
                        />
                      </a>
                    ) : null}
                  </a>
                </h5>
                <div className="rating">{element.answer.detail}</div>
                <p className="comment">{date(element.answer.time)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <>
      <p onClick={props.NumberOfUserClick} style={{ float: "right" }}>
        {gramA.answerList.length} answers
      </p>
      {props.isShow ? (
        <div
          className="content"
          style={{ marginLeft: "30px", marginRight: "70px" }}
        >
          <div className="comments-area mb-30">{lisquestions}</div>
          {props.isLogin ? (
            <div className="feedeback" style={{ marginRight: "-70px" }}>
              <textarea
                className="form-control"
                cols={10}
                rows={10}
                id={props.questionID}
              />
              <div className="mt-10 text-right">
                <button className="btn_1" onClick={handleSubmit.bind(this)}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <p>
              <Link to={`/login`}> Login </Link> to show your answer
            </p>
          )}
        </div>
      ) : null}
    </>
  );
}

export default GramA;
