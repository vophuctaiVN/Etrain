import React from "react";
import { useSelector } from "react-redux";

const FinishLine = () => {
  const gameState = useSelector((state) => state.gameState);
  const { showKeyboard } = gameState;

  return (
    <div
      style={{
        bottom: `${showKeyboard ? "35%" : "20%"}`,
      }}
      className="overlapItem1"
    >
      <p>FINISH LINE</p>
    </div>
  );
};

export default FinishLine;
