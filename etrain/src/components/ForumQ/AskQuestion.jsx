import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import { getCookiesValue, USER_IMAGE_DOMAIN } from "../../utils/helpers";

export const AskQuestion = (props) => {
  const close = () => props.onHide();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      Question: document.getElementById("question").value,
      Topic: document.getElementById("topic").value,
      Detail: document.getElementById("detail").value,
      IDaccount: getCookiesValue("userID"),
    };
    console.log(formData);
    window
      .Question_Create_APIsService_Update(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
            //notify(result.json.error.message, result.json.error.detail, "error");
            break;
          case 200:
            //notify(result.json.error.message, 'Create new Account successfull', "success");
            window.location.reload();
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="AskquestionModal">
      <Modal isOpen={props.isOpen}>
        <ModalHeader toggle={close}>
          <h4 className="mb-0">Add question</h4>
        </ModalHeader>
        <ModalBody>
          {/* Address */}
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
                    //placeholder="What is....?"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row style = {{marginTop : 10}}>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-address">
                    Topic
                  </label>
                  <Input type="select" id="topic">
                    <option>Grammar</option>
                    <option>Vocabulary</option>
                    <option>Method</option>
                    <option>Test</option>
                    <option>Usage</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <hr className="my-4" />
          {/* Description */}
          <h6 className="heading-small text-muted mb-4">Provide further information</h6>
          <div className="pl-lg-4">
            <FormGroup>
              <label className="form-control-label">Detail</label>
              <Input
                className="form-control-alternative"
                id="detail"
                placeholder="A few words about your problem ..."
                rows="4"
                type="textarea"
              />
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
    </div>
  );
};

/* export class AskQuestion extends Component {
  render() {
    return (
      <section className="special_cource padding_top">
          <h4 className="title">Your Answer</h4>
        <div className="content">
          <div className="feedeback">
            <input
              name="feedback"
              className="form-control"
              cols={10}
              rows={10}
              defaultValue={""}
            />
          </div>
        </div>
        
        <h4 className="title">Your Answer</h4>
        <div className="content">
          <div className="feedeback">
            <textarea
              name="feedback"
              className="form-control"
              cols={10}
              rows={10}
              defaultValue={""}
            />
            <div className="mt-10 text-right">
              <a href="# " className="btn_1">
                Post
              </a>
            </div>
          </div>{" "}
        </div>
      </section>
    );
  }
} */

export default AskQuestion;
