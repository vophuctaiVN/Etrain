import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { getCookiesValue, USER_IMAGE_DOMAIN } from "../../utils/helpers";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      file: "",
      imagePreviewUrl: "",
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.fileUpload = React.createRef();
    this.imageClick = this.imageClick.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  componentDidMount() {
    const queryObj = {
      userid: getCookiesValue("userID"),
    };
    window
      .UserInfo_Query(queryObj)
      .then((result) =>
        this.setState({
          userInfo: result.json.result.items[0],
        })
      )
      .catch((error) => console.log(error));
  }

  imageClick() {
    this.fileUpload.current.click();
  }

  handleSubmit(event) {
    event.preventDefault();
    var input = document.querySelector('input[type="file"]');
    const formData = {
      IDaccount: getCookiesValue("userID"),
      Name: document.getElementById("fullname").value,
      Email: document.getElementById("emailadress").value,
      Address: document.getElementById("address").value,
      Phone: document.getElementById("phone").value,
      About: document.getElementById("about").value,
      Image: input.files[0],
    };
    window
      .UserInfoAPIsService_Update(formData)
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

  render() {
    const userInfo = this.state.userInfo;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className="rounded-circle"
          src={imagePreviewUrl}
          onClick={this.imageClick}
        />
      );
    } else {
      $imagePreview = (
        <img
          alt="..."
          className="rounded-circle"
          src={`${USER_IMAGE_DOMAIN}/${userInfo.image}`}
          /* src={require("../../assets/img/theme/team-4-800x800.jpg")} */
          onClick={this.imageClick}
        />
      );
    }

    return (
      <section className="blog_area section_padding">
        <div className="container">
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="javascript:void(0)">
                          <input
                            type="file"
                            required
                            accept="image/png,image/jpeg"
                            onChange={this._handleImageChange}
                            style={{ display: "none" }}
                            ref={this.fileUpload}
                          />
                          {$imagePreview}
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading font-weight-light">
                              {userInfo.score}
                            </span>
                            <span className="description">Score</span>
                          </div>
                          <div>
                            <span className="heading">
                              <h3>{userInfo.score_Rank}</h3>
                            </span>
                            <span className="description">Ranking</span>
                          </div>
                          <div>
                            <span className="heading font-weight-light">
                              {userInfo.postLeft}
                            </span>
                            <span className="description">Post Left</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h3>{userInfo.name}</h3> <h3>{userInfo.level}</h3>
                      <hr className="my-4" />
                      <p>{userInfo.about}</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h4 className="mb-0">My account</h4>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="javascript:void(0)"
                          onClick={this.handleSubmit}
                          size="sm"
                          className="genric-btn success-border circle"
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form className="form-group-profile">
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup className="form-group-profile">
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Your Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={userInfo.name}
                                id="fullname"
                                placeholder="Your name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Email address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="emailadress"
                                defaultValue={userInfo.email}
                                placeholder="Type your email here"
                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup className="form-group-profile">
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Phone
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={userInfo.phone}
                                id="phone"
                                placeholder="Your phone number"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={userInfo.address}
                                id="address"
                                placeholder="Home Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">
                        About me
                      </h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label className="form-control-label">About Me</label>
                          <Input
                            className="form-control-alternative"
                            id="about"
                            placeholder="A few words about you ..."
                            rows="4"
                            defaultValue={userInfo.about}
                            type="textarea"
                          />
                        </FormGroup>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default Profile;
