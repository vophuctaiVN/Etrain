import React, { Component } from "react";
import ScoreMain from "../MatchingWord/score";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";
import $ from "jquery";
import Speech from "react-speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <section className="blog_area section_padding">
      <div className="container">
        <div className="row justify-content-center words-container gamebackground">
          <div>
            <p>Microphone: {listening ? "on" : "off"}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            {/*  <p>{transcript}</p> */}
            <section className="container-fluid main-area">
              <div className="rowKA">
                <div className="col-md-12">
                  <div className="question">{transcript}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

class Speaking extends Component {
  constructor(props) {
    super(props);
    this._showMessage = this._showMessage.bind(this);
    this._changeWord = this._changeWord.bind(this);
    this.durationEnd = this.durationEnd.bind(this);
    this._playAgain = this._playAgain.bind(this);

    this.examples = [];
    this.items = [];
    this.state = {};
    this.getInitialState();
    window.scrollTo(0, 0);
  }

  itemByCharacter(exampleProps) {
    const items = [];
    exampleProps.forEach((object) => {
      let setence =
        object.example.split(/(?<=\.)/) ||
        object.example.split(/(?<=\?)/) ||
        object.example.split(/(?<=\!)/);
      items.push(setence[0]);
    });
    return items;
  }

  getAllExample(lesson) {
    let rawExample = [];
    lesson.forEach((section) => {
      rawExample = rawExample.concat(section.examples);
    });
    return rawExample;
  }

  async getInitialState() {
    let lesson;
    await window
      .LessonAPIsService_Query({
        fatherID: this.props.match.params.lessonid,
      })
      .then((result) => (lesson = result.json.result.items))
      .catch((error) => console.log(error));
    this.examples = this.getAllExample(lesson);
    this.items = this.itemByCharacter(this.examples);

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
      <>
        {this.state.score !== undefined ? (
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
        ) : null}
      </>
    );
  }
}

class WordsArray extends Component {
  constructor(props) {
    super(props);
  }

  wordChecking(inputValue) {
    if (inputValue === this.props.sentence) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }
      window.dispatchEvent(new Event("wordmatched"));
    }
  }

  render() {
    return (
      <>
        {" "}
        <div className="container-fluid">
          <section className="container-fluid main-area">
            <div className="rowKA">
              <div className="col-md-12">
                <div
                  className="question"
                  style={{ display: "flex", width: "50%" }}
                >
                  <div
                    class="speaking"
                    style={{ marginTop: "10px", display: "block" }}
                  >
                    <Speech
                      text={this.props.sentence}
                      pitch="1"
                      rate="1"
                      volume="1"
                      lang="en-GB"
                      voice="Google UK English Male"
                    />
                  </div>
                  <h1>{this.props.sentence}</h1>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="container-fluid main-area">
          <div className="rowKA">
            <div className="col-md-12">
              <div className="question">
                <Dictaphone />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Speaking;
