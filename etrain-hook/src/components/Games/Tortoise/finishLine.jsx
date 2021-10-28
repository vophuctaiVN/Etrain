import React from "react";
import { useSelector } from "react-redux";

const FinishLine = () => {
  const gameState = useSelector((state) => state.gameState);
  const { showKeyboard } = gameState;

  return (
    <div
      style={{
        bottom: "10%",
      }}
      className="overlapItem1"
    >
      <img src="img/tortoise_images/flag-icon.png" />
    </div>
  );
};

export default FinishLine;
