import React, { Component } from "react";
import {
  getCookiesValue,
  showAlert,
  USER_IMAGE_DOMAIN,
  isLogin,
} from "../../utils/helpers";
import GramA from "./GramA";
import { Link } from "react-router-dom";

class GramQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      loginStt: false,
      totalitems: 0,
      pageNo: 1,
      pageSize: 5,
      ranking: [],
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
      .then((result) => {
        window
          .Rank_Query({ top: 5 })
          .then(async (ranking) => {
            const x = await isLogin();
            this.setState({
              questionList: result.json.result.items,
              totalitems: result.json.result.totalRows,
              pageNo: PageNo,
              pageSize: PageSize,
              showMoreToggle: [],
              loginStt: x,
              ranking: ranking.json.result.items,
            });
          })
          .catch((error) => console.log(error));
      })
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

    let lisquestions = this.state.questionList.map((element, index) => {
      let isStar = false;
      this.state.ranking.forEach((profile) => {
        if (profile.iD_account == element.profile.iD_account) isStar = true;
      });
      return (
        <div
          key={index}
          className="comment-list"
          style={{ marginRight: "100px" }}
        >
          <div className="single-comment single-reviews justify-content-between d-flex">
            <div className="user justify-content-between display-webkit-box">
              <div className="thumb">
                <img
                  src={`${USER_IMAGE_DOMAIN}/${element.profile.image}`}
                  alt=""
                />
              </div>
              <div className="desc">
                <h5>
                  {element.profile.name} - {element.profile.level}
                  {isStar ? (
                    <a>
                      <img
                        src="img/icon/color_star.svg"
                        style={{ marginLeft: "5px" }}
                      />
                    </a>
                  ) : null}
                </h5>
                <div className="rating">{element.question.question}</div>
                <p className="comment">{date(element.question.time)}</p>
              </div>
            </div>
          </div>
          <GramA
            key={element.question.id}
            questionID={element.question.id}
            isLogin={this.state.loginStt}
            isShow={this.state.showMoreToggle[index]}
            NumberOfUserClick={() =>
              this.ToggleClick(index, element.question.id)
            }
            numberofUsers={element.question.numberOfAnswer}
          />
        </div>
      );
    });
    return (
      <>
        <h4 className="title">Question?</h4>
        <div className="content">
          {this.state.loginStt ? (
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
                <button
                  className="btn_1"
                  onClick={this.handleSubmitQuestion.bind(this)}
                >
                  Send your question
                </button>
              </div>
            </div>
          ) : (
            <p>
              <Link to={`/login`}> Login </Link> to ask question
            </p>
          )}
          <div className="comments-area mb-30">{lisquestions}</div>
        </div>
      </>
    );
  }
}

export default GramQ;
