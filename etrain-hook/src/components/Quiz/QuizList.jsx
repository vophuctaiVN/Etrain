import React from "react";
import QuizTopic from "./QuizTopic";

function QuizList(props) {
  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  props.gramList.forEach((topicInfo) => {
    topicInfo.description = truncate(topicInfo.description);
  });

  let listopics = props.gramList.map((topicInfo) => (
    <QuizTopic
      id={topicInfo.id}
      title={topicInfo.title}
      note={topicInfo.description}
      key={Math.random()}
    />
  ));

  return <>{listopics}</>;
}

export default QuizList;
