import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import { getCookiesValue } from "../../../utils/helpers";
import { Link } from "react-router-dom";

export class ListReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayLesson: [],
    };
  }

  componentWillMount() {
    this.getReviewList({
      IDaccount: getCookiesValue("userID"),
    });
  }

  getReviewList = (object) => {
    window
      .ReviewLesson_Query(object)
      .then((result) => {
        const items = result.json.result.items;
        this.setState({
          todayLesson: items,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const lesson = this.state.todayLesson;
    let listInformation = lesson.map((info) => (
      <div className="row">
        <ReviewCard
          id={info.id}
          level={info.level}
          firstDate={info.firstDate}
          times={info.times}
          key={Math.random()}
        />
        {info.arrayLesson.map((less) => (
          <div className="col-sm-6 col-lg-4" style={{ marginBottom: "30px" }}>
            <div className="single_special_cource">
              <img src={less.content.imageURL} className="special_img" alt="" />
              <div className="special_cource_text">
                <a href="course-details.html" className="btn_4">
                  {less.content.level}
                </a>
                {less.type == "g" ? (
                  <Link
                    to={{
                      pathname: `/grammar-${less.content.id}`,
                      query: {
                        topic_Image: less.content.imageURL,
                      },
                    }}
                  >
                    <h3>{less.content.title}</h3>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `/vocabulary-${less.content.id}`,
                      query: {
                        topic_Image: less.content.imageURL,
                      },
                    }}
                  >
                    <h3>{less.content.title}</h3>
                  </Link>
                )}

                <p>{less.content.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="section_tittle text-center">
              <p>repeat technique</p>
              <h2>Review Lessons</h2>
            </div>
          </div>
        </div>
        <div className="bt_bb_row_wrapper">
          <div
            className="bt_bb_row bt_bb_column_gap_30 bt_bb_shape_inherit"
            data-structure="4-4-4"
          >
            {listInformation}
          </div>
        </div>
      </>
    );
  }
}

export default ListReview;
