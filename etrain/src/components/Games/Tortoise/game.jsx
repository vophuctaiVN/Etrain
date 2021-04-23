import React from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startOpponentRun,
  endOpponentRun,
  endTypingCountdown,
  setFirstwordArray,
} from "../../../redux/actions/gameStateActions";
import GameOver from "./gameOver";
import MainGame from "./MainGame";

export default function Home(props) {
  const dispatch = useDispatch();

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo);
  const gameState = useSelector((state) => state.gameState);

  const { currentPlayerPosition, wordArray } = currentPlayerInfo;
  const { opponentPlayerPosition } = opponentPlayerInfo;
  const { gameStart, gameType } = gameState;

  const race_end_point = 90;

  const [isOpen, setisOpen] = useState(false);
  let DetailClose = () => setisOpen(false);

  useEffect(() => {
    if (
      opponentPlayerPosition >= race_end_point ||
      currentPlayerPosition >= race_end_point
    ) {
      dispatch(endOpponentRun());
      dispatch(endTypingCountdown());
      setisOpen(true);
    }
  });

  useEffect(() => {
    const gameTypeClone = "singlePlayer";
    const gameStartClone = true;
    if (gameStartClone && gameTypeClone === "singlePlayer")
      //if to not loop due to dispatch
      dispatch(startOpponentRun());
  }, [dispatch, gameStart, gameType]); // add array values if value in state after update and those values are not different -> they don't recall this useEffect

  useEffect(() => {
    let words = [];
    let listwords =
      JSON.parse(localStorage.getItem("tempitems")) ||
      props.location.query.items;
    listwords.forEach((element) => {
      words.push(element.en.toLowerCase());
    });

    if (props.location.query && props.location.query.items) {
      localStorage.setItem(
        "tempitems",
        JSON.stringify(props.location.query.items)
      );
    }
    if (wordArray.length == 0) {
      dispatch(setFirstwordArray(words));
    }
  }, [dispatch, wordArray]);

  useLayoutEffect(() => {
    return () => {
      localStorage.removeItem("tempitems");
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <div
        className="fixed bottom-0 mt-4 w-full h-full py-3 px-4 bg-gradient-to-b	from-blue-500 via-blue-300 to-blue-200 "
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="relative ">
          {/*  {opponentPlayerPosition >= race_end_point ||
          currentPlayerPosition >= race_end_point ? (
            <GameOver
              race_end_point={race_end_point}
              isOpen={isOpen}
              onHide={DetailClose}
            />
          ) : (
            <MainGame />
          )} */}
          <GameOver
            race_end_point={race_end_point}
            isOpen={isOpen}
            onHide={DetailClose}
          />
          <MainGame />
        </div>
      </div>
    </div>
  );
}
