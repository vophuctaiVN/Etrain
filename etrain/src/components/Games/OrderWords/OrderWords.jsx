import React, { Component } from "react";
import ScoreMain from "../MatchingWord/score";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";
import $ from "jquery";

class OrderWords extends Component {
  constructor() {
    super();
    this.items = [
      ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"],
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "l"],
      ["m", "n", "o"],
    ];

    this.state = this.getInitialState();
    this._showMessage = this._showMessage.bind(this);
    this._changeWord = this._changeWord.bind(this);
    this.durationEnd = this.durationEnd.bind(this);
    this._playAgain = this._playAgain.bind(this);
  }

  getInitialState() {
    var self = this;
    // nhớ cancel listener event bên keyborad result
    /*  window.addEventListener("wordmatched", function (event) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }

      self._showMessage("success");
      setTimeout(function () {
        $("#message").hide(100);
        self.setState({
          score: self.state.score + 10,
          currentQuestionIndex: self.state.currentQuestionIndex + 1,
          questionTimeDuration: self.state.questionTimeDuration,
        });
      }, 2000);
    }); */

    window.addEventListener("wordmatched", function (event) {
      self.setState({
        score: self.state.score + 10,
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
      questionLimit: this.items.length,
      questionTimeDuration: 10,
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
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        questionTimeDuration: this.state.questionTimeDuration,
      });
    } else {
      $("#score-card").html(this.state.score);

      clearInterval(window.interval);
      this.setState({ hideReplay: false, stopTimer: true, isOpen: true });
    }
  }

  durationEnd() {
    this._changeWord();
  }

  _playAgain() {
    clearInterval(window.interval);
    this.setState({
      score: 0,
      currentQuestionIndex: 1,
      questionLimit: this.items.length,
      questionTimeDuration: 10,
      message: "Good Job",
      hideReplay: true,
      stopTimer: false,
      isOpen: false,
    });
  }

  render() {
    let DetailClose = () =>
      this.setState({ hideReplay: false, stopTimer: true, isOpen: false });

    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center order-background words-container">
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
            <WordsArray
              answer={this.items[this.state.currentQuestionIndex - 1]}
            />
            <Footer
              hideReplay={this.state.hideReplay}
              onRefresh={this._playAgain}
              message={this.state.message}
              skipquestion={this._changeWord}
            />
          </div>
        </div>
      </section>
    );
  }
}

class WordsArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.shuffle([...this.props.answer]),
    };
  }

  //state chỉ khởi tạo 1 lần
  componentWillReceiveProps(nextProps) {
    const array1 = nextProps.answer;
    const array2 = this.props.answer;
    if (
      array1.length != array2.length ||
      array1.every(function (value, index) {
        return value !== array2[index];
      })
    )
      this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    this.setState({
      items: this.shuffle([...props.answer]),
    });
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
