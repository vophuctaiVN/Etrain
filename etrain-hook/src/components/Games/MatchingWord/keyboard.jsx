import React from "react";

function KeyBoard(props) {
  const updateWord = (character) => {
    props.onWordUpdate(character);
  };

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

  var keys = keyList.map(function (val, index) {
    return <Rbutton key={index} onUserInput={updateWord} character={val} />;
  });

  return <div>{keys}</div>;
}

function Rbutton(props) {
  const clickedButton = (event) => {
    props.onUserInput(event.target.getAttribute("data-character"));
  };

  return (
    <button
      data-character={props.character}
      onClick={clickedButton}
      className="btn btn-default btn-sm charaterbuttion"
    >
      {props.character}
    </button>
  );
}

export default KeyBoard;
