import React, { Component } from "react";
import {
  getCookiesValue,
  showAlert,
  USER_IMAGE_DOMAIN,
} from "../../utils/helpers";
import GramA from "./GramA";

class GramQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 5,

      showMoreToggle: [],
    };

    this.ToggleClick = this.ToggleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestionList({
      Search: window.location.pathname.replace("/", ""),
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  ToggleClick(index, id) {
    let cloneToggles = this.state.showMoreToggle;
    if (!cloneToggles[index]) cloneToggles[index] = id;
    else cloneToggles[index] = false;
    this.setState({ showMoreToggle: cloneToggles });
  }

  getQuestionList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search,
    };
    window
      .ForumQuestionList_Query(queryObj)
      .then((result) =>
        this.setState({
          questionList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
        })
      )
      .catch((error) => console.log(error));
  };

  handleSubmitQuestion(event) {
    event.preventDefault();
    const formData = {
      Question: document.getElementById("question").value,
      Topic: window.location.pathname.replace("/", ""),
      Detail: "No detail",
      IDaccount: getCookiesValue("userID"),
    };
    window
      .Question_Create_APIsService_Update(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
            break;
          case 200:
            showAlert(result.json.error.message, "You added new question!");
            document.getElementById("question").value = "";
            this.getQuestionList({
              Search: window.location.pathname.replace("/", ""),
              PageNo: this.state.pageNo,
              PageSize: this.state.pageSize,
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    const date = (Time) => {
      console.log(Time);
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

    let lisquestions = this.state.questionList.map((element, index) => (
      <div key={index} className="comment-list">
        <div className="single-comment single-reviews justify-content-between d-flex">
          <div className="user justify-content-between d-flex">
            <div className="thumb">
              <img
                src={`${USER_IMAGE_DOMAIN}/${element.profile.image}`}
                alt=""
              />
            </div>
            <div className="desc">
              <h5>
                <a href="# ">{element.profile.name}</a>
              </h5>
              <div className="rating">{element.question.question}</div>
              <p className="comment">{date(element.question.time)}</p>
            </div>
          </div>
        </div>
        <p
          style={{ float: "right" }}
          onClick={() => this.ToggleClick(index, element.question.id)}
        >
          {element.question.numberOfAnswer} answers
        </p>
        {this.state.showMoreToggle[index] && (
          <GramA questionID={this.state.showMoreToggle[index]} />
        )}
      </div>
    ));
    return (
      <>
        <h4 className="title">Question?</h4>
        <div className="content">
          <div className="feedeback">
            <textarea
              name="feedback"
              className="form-control"
              cols={10}
              rows={10}
              defaultValue={""}
              id="question"
            />
            <div className="mt-10 text-right">
              <a
                href="# "
                className="btn_1"
                onClick={this.handleSubmitQuestion.bind(this)}
              >
                Send your question
              </a>
            </div>
          </div>
          <div className="comments-area mb-30">{lisquestions}</div>
        </div>
      </>
    );
  }
}

export default GramQ;
