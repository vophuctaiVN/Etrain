import React, { Component } from "react";
import { ListTodayLession } from "../components/Journey/TodayLession/ListTodayLession";
import { ListReview } from "../components/Journey/Review/ListReview";
class Today extends Component {
  render() {
    return (
      <>
        <ListTodayLession />
        <div className="container">
          <ListReview />
        </div>
      </>
    );
  }
}

export default Today;
