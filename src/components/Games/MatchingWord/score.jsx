import React from "react";
import Timer from "./timer";
class ScoreMain extends React.Component {
  constructor(props) {
    super(props);
    this._endCounter = this._endCounter.bind(this);
    /* this.getInitialState = this.getInitialState.bind(this);
    this.state = this.getInitialState(); */
  }

  /*  getInitialState() {
    var self = this;
    // nhớ cancel listener event bên keyborad result
    window.addEventListener("wordmatched", function (event) {  console.log(self.state);
      self.setState({
      score: self.state.score + 10,
    });
    if (window.interval !== undefined) {
      clearInterval(window.interval);
    }
    });

    window.addEventListener("wordNOTmatched", function (event) {
      self.setState({
        score: self.state.score,
      });
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      } 
    });

    return {
      score: 0,
    };
  } */
  _endCounter() {
    this.props.ontimeup();
  }

  render() {
    return (
      <section className="container-fluid game-header">
        <div className="row">
          <div className="col-md-5 ">
            {" "}
            <PointScore points={this.props.score} />
          </div>
          <div className="col-md-2 ">
            <WordIndex
              current={this.props.current}
              limit={this.props.questionlimit}
            />
          </div>
          <div className="col-md-5 ">
            {" "}
            <Timer
              seconds={this.props.duration}
              stop={this.props.stopTimer}
              counterend={this._endCounter}
            />
          </div>
        </div>
      </section>
    );
  }
}

class PointScore extends React.Component {
  render() {
    return (
        <h2>Score: {this.props.points}</h2>
    );
  }
}

class WordIndex extends React.Component {
  render() {
    return (
      <div className="middle-text">
        <h2>
          {this.props.current}/{this.props.limit}
        </h2>
      </div>
    );
  }
}

export default ScoreMain;
