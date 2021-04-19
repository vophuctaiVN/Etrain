import React from "react";

import { useSelector } from "react-redux";
import RandomWord from "./randomWord";
import Player from "./player";
import FinishLine from "./finishLine";

const MainGame = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo);

  const {
    currentPlayerPosition,
    currentPlayerCharacter,
    currentPlayerName,
  } = currentPlayerInfo;
  const {
    opponentPlayerCharacter,
    opponentPlayerPosition,
    opponentPlayerName,
  } = opponentPlayerInfo;

  return (
    <>
      <RandomWord />
      <div className="container-game">
        <Player
          className="overlapItem1"
          playerName={opponentPlayerName}
          position={opponentPlayerPosition}
          charImgSrc={`img/tortoise_images/${opponentPlayerCharacter}.png`}
          charImgAlt={opponentPlayerCharacter}
        />
        <Player
          isCurrentPlayer={true}
          playerName={currentPlayerName}
          position={currentPlayerPosition}
          charImgSrc={`img/tortoise_images/${currentPlayerCharacter}.png`}
          charImgAlt={currentPlayerCharacter}
        />
        <FinishLine />
        <img
          className="overlapItem3"
          src="img/tortoise_images/grass-background.png"
          alt="grass-background"
        />
      </div>
    </>
  );
};

export default MainGame;
