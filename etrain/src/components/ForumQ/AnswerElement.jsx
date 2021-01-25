import React from "react";
import { getCookiesValue, USER_IMAGE_DOMAIN } from "../../utils/helpers";

export class AnswerElement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() { console.log(this.props)
    const answer = this.props.answer;
    const profile = this.props.profile;
    const dateObj = new Date(answer.time);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const newdate = year + "/" + month + "/" + day;
    const time = hour + ":" + minutes;
    return (
      <div className="element">
        <div className="message">
          <div>{answer.detail}</div>
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
    );
  }
}

export default AnswerElement;
