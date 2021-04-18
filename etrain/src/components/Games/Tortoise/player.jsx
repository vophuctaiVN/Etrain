/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Player = ({
  position,
  charImgSrc,
  charImgAlt,
  playerName,
  isCurrentPlayer,
}) => {
  const gameState = useSelector((state) => state.gameState);
  const { showKeyboard } = gameState;
  console.log("POSITION", position);
  return (
    <>
      <div
        className="overlapItem2"
        style={{
          marginLeft: position + "%",
          // top: `${showKeyboard ? "26vh" : "48vh"}`,
          //bottom: `${showKeyboard ? "33%" : "10%"}`,
        }}
      >
        <p className="">{playerName}</p>
        <img className="character" src={charImgSrc} alt={charImgAlt} />
      </div>
    </>
  );
};

export default Player;
