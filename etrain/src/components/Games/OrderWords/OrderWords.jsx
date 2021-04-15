import React, { Component } from "react";
import ScoreMain from "../MatchingWord/score";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";
import $ from "jquery";

class OrderWords extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.randomIndex = this.randomIndex.bind(this);
    this._showMessage = this._showMessage.bind(this);
    this._changeWord = this._changeWord.bind(this);
    this.durationEnd = this.durationEnd.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this._playAgain = this._playAgain.bind(this);
  }

  getInitialState() {
    var self = this;
    // nhớ cancel listener event bên keyborad result
    window.addEventListener("wordmatched", function (event) {
      self.setState({
        score: self.state.score + 10,
        currentQuestion: self.state.currentAnswer,
        myanswer: null,
      });
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }

      self._showMessage("success");
      setTimeout(function () {
        $("#message").hide(100);
        self._changeWord();
      }, 2000);
    });

    return {
      score: 0,
      currentQuestionIndex: 1,
      questionLimit: 10,
      questionTimeDuration: 10,
      currentQuestionAnswer: null,
      message: "Good Job",
      hideReplay: true,
      stopTimer: false,
      isOpen: false,
    };
  }

  _showMessage(type) {
    if (type == "success") {
      this.state.message = "Good Job 🥰";
    } else {
      this.state.message = "Ooops 😩";
    }
    $("#message").show(200);
  }

  _changeWord() {
    if (window.interval !== undefined) {
      clearInterval(window.interval);
    }
    if (this.state.currentQuestionIndex < this.state.questionLimit) {
      var randNum = this.randomIndex();
      var word = this.words[randNum];
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        currentQuestion: word.question,
        currentAnswer: word.answer,
        questionTimeDuration: this.state.questionTimeDuration,
        myanswer: null,
      });
      this.questions.push(randNum);
    } else {
      $("#score-card").html(this.state.score);

      clearInterval(window.interval);
      this.setState({ hideReplay: false, stopTimer: true, isOpen: true });
    }
  }

  randomIndex() {
    var rand = Math.floor(Math.random() * this.words.length);
    return rand;
  }

  durationEnd() {
    this._changeWord();
  }

  async updateAnswer(answer) {
    this.setState({
      currentAnswer: answer,
    });
  }

  _playAgain() {
    clearInterval(window.interval);
    var randomNumber = this.randomIndex();
    var word = this.words[randomNumber];
    this.setState({
      score: 0,
      currentQuestionIndex: 1,
      questionLimit: 10,
      questionTimeDuration: 10,
      currentQuestionAnswer: null,
      currentQuestion: word.question,
      currentAnswer: word.answer,
      wordIndex: randomNumber,
      message: "Good Job",
      hideReplay: true,
      stopTimer: false,
      isOpen: false,
      myanswer: null,
    });
  }

  render() {
    let DetailClose = () =>
      this.setState({ hideReplay: false, stopTimer: true, isOpen: false });

    const answer = ["🍰 Cake", "🍕 Pizza", "🍎 Apple", "🍩 Donut"];
    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center order-background words-container">
            <div className="gamebackground">
              <ResultModal
                isOpen={this.state.isOpen}
                score={this.state.score}
                onHide={DetailClose}
              />
              <ScoreMain
                score={this.state.score}
                current={this.state.currentQuestionIndex}
                questionlimit={this.state.questionLimit}
                duration={this.state.questionTimeDuration}
                ontimeup={this.durationEnd}
                stopTimer={this.state.stopTimer}
              />
              <WordsArray answer={answer} />
              <Footer
                hideReplay={this.state.hideReplay}
                onRefresh={this._playAgain}
                message={this.state.message}
                skipquestion={this._changeWord}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class WordsArray extends Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"],
  };

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = (index) => {
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itthis, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter((item) => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
    this.wordChecking();
  };

  wordChecking() {
    const array1 = this.state.items;
    const array2 = this.props.answer;
    if (
      array1.length === array2.length &&
      array1.every(function (value, index) {
        return value === array2[index];
      })
    ) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }
      window.dispatchEvent(new Event("wordmatched"));
    }
  }

  render() {
    return (
      <ul className="words-container">
        {this.state.items.map((item, idx) => (
          <li
            key={item}
            onDragOver={() => this.onDragOver(idx)}
            className="word-frame"
          >
            <div
              draggable
              onDragStart={(e) => this.onDragStart(e, idx)}
              onDragEnd={this.onDragEnd}
              style={{ backgroundColor: "red" }}
            >
              <span className="word-box">{item}</span>
            </div>
            {/* <span className="content">{item}</span> */}
          </li>
        ))}
      </ul>
    );
  }
}

export default OrderWords;
