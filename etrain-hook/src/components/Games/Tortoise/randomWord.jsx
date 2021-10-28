import React, { useEffect, useState } from "react";
import useKeypress from "./useKeypress";
import { useDispatch, useSelector } from "react-redux";
import {
  addAPointToCurrentPlayer,
  generateNewWordOnSuccess,
} from "../../../redux/actions/currentPlayerActions";
import {
  startTypingCountdown,
  incrementCharactersTyped,
} from "../../../redux/actions/gameStateActions";

const RandomWord = () => {
  const dispatch = useDispatch();
  const [correctKeyPressed, setCorrectKeyPressed] = useState(() => true);

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const {
    randomlyGeneratedWord: theRandomWord,
    wordIndex,
    wordArray,
  } = currentPlayerInfo;

  const [randomlyGeneratedWord, setRandomlyGeneratedWord] = useState(
    () => theRandomWord,
    [theRandomWord]
  );
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
      dispatch(addAPointToCurrentPlayer(Math.ceil(90 / wordArray.length)));
      dispatch(generateNewWordOnSuccess(wordIndex + 1));
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
            <p className="inline-block text-center  font-curve">
              {randomlyGeneratedWord}
            </p>
          ) : (
            <div>
              <p className="inline-block text-center  font-curve">
                {randomlyGeneratedWord.charAt(0)}
              </p>
              <p className="inline-block text-center  font-curve">
                {randomlyGeneratedWord.substr(1)}
              </p>
            </div>
          )}
          <p className="text-center">{randomlyGeneratedWord.length}</p>
        </div>
      </div>
    </>
  );
};

export default RandomWord;
