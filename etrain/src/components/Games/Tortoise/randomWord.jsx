import React, { useEffect, useState } from "react";
import useKeypress from "./useKeypress";
import { useDispatch, useSelector } from "react-redux";
import {
  addAPointToCurrentPlayer,
  generateNewWordOnSuccess,
} from "../../../redux/actions/currentPlayerActions";

import { addAPointToOpponentPlayerMultiplayer } from "../../../redux/actions/opponentPlayerActions";

import Button from "./button";

import {
  incrementTotalWordsTyped,
  incrementFluentWordsTyped,
  addWeakKeyStroke,
  startTypingCountdown,
  incrementCharactersTyped,
  toggleVirtualKeyboard,
} from "../../../redux/actions/gameStateActions";

const RandomWord = () => {
  const dispatch = useDispatch();
  const [correctKeyPressed, setCorrectKeyPressed] = useState(() => true);

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const { randomlyGeneratedWord: theRandomWord } = currentPlayerInfo;

  const gameState = useSelector((state) => state.gameState);

  const [randomlyGeneratedWord, setRandomlyGeneratedWord] = useState(
    () => theRandomWord,
    [theRandomWord]
  );
  const [fluentWord, setFluentWord] = useState(true);
  const [commenceCountDown, setCommenceCountDown] = useState(() => false);

  useEffect(() => {
    if (commenceCountDown) {
      dispatch(startTypingCountdown());
    }
  }, [commenceCountDown]);

  useEffect(() => {
    setRandomlyGeneratedWord(theRandomWord);
  }, [theRandomWord]);

  useEffect(() => {
    if (randomlyGeneratedWord.length === 0) {
      dispatch(addAPointToCurrentPlayer(5));
      dispatch(generateNewWordOnSuccess());
      dispatch(incrementTotalWordsTyped());

      if (fluentWord) {
        dispatch(incrementFluentWordsTyped());
      }

      if (!fluentWord) {
        setFluentWord(true);
      }
    }
  }, [randomlyGeneratedWord, dispatch]);

  const correctKeyPressedHandler = () => {
    let trimmedWord = randomlyGeneratedWord.replace(
      randomlyGeneratedWord.charAt(0),
      ""
    );
    dispatch(incrementCharactersTyped());
    setRandomlyGeneratedWord(trimmedWord);
    setCorrectKeyPressed(true);
    setCommenceCountDown(true);
  };

  useKeypress(randomlyGeneratedWord.charAt(0), () =>
    correctKeyPressedHandler()
  );

  return (
    <>
      <div className="flex justify-center">
        <div className="inline-block p-3 bg-green-400 bg-opacity-20 rounded-lg">
          {correctKeyPressed ? (
            <p className="inline-block text-center text-green-800 font-semibold text-3xl">
              {randomlyGeneratedWord}
            </p>
          ) : (
            <div>
              <p className="inline-block text-center text-red-600 font-semibold text-3xl">
                {randomlyGeneratedWord.charAt(0)}
              </p>
              <p className="inline-block text-center text-green-900 font-semibold text-3xl">
                {randomlyGeneratedWord.substr(1)}
              </p>
            </div>
          )}
          <p className="text-center text-green-900 font-semibold text-xl">
            {randomlyGeneratedWord.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default RandomWord;
