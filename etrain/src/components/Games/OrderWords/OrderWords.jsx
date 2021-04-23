import React, { Component } from "react";
import ScoreMain from "../MatchingWord/score";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";
import $ from "jquery";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

class OrderWords extends Component {
  constructor(props) {
    super(props);
    this.exampleProps =
      JSON.parse(localStorage.getItem("tempitems")) ||
      this.props.location.query.items;

    this.items = [
      ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"],
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "l"],
      ["m", "n", "o"],
    ];
    this.items = [];
    this.items = this.itemByCharacter(this.exampleProps);

    this.state = this.getInitialState();
    this._showMessage = this._showMessage.bind(this);
    this._changeWord = this._changeWord.bind(this);
    this.durationEnd = this.durationEnd.bind(this);
    this._playAgain = this._playAgain.bind(this);
  }

  itemByCharacter(exampleProps) {
    const items = [];
    exampleProps.forEach((object) => {
      let setence =
        object.example.split("/(?<=.)/") ||
        object.example.split("/(?<=?)/") ||
        object.example.split("/(?<=!)/");
      items.push(setence[0].split(" "));
    });
    return items;
  }

  componentDidMount() {
    if (this.props.location.query && this.props.location.query.items) {
      localStorage.setItem(
        "tempitems",
        JSON.stringify(this.props.location.query.items)
      );
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("tempitems");
  }

  getInitialState() {
    var self = this;

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
      questionTimeDuration: 30,
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
      questionTimeDuration: 30,
      message: "Good Job",
      hideReplay: true,
      stopTimer: false,
      isOpen: false,
    });
  }

  render() {
    let DetailClose = () =>
      this.setState({ hideReplay: false, stopTimer: true, isOpen: false });

    const nowSentence = this.items[this.state.currentQuestionIndex - 1];

    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center words-container gamebackground">
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
            <div className="container-fluid">
              <img
                src={
                  this.exampleProps[this.state.currentQuestionIndex - 1]
                    .imageURL
                }
                height="500px"
                width="500px"
                className="center"
              />
            </div>
            <WordsArray sentence={nowSentence} />
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
      items: this.shuffle([...this.props.sentence]),
      userAnswer: [],
      suggestWord: "",
      myFault: "",
    };
    this.wordClick = this.wordClick.bind(this);
    this.wordBack = this.wordBack.bind(this);
    this.suggestWord = this.suggestWord.bind(this);
  }

  //state chỉ khởi tạo 1 lần
  componentWillReceiveProps(nextProps) {
    const array1 = nextProps.sentence;
    const array2 = this.props.sentence;
    if (JSON.stringify(array1) !== JSON.stringify(array2))
      this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    this.setState({
      items: this.shuffle([...props.sentence]),
      userAnswer: [],
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
    //2 tu trung thi sao?
    const array1 = this.state.items;
    const array2 = this.props.sentence;
    const array3 = this.state.userAnswer;
    if (
      (array1.length === array2.length &&
        array1.every(function (value, index) {
          return value === array2[index];
        })) ||
      (array3.length === array2.length &&
        array3.every(function (value, index) {
          return value === array2[index];
        }))
    ) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }
      window.dispatchEvent(new Event("wordmatched"));
    }
  }

  async wordClick(word, index) {
    await this.setState((prevState) => {
      let newArray = [...prevState.userAnswer];
      newArray.push(word);
      let removedItems = [...prevState.items];
      removedItems.splice(index, 1);
      return { items: removedItems, userAnswer: newArray };
    });
    this.wordChecking();
  }

  wordBack(word, index) {
    this.setState((prevState) => {
      let newArray = [...prevState.items];
      newArray.push(word);
      let removedItems = [...prevState.userAnswer];
      removedItems.splice(index, 1);
      return {
        items: newArray,
        userAnswer: removedItems,
        myFault: "",
        suggestWord: "",
      };
    });
  }

  suggestWord() {
    const arrRight = this.props.sentence;
    const arrMine = this.state.userAnswer;
    let indexWrong;

    for (var index = 0; index < arrMine.length; ++index) {
      if (arrMine[index] !== arrRight[index]) {
        indexWrong = index;
        break;
      }
    }

    if (indexWrong !== undefined) {
      //answer wrong
      this.setState({
        myFault: arrMine[indexWrong],
      });
      return;
    } else {
      //answer is allright up to now & no word
      this.setState({
        suggestWord: this.props.sentence[arrMine.length],
      });
      return;
    }
  }

  render() {
    return (
      <>
        <ul className="words-container">
          {this.state.items.map((item, idx) => (
            <li
              key={item}
              onDragOver={() => this.onDragOver(idx)}
              className={
                item == this.state.suggestWord
                  ? "suggest-word-frame"
                  : "word-frame"
              }
              onClick={() => this.wordClick(item, idx)}
            >
              <div
                draggable
                onDragStart={(e) => this.onDragStart(e, idx)}
                onDragEnd={this.onDragEnd}
              >
                <div className="word-box">{item}</div>
              </div>
            </li>
          ))}
        </ul>
        <BsFillQuestionOctagonFill onClick={this.suggestWord} size={50} />
        {this.state.userAnswer.length > 0 ? (
          <Result
            myanswer={this.state.userAnswer}
            wordBack={this.wordBack}
            checkResult={this.wordChecking}
            badWord={this.state.myFault}
          />
        ) : null}
      </>
    );
  }
}

class Result extends Component {
  render() {
    return (
      <section className="container-fluid main-area">
        <div className="rowKA">
          <div className="col-md-12">
            <div className="question">
              {this.props.myanswer.map((item, index) => (
                <h1
                  key={item}
                  className={
                    item === this.props.badWord
                      ? "error-current-word"
                      : "current-word"
                  }
                  onClick={() => this.props.wordBack(item, index)}
                >
                  {item}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default OrderWords;
