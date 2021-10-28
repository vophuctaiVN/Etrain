import React from "react";
class KeyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.updateWord = this.updateWord.bind(this);
    
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      word: this.props.word,
    };
  }

  updateWord(character) {
    this.props.onWordUpdate(character);
  }
  render() {
    var keyList = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
    var self = this;
    var keys = keyList.map(function (val, index) {
      return (
        <Rbutton key={index} onUserInput={self.updateWord} character={val} />
      );
    });
    return <div>{keys}</div>;
  }
}

class Rbutton extends React.Component {
  constructor(props) {
    super(props);
    this._clickedButton = this._clickedButton.bind(this);
  }
  _clickedButton(event) { 
    this.props.onUserInput(event.target.getAttribute("data-character"));
  }
  render() {
    return (
      <button
        data-character={this.props.character}
        onClick={this._clickedButton}
        className="btn btn-default btn-sm charaterbuttion"
      >
        {this.props.character}
      </button>
    );
  }
}

export default KeyBoard;
