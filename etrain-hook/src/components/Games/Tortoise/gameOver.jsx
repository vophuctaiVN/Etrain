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
      <div className="card">
        <div className="card-body text-center">
          <img
            src="img/icon/trophy.png"
            style={{
              opacity: opponentPlayerPosition >= race_end_point ? 0.3 : 1,
            }}
          />
          {opponentPlayerPosition >= race_end_point ? (
            <h4>YOU LOST!</h4>
          ) : (
            <h4>YOU WON!</h4>
          )}
          <button
            onClick={() => resetFullGameHandler()}
            className="btn btn-outline-success"
          >
            Play Again?
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOver;
