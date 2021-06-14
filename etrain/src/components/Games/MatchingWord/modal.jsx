import React from "react";
import { Modal, Button } from "reactstrap";
import { getCookiesValue, showAlert } from "../../../utils/helpers";
import { ImCross } from "react-icons/im";

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
    <>
      <Modal isOpen={props.isOpen}>
        <div className="card">
          <div className="text-right cross">
            {" "}
            <ImCross
              style={{
                float: "right",
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={close}
              color={"darkred"}
            />
          </div>
          <div className="card-body text-center">
            <img src="img/icon/trophy.png" />
            <h4>CONGRATULATIONS!</h4>
            <p style={{ marginBottom: "30px" }}>Your score is {props.score}</p>
            <Button
              color="secondary"
              onClick={close}
              style={{ marginRight: "20px" }}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={saveScore}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ResultModal;
