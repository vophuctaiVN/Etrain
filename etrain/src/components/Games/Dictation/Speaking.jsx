import React, { Component } from "react";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";
import $ from "jquery";
import Speech from "react-speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  toArpabet,
  toIPA,
  toAmericanPhoneticAlphabet,
} from "arpabet-and-ipa-convertor-ts";
import { ThreeSixtyTwoTone } from "@material-ui/icons";
import zIndex from "@material-ui/core/styles/zIndex";

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
    <div>
      <div className="recordItem">
        <h4>Microphone: {listening ? "on" : "off"}</h4>
        <div className="wrapButtonListCenter">
          <button
            className="microIcon"
            onClick={SpeechRecognition.startListening}
          ></button>
          <button className="resetIcon" onClick={resetTranscript}>
            Reset
          </button>
        </div>
      </div>
      {transcript ? (
        <section className="container-fluid main-area">
          <div className="rowKA">
            <div className="col-md-12">
              <div className="question">
                <h1>{transcript}</h1>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
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
      currentQuestionIndex: 1,
      questionLimit: this.items.length,
      message: "Good Job",
      hideReplay: true,
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
      });
    } else {
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
      currentQuestionIndex: 1,
      questionLimit: this.items.length,
      message: "Good Job",
      hideReplay: true,
      isOpen: false,
    });
  }

  render() {
    let DetailClose = () => this.setState({ hideReplay: false, isOpen: false });
    const nowSentence = this.items[this.state.currentQuestionIndex - 1];

    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row justify-content-center words-container gamebackground">
              <ResultModal isOpen={this.state.isOpen} onHide={DetailClose} />
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

  wordToIPA(word) {
    word = word.replace(/[^a-zA-Z ]/g, "");
    word = word.toLowerCase();
    var cmu = require("cmu-pronouncing-dictionary");
    const arpabet = cmu[word];
    return toIPA(arpabet);
  }

  stringToAPI(sentence) {
    if (sentence !== undefined) {
      var arr = sentence.split(" ");
      var ipaString = new String();
      arr.forEach((item) => {
        const x = this.wordToIPA(item);
        if (x !== null) ipaString = ipaString.concat(" ", x);
      });
      ipaString = ipaString.replace(" ", "");
      return ipaString;
    }
  }

  compareIPA(ipa1, ipa2) {
    let arr1 = ipa1.split(" ");
    let arr2 = ipa2.split(" ");
    let wrongArr = [];
    arr1.forEach((item, index) => {
      if (item !== arr2[index]) {
        wrongArr.push(item);
      }
    });

    const percentage = ((arr1.length - wrongArr.length) * 100) / arr1.length;
    console.log({ percentage, wrongArr });
  }

  render() {
    const ipa = this.stringToAPI(this.props.sentence);
    if (ipa !== undefined) this.compareIPA(ipa, this.stringToAPI("i a teach"));
    return (
      <>
        <div className="container-fluid">
          <section className="container-fluid main-area">
            <div className="rowKA">
              <div className="col-md-12">
                <div style={{ display: "flex" }}>
                  <div class="speaking">
                    <Speech
                      text={this.props.sentence}
                      pitch="1"
                      rate="1"
                      volume="1"
                      lang="en-GB"
                      voice="Google UK English Male"
                    />
                  </div>
                  <h1 style={{ marginTop: "revert" }}>
                    {this.props.sentence} {ipa}
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Dictaphone />
      </>
    );
  }
}

export default Speaking;
