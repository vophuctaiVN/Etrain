import React from "react";
import Timer from "./timer";

function ScoreMain(props) {
  const _endCounter = () => {
    props.ontimeup();
  };

  return (
    <section className="container-fluid game-header">
      <div className="row">
        <div className="col-md-5 ">
          {" "}
          <PointScore points={props.score} />
        </div>
        <div className="col-md-2 ">
          <WordIndex current={props.current} limit={props.questionlimit} />
        </div>
        <div className="col-md-5 ">
          {" "}
          <Timer
            seconds={props.duration}
            stop={props.stopTimer}
            counterend={_endCounter}
          />
        </div>
      </div>
    </section>
  );
}

function PointScore(props) {
  return <h2>Score: {props.points}</h2>;
}

function WordIndex(props) {
  return (
    <div className="middle-text">
      <h2>
        {props.current}/{props.limit}
      </h2>
    </div>
  );
}

export default ScoreMain;
