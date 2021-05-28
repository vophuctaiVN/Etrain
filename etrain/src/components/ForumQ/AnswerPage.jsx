import React, { Component } from "react";
import {
  getCookiesValue,
  USER_IMAGE_DOMAIN,
  showAlert,
} from "../../utils/helpers";
import { AnswerElement } from "./AnswerElement";
class AnswerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerList: [],
      totalitems: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getQnListA(this.props.match.params.lessonid);
  }

  getQnListA = (fatherID) => {
    const queryObj = {
      fatherID,
    };

    const queryObjQ = {
      ID: this.props.match.params.lessonid,
    };
    window
      .ForumQuestionList_Query(queryObjQ)
      .then((question) => {
        window
          .ForumAnswerList_Query(queryObj)
          .then((result) =>
            this.setState({
              question: question.json.result.items[0],
              answerList: result.json.result.items,
              totalitems: result.json.result.totalRows,
            })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      Detail: document.getElementById("answerDetail").value,
      IDaccount: getCookiesValue("userID"),
      IDquestion: this.props.match.params.lessonid,
    };
    window.Answer_Create_APIsService_Update(formData).then((result) => {
      switch (result.statusCode) {
        case 400:
        case 404:
        case 500:
          break;
        case 200:
          showAlert(result.json.error.message, "You added new answer!");
          this.getQnListA(this.props.match.params.lessonid);
          break;
        default:
          break;
      }
    });
  }

  render() {
    const localItem = this.state.question;
    var question = {};
    var profile = {};
    var dateObj;
    var month;
    var day;
    var year;
    var hour;
    var minutes;
    var newdate;
    var time;

    if (localItem !== undefined) {
      question = localItem.question;
      profile = localItem.profile;

      dateObj = new Date(question.time);
      month = dateObj.getMonth() + 1;
      day = dateObj.getDate();
      year = dateObj.getFullYear();
      hour = dateObj.getHours();
      minutes = dateObj.getMinutes();

      newdate = year + "/" + month + "/" + day;
      time = hour + ":" + minutes;
    }

    let listanswers = this.state.answerList.map((element) => (
      <AnswerElement
        profile={element.profile}
        answer={element.answer}
        key={Math.random()}
      />
    ));

    return (
      <section className="special_cource padding_top">
        <div className="column-text open">
          <div className="header">
            <h1>{question.question}</h1>
          </div>
          <div className="content">
            <div className="element first">
              <div className="message">
                <div>{question.detail}</div>
                <div className="topic">
                  <a className="tag" href="/view/discussions/tagged/porta">
                    {question.topic}
                  </a>{" "}
                </div>
                <div className="user-info">
                  <div className="when">
                    {newdate} at {time}
                  </div>
                  <a className="gravatar" href="/view/users/6/HH">
                    <img
                      alt="..."
                      src={`${USER_IMAGE_DOMAIN}/${profile.image}`}
                      width={32}
                      height={32}
                    />
                  </a>
                  <div className="details">
                    <a href="javascript:void(0)">{profile.name}</a>
                    <span className="user-location">{profile.score}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3>{this.state.totalitems} Answers</h3>

            {listanswers}

            <div className="element">
              <h4 className="title">Your Answer</h4>
              <div className="content">
                <div className="feedeback">
                  <textarea
                    id="answerDetail"
                    className="form-control"
                    cols={10}
                    rows={10}
                    defaultValue={""}
                  />
                  <div className="mt-10 text-right">
                    <a
                      href="javascript:void(0)"
                      className="btn_1"
                      onClick={this.handleSubmit}
                    >
                      Post
                    </a>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AnswerPage;
