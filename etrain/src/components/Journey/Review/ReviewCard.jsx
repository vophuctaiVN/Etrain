import React, { Component } from "react";

class ReviewCard extends Component {
  render() {
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
                <div className="bt_bb_schedule_supertitle">ADVANCED C1,C2</div>
                <div className="bt_bb_schedule_title">
                  The Previous Week Lesson
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
                    <span className="bt_bb_schedule_inner_location">
                      French st, 123
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">01-03-2020</span>
                    <span className="bt_bb_schedule_inner_desc">
                      Anna Shelton
                    </span>
                  </div>
                </div>
                <div
                  className="bt_bb_schedule_inner_row"
                  style={{
                    backgroundColor: "grey",
                    color: "wheat",
                  }}
                  data-day="TUE"
                >
                  <div className="bt_bb_schedule_day">
                    <span className="bt_bb_schedule_week_day">
                      First Review
                    </span>
                    <span className="bt_bb_schedule_inner_location">
                      French st, 123
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">07-03-2020</span>
                    <span className="bt_bb_schedule_inner_desc">
                      Rebeca Hall
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
                    <span className="bt_bb_schedule_week_day">
                      Second Review
                    </span>
                    <span className="bt_bb_schedule_inner_location">
                      French st, 123
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">01-04-2020</span>
                    <span className="bt_bb_schedule_inner_desc">
                      Rebeca Hall
                    </span>
                  </div>
                </div>
                <div className="bt_bb_schedule_inner_row" data-day="THU">
                  <div className="bt_bb_schedule_day">
                    <span className="bt_bb_schedule_week_day">
                      Third Review
                    </span>
                    <span className="bt_bb_schedule_inner_location">
                      French st, 123
                    </span>
                  </div>
                  <div className="bt_bb_schedule_time">
                    <span className="bt_bb_schedule_hours">01-07-2020</span>
                    <span className="bt_bb_schedule_inner_desc">Mark Drew</span>
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
