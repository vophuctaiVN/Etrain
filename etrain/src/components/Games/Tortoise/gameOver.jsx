import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./button";
import { resetFullGame } from "../../../redux/actions/gameStateActions";

const GameOver = ({ race_end_point }) => {
  const dispatch = useDispatch();

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo);

  const { currentPlayerPosition } = currentPlayerInfo;
  const { opponentPlayerPosition, opponentPlayerName } = opponentPlayerInfo;

  const resetFullGameHandler = () => {
    dispatch(resetFullGame());
  };

  return (
    <div className="mt-1">
      <p
        className={`text-5xl capitalize text-center ${
          currentPlayerPosition >= race_end_point
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {opponentPlayerPosition >= race_end_point ? "You lost!" : "You won!"}
      </p>

      <p
        className={`text-2xl capitalize text-center mt-5 ${
          currentPlayerPosition >= race_end_point
            ? "text-blue-700"
            : "text-pink-700"
        }`}
      >
        {opponentPlayerPosition >= race_end_point
          ? `${opponentPlayerName} won, yuck...!`
          : `YOU won, yeaaaah!`}
      </p>

      <p className="text-2xl text-yellow-500 capitalize text-center mt-5">
        game over...
      </p>

      <div className="mt-3 sm:w-2/12 mx-auto">
        <Button
          mainColor="bg-purple-700"
          hoverColor="bg-purple-500"
          text="Play Again?"
          textSize="text-3xl"
          paddingX="px-3"
          paddingY="py-2"
          function_callback={() => resetFullGameHandler()}
        />
      </div>
    </div>
  );
};

export default GameOver;
