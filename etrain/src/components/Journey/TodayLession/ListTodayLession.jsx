import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { GiSecretBook, GiCardPick } from "react-icons/gi";
import { getCookiesValue } from "../../../utils/helpers";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export class ListTodayLession extends Component {
  constructor(props) {
    super(props);
    this.ToggleClick = this.ToggleClick.bind(this);
    this.studyDone = this.studyDone.bind(this);
    this.state = {
      showMoreGram: false,
      showMoreVocab: false,
      todayLesson: [],
      showMoreToggle: [],

      userInfo: {},
    };
  }

  ToggleClick(index) {
    let cloneToggles = this.state.showMoreToggle;
    cloneToggles[index] = !cloneToggles[index];
    this.setState({ showMoreToggle: cloneToggles });
  }

  componentWillMount() {
    this.getTodayContent({
      iDaccount: getCookiesValue("userID"),
    });
  }

  getTodayContent = (object) => {
    window
      .TodayLesson_Query(object)
      .then((result) => {
        const items = result.json.result.items;
        let arrayStatusForToggle = [];
        items[0].arrayLesson.forEach((item) =>
          arrayStatusForToggle.push(false)
        );
        //get user info after get lesson
        const queryObj = {
          userid: getCookiesValue("userID"),
        };
        window
          .UserInfo_Query(queryObj)
          .then((info) =>
            this.setState({
              todayLesson: items,
              showMoreToggle: arrayStatusForToggle,
              userInfo: info.json.result.items[0],
            })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  studyDone(IDrow) {
    const formData = {
      IDrow: IDrow,
      typeDone: "study",
    };
    window
      .StudyOrReviewDoneAPI(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
          case 200:
            this.getTodayContent({
              iDaccount: getCookiesValue("userID"),
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const lesson = this.state.todayLesson[0];
    let gramVocab;
    if (lesson)
      gramVocab = lesson.arrayLesson.map((les, index) => (
        <div key={index} className="bt_bb_accordion_item btWithIcon">
          <div className="bt_bb_accordion_item_title_content">
            <div className="bt_bb_accordion_item_title">
              {les.type == "g" ? (
                <>
                  {" "}
                  <GiSecretBook
                    size={40}
                    color="darkslategrey"
                    style={{ marginRight: "10px" }}
                  />
                  <Link to={`/grammar-${les.content.id}`}>
                    {les.content.title}
                  </Link>
                </>
              ) : (
                <>
                  <GiCardPick
                    size={40}
                    color="darkolivegreen"
                    style={{ marginRight: "10px" }}
                  />
                  <Link to={`/vocabulary-${les.content.id}`}>
                    {les.content.title}
                  </Link>
                </>
              )}
              <AiFillPlusCircle
                size={20}
                style={{ float: "right", margin: "10px" }}
                onClick={() => this.ToggleClick(index)}
              />
              <p className={this.state.showMoreToggle[index] ? "" : "hidden"}>
                {les.content.description}
              </p>
            </div>
          </div>
        </div>
      ));

    return (
      <>
        {lesson && this.state.userInfo.level !== "No Level" ? (
          <section className="blog_area section_padding">
            <div className="container">
              <div className="bt_bb_cell">
                <div className="bt_bb_cell_inner">
                  <div className="bt_bb_row_wrapper">
                    <div className="bt_bb_row" data-structure="6-6">
                      <div
                        className="bt_bb_column col-xl-6 bt_bb_align_left bt_bb_vertical_align_top bt_bb_animation_fade_in animate bt_bb_padding_text_indent animated"
                        data-width={6}
                        data-bt-override-class="{}"
                      >
                        <div className="bt_bb_column_content">
                          <div className="bt_bb_column_content_inner">
                            <header
                              className="bt_bb_headline bt_bb_color_scheme_5 bt_bb_dash_none bt_bb_size_large bt_bb_superheadline bt_bb_subheadline bt_bb_align_inherit"
                              data-bt-override-class="{}"
                            >
                              <h3 className="bt_bb_headline_tag">
                                <span className="bt_bb_headline_superheadline">
                                  LEVEL {lesson.level}
                                </span>
                                <span className="bt_bb_headline_content">
                                  <span>Lessons for Today</span>
                                </span>
                              </h3>
                              <div className="bt_bb_headline_subheadline">
                                In this level, you should spend at least 80
                                hours to be able to understand all basic
                                lessons.
                              </div>
                            </header>
                            <div className="bt_bb_separator bt_bb_bottom_spacing_50 bt_bb_border_style_none" />
                            <div
                              className="bt_bb_accordion bt_bb_color_scheme_3 bt_bb_style_simple bt_bb_shape_square"
                              data-closed="closed"
                            >
                              {gramVocab}
                            </div>
                            <div className="bt_bb_separator bt_bb_bottom_spacing_50 bt_bb_border_style_none" />

                            <Link
                              to={`/quizs-${this.state.todayLesson[0].exerciseID}`}
                              className="btn_1"
                            >
                              Exercise
                            </Link>
                            <button
                              className="btn_2"
                              style={{ float: "right" }}
                              onClick={() => this.studyDone(lesson.id)}
                            >
                              Done
                            </button>

                            <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="bt_bb_column col-xl-6 bt_bb_align_left bt_bb_vertical_align_top bt_bb_animation_fade_in animate bt_bb_padding_normal animated"
                        data-width={6}
                        data-bt-override-class="{}"
                      >
                        <div className="bt_bb_column_content">
                          <div className="bt_bb_column_content_inner">
                            <div className="bt_bb_image bt_bb_shape_square bt_bb_align_inherit bt_bb_hover_style_simple bt_bb_content_display_always bt_bb_content_align_middle bt_bb_content_exists">
                              <span>
                                <img
                                  src="http://tabula.bold-themes.com/wavy/wp-content/uploads/sites/3/2019/04/hero_books.png"
                                  data-image_src="http://tabula.bold-themes.com/sunny/wp-content/uploads/sites/2/2019/03/Psittaciformes_kids.png"
                                  title="Psittaciformes_kids"
                                  alt="http://tabula.bold-themes.com/sunny/wp-content/uploads/sites/2/2019/03/Psittaciformes_kids.png"
                                  className="btLazyLoadImage btLazyLoaded"
                                />
                              </span>
                            </div>
                            <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>

            {lesson.level !== this.state.userInfo.level ? (
              <UperLevel
                userProfile={this.state.userInfo}
                level={lesson.level}
              />
            ) : null}
          </section>
        ) : (
          <section className="ftco-menu mb-5 pb-5 blog_area section_padding">
            <div className="container">
              <div className="row justify-content-center my-5">
                <div className="col-md-7 heading-section text-center">
                  <span className="subheading">Sorry</span>
                  <h2 className="mb-4">Our Bad</h2>
                  <p>
                    Sorry that we don't have any lesson for you now. Take a test
                    to check your level!
                  </p>
                  <p>
                    <Link
                      to="/first-test"
                      className="btn btn-primary btn-outline-primary px-4 py-3"
                    >
                      Take a test
                    </Link>
                  </p>
                  <img src="img/icon/not_find.png" />
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

const UperLevel = (props) => {
  const [Isopen, setIsopen] = useState(true);
  const close = () => setIsopen(false);

  //  const close = () => props.onHide();
  useEffect(() => {
    console.log("change level");
    const userProfile = props.userProfile;
    const formData = {
      IDaccount: getCookiesValue("userID"),
      Score: userProfile.score,
      PostLeft: userProfile.postLeft,
      Level: props.level,
    };
    window
      .SaveLevelAPI(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
          case 200:
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  });
  return (
    <Modal isOpen={Isopen}>
      <ModalHeader toggle={close}></ModalHeader>
      <ModalBody style={{ display: "grid" }}>
        <h2 className="mb-4">
          Good Job {props.userProfile.name}! You are up to level {props.level}
        </h2>
      </ModalBody>
    </Modal>
  );
};

export default ListTodayLession;
