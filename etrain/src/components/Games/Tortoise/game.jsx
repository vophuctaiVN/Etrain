import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import Router from "next/router";
//import PageTitle from "../components/pageTitle.jsx";
import Modal from "./modal/modal";
import {
  startOpponentRun,
  endOpponentRun,
} from "../../../redux/actions/gameStateActions";
import {
  startGame,
  endTypingCountdown,
} from "../../../redux/actions/gameStateActions";
import GameOver from "./gameOver";
import MainGame from "./MainGame";

export default function Home() {
  const [showRules, setShowRules] = useState(true);
  const dispatch = useDispatch();

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo);
  const gameState = useSelector((state) => state.gameState);

  const { currentPlayerPosition, currentPlayerCharacter } = currentPlayerInfo;
  const { opponentPlayerPosition } = opponentPlayerInfo;
  let { gameStart, gameType } = gameState;

  const race_end_point = 87;

  useEffect(() => {
    if (
      opponentPlayerPosition >= race_end_point ||
      currentPlayerPosition >= race_end_point
    ) {
      dispatch(endOpponentRun());
      dispatch(endTypingCountdown());
    }
  });

  useEffect(() => {
    console.log("START", gameStart);
    gameType = "singlePlayer";
    gameStart = true;
    if (gameStart && gameType === "singlePlayer") dispatch(startOpponentRun());
  }, [dispatch, gameStart, gameType]);

  return (
    <div className="w-screen h-screen">
      {/* <PageTitle title="Tortoise and the hare game" /> */}
      <div
        className="fixed bottom-0 mt-4 w-full h-full py-3 px-4 bg-gradient-to-b	from-blue-500 via-blue-300 to-blue-200 "
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="relative ">
          {opponentPlayerPosition >= race_end_point ||
          currentPlayerPosition >= race_end_point ? (
            <GameOver race_end_point={race_end_point} />
          ) : (
            <MainGame />
          )}
          {/* 
          <Modal showRules={showRules} setShowRules={setShowRulesHandler} /> */}
        </div>
      </div>
    </div>
  );
}
