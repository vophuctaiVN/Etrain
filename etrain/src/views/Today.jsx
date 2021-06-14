import React, { Component } from "react";
import { ListTodayLession } from "../components/Journey/TodayLession/ListTodayLession";
import { ListReview } from "../components/Journey/Review/ListReview";
class Today extends Component {
  state = { reload: false };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  trickReloadPage() {
    this.setState({
      reload: !this.state.reload,
    });
  }

  render() {
    console.log(this.state.reload);
    return (
      <>
        <ListTodayLession trickReloadPage={this.trickReloadPage.bind(this)} />
        <div className="container">
          <ListReview key={this.state.reload} />
        </div>
      </>
    );
  }
}

export default Today;
