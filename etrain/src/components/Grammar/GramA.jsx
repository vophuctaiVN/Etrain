import React, { Component } from "react";
import {
  getCookiesValue,
  showAlert,
  USER_IMAGE_DOMAIN,
} from "../../utils/helpers";
import { Link } from "react-router-dom";

class GramA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerList: [],
      totalitems: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getListAnswer(this.props.questionID);
  }

  getListAnswer = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .ForumAnswerList_Query(queryObj)
      .then((result) =>
        this.setState({
          answerList: result.json.result.items,
          totalitems: result.json.result.totalRows,
        })
      )
      .catch((error) => console.log(error));
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      Detail: document.getElementById("answerDetail").value,
      IDaccount: getCookiesValue("userID"),
      IDquestion: this.props.questionID,
    };
    window.Answer_Create_APIsService_Update(formData).then((result) => {
      switch (result.statusCode) {
        case 400:
        case 404:
        case 500:
          break;
        case 200:
          showAlert(result.json.error.message, "You added new answer!");
          document.getElementById("answerDetail").value = "";
          this.getListAnswer(this.props.questionID);
          break;
        default:
          break;
      }
    });
  }

  render() {
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
    if (this.state.answerList)
      lisquestions = this.state.answerList.map((element, index) => (
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
                  <a href="# ">{element.profile.name}</a>
                </h5>
                <div className="rating">{element.answer.detail}</div>
                <p className="comment">{date(element.answer.time)}</p>
              </div>
            </div>
          </div>
        </div>
      ));
    return (
      <>
        <div
          className="content"
          style={{ marginLeft: "30px", marginRight: "70px" }}
        >
          <div className="comments-area mb-30">{lisquestions}</div>
          {this.props.isLogin ? (
            <div className="feedeback" style={{ marginRight: "-70px" }}>
              <textarea
                name="feedback"
                className="form-control"
                cols={10}
                rows={10}
                defaultValue={""}
                id="answerDetail"
              />
              <div className="mt-10 text-right">
                <a
                  href="# "
                  className="btn_1"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Send
                </a>
              </div>
            </div>
          ) : (
            <p>
              <Link to={`/login`}> Login </Link> to show your answer
            </p>
          )}
        </div>
      </>
    );
  }
}

export default GramA;
