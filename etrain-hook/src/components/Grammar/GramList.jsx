import React from "react";
import GramTopic from "./GramTopic";

export function GramList(props) {
  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  props.gramList.forEach((topicInfo) => {
    topicInfo.description = truncate(topicInfo.description);
  });
  let listopics = props.gramList.map((topicInfo) => (
    <GramTopic
      id={topicInfo.id}
      imgUrl={topicInfo.imageURL}
      level={topicInfo.level}
      title={topicInfo.title}
      note={topicInfo.description}
      key={Math.random()}
    />
  ));
  return <div className="row">{listopics}</div>;
}

export default GramList;
