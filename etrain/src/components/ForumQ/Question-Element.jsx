import React from "react";
import { getCookiesValue, USER_IMAGE_DOMAIN } from "../../utils/helpers";
import { Link } from "react-router-dom";

export class QuestionElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    window
      .Rank_Query({ top: 5 })
      .then(async (ranking) =>
        this.setState({
          ranking: ranking.json.result.items,
        })
      )
      .catch((error) => console.log(error));
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

    let isStar = false;
    this.state.ranking.forEach((info) => {
      if (info.iD_account == profile.iD_account) isStar = true;
    });
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
              <Link to={`/forum-${question.id}`}>{question.question}</Link>
            </h3>
            <div className="excerpt">{question.detail}</div>
            <div className="topic">
              <a className="tag">{question.topic}</a>{" "}
            </div>
            <div className="user-info">
              <div className="when">
                {newdate} at {time}
              </div>
              <a className="gravatar">
                <img
                  alt="..."
                  src={`${USER_IMAGE_DOMAIN}/${profile.image}`}
                  width={32}
                  height={32}
                />
              </a>
              <div className="details">
                <a href="javascript:void(0)">
                  {profile.name}
                  {isStar ? (
                    <a>
                      <img
                        src="img/icon/color_star.svg"
                        style={{ marginLeft: "5px" }}
                      />
                    </a>
                  ) : null}
                </a>
                <span className="user-location">
                  {profile.level} - {profile.score}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionElement;
