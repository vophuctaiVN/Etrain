import React, { Component } from "react";
import { ListTodayLession } from "../components/Journey/TodayLession/ListTodayLession";
import { ListReview } from "../components/Journey/Review/ListReview";
class Today extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
