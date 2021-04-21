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
  return (
    <>
      <div
        className="overlapItem2"
        style={{
          marginLeft: position + "%",
        }}
      >
        <p className="opponent_name">{playerName}</p>
        <img className="character" src={charImgSrc} alt={charImgAlt} />
      </div>
    </>
  );
};

export default Player;
