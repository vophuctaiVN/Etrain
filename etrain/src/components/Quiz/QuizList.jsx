import React, { Component } from "react";
import QuizTopic from "./QuizTopic";

export class QuizList extends Component {
  truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  render() {
    this.props.gramList.forEach((topicInfo) => {
      topicInfo.description = this.truncate(topicInfo.description);
    });
    let listopics = this.props.gramList.map((topicInfo) => (
      <QuizTopic
        id={topicInfo.id}
        title={topicInfo.title}
        note={topicInfo.description}
        key={Math.random()}
      />
    ));
    return <>{listopics}</>;
  }
}

export default QuizList;
