import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { getCookiesValue, showAlert } from "../../../utils/helpers";

const ResultModal = (props) => {
  const close = () => props.onHide();
  const saveScore = () => {
    const queryObj = {
      userid: getCookiesValue("userID"),
    };
    window
      .UserInfo_Query(queryObj)
      .then((result) => {
        const nowScore = parseInt(result.json.result.items[0].score);
        let tikets = parseInt(result.json.result.items[0].postLeft);
        if (
          Math.floor((nowScore + props.score) / 100) !==
          Math.floor(nowScore / 100)
        )
          tikets += 10;
        window.ScoreInfo_UpdateAPI({
          IDaccount: getCookiesValue("userID"),
          Score: nowScore + props.score,
          PostLeft: tikets,
          Level: result.json.result.items[0].level,
        });
        showAlert(result.json.error.message, "Save score successfull");
      })
      .catch((error) => console.log(error));

    close();
  };
  return (
    <div>
      <Modal isOpen={props.isOpen}>
        <ModalHeader toggle={close}></ModalHeader>
        <ModalBody>
          <h2>Your score is {props.score}</h2>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveScore}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ResultModal;
