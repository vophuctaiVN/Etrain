import React, { Component } from "react";
import {
  getCookiesValue,
  showAlert,
  USER_IMAGE_DOMAIN,
} from "../../utils/helpers";

class GramQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.getQuestionList({
      Search: document.getElementById("question").value,
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
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
      Detail: "",
      IDaccount: getCookiesValue("userID"),
    };
    window
      .Question_Create_APIsService_Update(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
            //notify(result.json.error.message, result.json.error.detail, "error");
            break;
          case 200:
            showAlert(result.json.error.message, "You added new question!");
            window.location.reload();
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    console.log(this.state.questionList);
    let lisquestions = this.state.questionList.map((element) => (
      <div className="comment-list">
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
              <div className="rating">
                <a href="# ">
                  <img src="img/icon/color_star.svg" alt="" />
                </a>
                <a href="# ">
                  <img src="img/icon/color_star.svg" alt="" />
                </a>
                <a href="# ">
                  <img src="img/icon/color_star.svg" alt="" />
                </a>
                <a href="# ">
                  <img src="img/icon/color_star.svg" alt="" />
                </a>
                <a href="# ">
                  <img src="img/icon/star.svg" alt="" />
                </a>
              </div>
              <p className="comment">{element.question.question}</p>
            </div>
          </div>
          {/* <p style={{ float: "right" }}>{element.question.question}</p> */}
        </div>
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
