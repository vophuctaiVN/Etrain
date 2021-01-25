import React, { Component } from "react";
import { Link } from "react-router-dom";

class QuizTopic extends Component {
  render() {
    let x = "";
    let y = this.props.id % 3;
    switch (y) {
      case 1:
        x = "ti-layers";
        break;
      case 2:
        x = "ti-new-window";
        break;
      case 0:
        x = "ti-light-bulb";
        break;
    }
    return (
      <div className="col-sm-6 col-xl-3">
        <div className="single_feature">
          <div className="single_feature_part">
            <span className="single_feature_icon">
              <i className={x} />
            </span>
            <Link to={`/quizs-${this.props.id}`}>
              <h4>{this.props.title}</h4>
            </Link>
            <p>{this.props.note}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizTopic;
