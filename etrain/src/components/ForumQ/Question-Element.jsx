import React from "react";
import { getCookiesValue, USER_IMAGE_DOMAIN } from "../../utils/helpers";
import { Link } from "react-router-dom";

export class QuestionElement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const question = this.props.question;
    const profile = this.props.profile;
    const dateObj = new Date(question.time);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const newdate = year + "/" + month + "/" + day;
    const time = hour + ":" + minutes;
    return (
      <div className="element">
        <div className="discussion-summary">
          <div className="stats">
            <div className="answers">
              <strong>{question.numberOfAnswer}</strong> answers
            </div>
          </div>
          <div className="summary">
            <h3>
              <Link
                to={{
                  pathname: `/forum-${question.id}`,
                  query: {
                    question: question,
                    profile: profile
                  },
                }}
              >
                {question.question}
              </Link>
            </h3>
            <div className="excerpt">{question.detail}</div>
            <div className="topic">
              <a className="tag" href="/view/discussions/tagged/faucibus">
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
      </div>
    );
  }
}

export default QuestionElement;
