import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFullGame } from "../../../redux/actions/gameStateActions";
import { Modal, ModalBody } from "reactstrap";

const GameOver = ({ race_end_point, isOpen, onHide }) => {
  const dispatch = useDispatch();

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo);
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo);

  const { currentPlayerPosition } = currentPlayerInfo;
  const { opponentPlayerPosition, opponentPlayerName } = opponentPlayerInfo;

  const resetFullGameHandler = () => {
    dispatch(resetFullGame());
    close();
  };

  const close = () => onHide();
  return (
    <Modal isOpen={isOpen}>
      <ModalBody style={{ display: "grid" }}>
        <p
          className={`text-center ${
            currentPlayerPosition >= race_end_point
              ? "font-curve-win"
              : "font-curve-lost"
          }`}
        >
          {opponentPlayerPosition >= race_end_point ? "You lost!" : "You won!"}
        </p>
        <button
          onClick={() => resetFullGameHandler()}
          className="btn btn-outline-success"
        >
          Play Again?
        </button>
      </ModalBody>
    </Modal>
  );
};

export default GameOver;
