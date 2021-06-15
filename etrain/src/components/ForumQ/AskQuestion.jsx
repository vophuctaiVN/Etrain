import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import { getCookiesValue, showAlert } from "../../utils/helpers";
import { MyStatefulEditor } from "./TextEditor";

export const AskQuestion = (props) => {
  const [inputAnswer, setinputAnswer] = useState("");
  let setAnswerValue = (value) => setinputAnswer(value);

  const close = () => props.onHide();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      Question: document.getElementById("question").value,
      Topic: document.getElementById("topic").value,
      Detail: inputAnswer || "No detail",
      IDaccount: getCookiesValue("userID"),
    };

    window
      .Question_Create_APIsService_Update(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
            break;
          case 200:
            showAlert(result.json.error.message, "You added new question!");
            window.location.reload();
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader toggle={close}>
        <h4 className="mb-0">Add question</h4>
      </ModalHeader>
      <ModalBody>
        <h6 className="heading-small text-muted mb-4">What is your issue ?</h6>
        <div className="pl-lg-4">
          <Row>
            <Col md="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-address">
                  Question
                </label>
                <Input
                  className="form-control-alternative"
                  id="question"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Col md="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-address">
                  Topic
                </label>
                <Input type="select" id="topic">
                  <option style={{ backgroundColor: "white" }}>Grammar</option>
                  <option style={{ backgroundColor: "white" }}>
                    Vocabulary
                  </option>
                  <option style={{ backgroundColor: "white" }}>Method</option>
                  <option style={{ backgroundColor: "white" }}>Test</option>
                  <option style={{ backgroundColor: "white" }}>Usage</option>
                  <option style={{ backgroundColor: "white" }}>Another</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <hr className="my-4" />
        <h6 className="heading-small text-muted mb-4">
          Provide further information
        </h6>
        <div className="pl-lg-4">
          <FormGroup>
            <label className="form-control-label">Detail</label>
            <MyStatefulEditor exportValue={setAnswerValue.bind(this)} />
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="mt-10 text-right">
          <a href="javascript:void(0)" className="btn_1" onClick={handleSubmit}>
            Post
          </a>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AskQuestion;
