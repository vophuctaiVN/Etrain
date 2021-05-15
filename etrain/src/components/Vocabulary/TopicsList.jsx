import React, { Component } from "react";
import TopicCard from "./TopicCard";

class VocabList extends Component {
  truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };
  render() {
    this.props.VocabList.forEach((topicInfo) => {
      topicInfo.description = this.truncate(topicInfo.description);
    });
    let listopics = this.props.VocabList.map((topicInfo) => (
      <TopicCard
        id={topicInfo.id}
        imgUrl={topicInfo.imageURL}
        level={topicInfo.level}
        title={topicInfo.title}
        note={topicInfo.description}
        key={Math.random()}
      />
    ));
    return <div>{listopics}</div>;
  }
}

export default VocabList;
