import React from "react";
import KeyBoard from "./keyboard";
class KeyBoardAndResult extends React.Component {
  constructor(props) {
    super(props);
    this.getInitialState = this.getInitialState.bind(this);
    this.totalSpace = this.totalSpace.bind(this);
    this.wordChecking = this.wordChecking.bind(this);

    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      word: this.props.word,
      new_word: this.props.word,
      total_space: this.totalSpace(this.props.word),
      total_replaced: 0,
      answer: this.props.answer,
    };
  }
  componentWillMount() {
    this.prepareComponentState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }
  prepareComponentState(props) {
    if (props.myanswer && props.myanswer != this.state.new_word)
      this.setState({
        word: props.word,
        new_word: props.myanswer,
        total_space: this.totalSpace(props.word),
        total_replaced: 0,
        answer: props.answer,
      });
    else
      this.setState({
        word: props.word,
        new_word: props.word,
        total_space: this.totalSpace(props.word),
        total_replaced: 0,
        answer: props.answer,
      });
  }

  totalSpace(name) {
    var newArray = name.split("").filter(function (val) {
      return val == "_";
    });
    return newArray.length;
  }

  wordChecking(character) {
    if (
      this.state.total_space > 0 &&
      this.state.total_replaced <= this.state.total_space
    ) {
      var replacedWord = this.state.new_word.replace(/\_/, character);

      this.setState({
        new_word: replacedWord,
        total_replaced: this.state.total_replaced + 1,
      });
      if (replacedWord == this.props.answer) {
        if (window.interval !== undefined) {
          clearInterval(window.interval);
        }
        window.dispatchEvent(new Event("wordmatched"));
      } else {
        if (window.interval !== undefined) {
          clearInterval(window.interval);
        }
        const selectedEvent = new CustomEvent("wordNOTmatched", {
          detail: replacedWord,
        });
        window.dispatchEvent(selectedEvent);
      }
    }
  }
  render() {
    return (
      <section className="container-fluid main-area">
        <div className="rowKA">
          <div className="col-md-12">
            <div className="keyboard" id="keyboard">
              <div className="answer">
                <h1>{this.state.new_word}</h1>
              </div>
              <KeyBoard onWordUpdate={this.wordChecking} />
            </div>
          </div>

          <div className="col-md-12">
            <div className="question">
              <h1 className="current-word">{this.props.word}</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default KeyBoardAndResult;
