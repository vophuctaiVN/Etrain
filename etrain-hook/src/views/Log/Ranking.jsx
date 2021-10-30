import React, { useEffect, useState } from "react";

function Ranking() {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const queryObj = {
      top: 5,
    };
    window
      .Rank_Query(queryObj)
      .then((result) => setUserInfo(result.json.result.items))
      .catch((error) => console.log(error));
  }, []);

  const top5 = userInfo.map((info, key) => (
    <div className="bt_bb_schedule_inner_row" key={key}>
      <div className="bt_bb_schedule_day">
        <span className="bt_bb_schedule_week_day">
          {key + 1}. {info.name}
        </span>
      </div>
      <div className="bt_bb_schedule_time">
        <span className="bt_bb_schedule_hours">{info.score}</span>
      </div>
    </div>
  ));

  return (
    <div
      className="bt_bb_column_content"
      style={{ backgroundColor: "#0c2e60", marginTop: "20px" }}
    >
      <div className="bt_bb_column_content_inner">
        <div className="bt_bb_schedule bt_bb_shape_soft-rounded btHasBgImage bt_bb_color_scheme_12">
          <div className="bt_bb_schedule_title_flex">
            <div className="bt_bb_schedule_supertitle">RANKING BY SCORE</div>
            <div className="bt_bb_schedule_title">Best Students</div>
          </div>
          <div className="bt_bb_schedule_content">{top5}</div>
        </div>
        <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
      </div>
    </div>
  );
}

export default Ranking;
