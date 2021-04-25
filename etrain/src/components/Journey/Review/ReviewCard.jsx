import React, { Component } from "react";
import { Link } from "react-router-dom";

class ReviewCard extends Component {
  reviewDone(IDrow) {
    const formData = {
      IDrow: IDrow,
      typeDone: "review",
    };
    window
      .StudyOrReviewDoneAPI(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
          case 200:
            this.props.realoadReview();
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    var dateNow = new Date();
    var date = Date.parse(this.props.firstDate.toString());
    const daysAgo = Math.ceil(Math.abs(dateNow - date) / (1000 * 60 * 60 * 24)); //Math floor khi đủ 24 giờ mới tính, nhưng theo mysql qua qua ngày là tính 1 (qua 12h)

    const dateObj = new Date(this.props.firstDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const newdate = year + "/" + month + "/" + day;
    const time = hour + ":" + minutes;

    return (
      <div
        className="bt_bb_column col-xl-4 bt_bb_align_left bt_bb_vertical_align_top bt_bb_animation_fade_in animate bt_bb_padding_normal bt_bb_shape_inherit animated"
        data-width={4}
        data-bt-override-class="{}"
      >
        <div className="bt_bb_column_content">
          <div className="bt_bb_column_content_inner">
            <div className="bt_bb_schedule bt_bb_shape_soft-rounded btHasBgImage bt_bb_color_scheme_12">
              <div
                className="bt_bb_schedule_title_flex"
                style={{
                  backgroundImage:
                    'url("http://tabula.bold-themes.com/wavy/wp-content/uploads/sites/3/2019/04/English.jpg")',
                }}
              >
                <div className="bt_bb_schedule_supertitle">
                  LEVEL {this.props.level}
                </div>
                <div className="bt_bb_schedule_title">
                  The {daysAgo} Days Ago Lesson
                </div>
              </div>
              <div className="bt_bb_schedule_content">
                <div
                  className="bt_bb_schedule_inner_row"
                  className="bt_bb_schedule_inner_row"
                  style={{
                    backgroundColor: "grey",
                    color: "wheat",
                  }}
                  data-day="MON"
                >
                  <div className="bt_bb_schedule_day">
                    <span className="bt_bb_schedule_week_day">
                      release date
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">
                      {newdate} at {time}
                    </span>
                  </div>
                </div>
                <div
                  className="bt_bb_schedule_inner_row"
                  style={{
                    backgroundColor: "darkslategrey",
                    color: "wheat",
                  }}
                  data-day="WED"
                >
                  <div className="bt_bb_schedule_day">
                    <span className="bt_bb_schedule_week_day">Study Times</span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">
                      {this.props.times}
                    </span>
                  </div>
                </div>
                <div className="bt_bb_schedule_inner_row" data-day="THU">
                  <div className="bt_bb_schedule_day">
                    <span className="bt_bb_schedule_week_day">
                      <Link to={`/quizs-${1}`} className="btn_1">
                        Exercise
                      </Link>
                    </span>
                    <span className="bt_bb_schedule_inner_location">
                      French st, 123
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">
                      <button
                        className="btn_2"
                        style={{ float: "right" }}
                        onClick={() => this.reviewDone(this.props.id)}
                      >
                        Done
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewCard;
