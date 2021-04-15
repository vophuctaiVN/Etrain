import React from "react";
import ScoreMain from "./score";
import KeyBoardAndResult from "./keyboard-result";
import Footer from "./footer";
import ResultModal from "./modal";
import $ from "jquery";
class MatchingWord extends React.Component {
  constructor() {
    super();

    this.words = [
      {
        answer: "MONKEY",
        question: "MONK_Y",
      },
      {
        answer: "BANANA",
        question: "BANA_A",
      },
      {
        answer: "APPLE",
        question: "APP_E",
      },
      {
        answer: "ORANGE",
        question: "ORA_GE",
      },
      {
        answer: "LION",
        question: "L_ON",
      },
      {
        answer: "BOOK",
        question: "BO_K",
      },
      {
        answer: "COCONUT",
        question: "COCON_T",
      },
      {
        answer: "DOCTOR",
        question: "DO_TOR",
      },
      {
        answer: "FRIEND",
        question: "FRI_ND",
      },
      {
        answer: "BROTHER",
        question: "BR_THER",
      },
      {
        answer: "DOG",
        question: "D_G",
      },
      {
        answer: "FOOD",
        question: "FO_D",
      },
      {
        answer: "WATER",
        question: "WAT_R",
      },
      {
        answer: "HOUSE",
        question: "HOUS_",
      },
      {
        answer: "ELEPHANT",
        question: "ELEPH_NT",
      },
      {
        answer: "MANGO",
        question: "MA_GO",
      },
      {
        answer: "SCHOOL",
        question: "SCHO_L",
      },
      {
        answer: "PEOPLE",
        question: "PE_PLE",
      },
      {
        answer: "PENCIL",
        question: "P_NCIL",
      },
    ];

    this.questions = [];

    this.randomIndex = this.randomIndex.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this._showMessage = this._showMessage.bind(this);
    this._changeWord = this._changeWord.bind(this);
    this.durationEnd = this.durationEnd.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this._playAgain = this._playAgain.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    var randomNumber = this.randomIndex();
    var word = this.words[randomNumber];
    var question = null;
    if (word.question !== undefined) {
      question = word.question;
    }
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

    window.addEventListener("wordNOTmatched", function (event) {
      const myanswer = event.detail;
      self.setState({
        score: self.state.score,
        currentQuestion: self.state.currentAnswer,
        myanswer: myanswer,
      });
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }

      self._showMessage("NOTsuccess");
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
      currentQuestion: question,
      currentAnswer: word.answer,
      wordIndex: randomNumber,
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
    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
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
              <KeyBoardAndResult
                answer={this.state.currentAnswer}
                setAnswer={this.updateAnswer}
                word={this.state.currentQuestion}
                myanswer={this.state.myanswer}
              />
              <Footer
                hideReplay={this.state.hideReplay}
                onRefresh={this._playAgain}
                message={this.state.message}
                skipquestion={this._changeWord}
              />
            </div>{" "}
          </div>
        </div>
      </section>
    );
  }
}

export default MatchingWord;
