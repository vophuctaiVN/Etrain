import React, { Component } from "react";
import ReviewCard from "./ReviewCard";

export class ListReview extends Component {
  render() {
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
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </>
    );
  }
}

export default ListReview;
