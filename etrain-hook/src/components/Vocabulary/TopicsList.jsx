import React from "react";
import TopicCard from "./TopicCard";

function VocabList(props) {
  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  props.VocabList.forEach((topicInfo) => {
    topicInfo.description = truncate(topicInfo.description);
  });
  let listopics = props.VocabList.map((topicInfo) => (
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

export default VocabList;
