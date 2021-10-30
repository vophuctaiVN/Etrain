import React from "react";
import { Link } from "react-router-dom";

function QuizTopic(props) {
  let x = "";
  let y = props.id % 3;
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
          <Link to={`/quizs-${props.id}`}>
            <h4>{props.title}</h4>
          </Link>
          <p>{props.note}</p>
        </div>
      </div>
    </div>
  );
}

export default QuizTopic;
