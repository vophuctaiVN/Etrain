import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizTopic from "../Quiz/QuizTopic";

function HSection2() {
  const [sectionInfo, setSectionInfo] = useState({
    gramList: [],
    totalitems: 0,
    pageNo: 1,
    pageSize: 3,

    //pagination
    lastpage: 1,
  });

  useEffect(
    () =>
      getGramList({
        PageNo: sectionInfo.pageNo,
        PageSize: sectionInfo.pageSize,
      }),
    []
  );

  const getGramList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .GrammarAPIsService_Query(queryObj)
      .then((result) =>
        setSectionInfo({
          gramList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
          //pagination
          lastpage: Math.ceil(result.json.result.totalRows / PageSize),
        })
      )
      .catch((error) => console.log(error));
  };

  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  sectionInfo.gramList.forEach((topicInfo) => {
    topicInfo.description = truncate(topicInfo.description);
  });

  let listopics = sectionInfo.gramList.map((topicInfo) => (
    <QuizTopic
      id={topicInfo.id}
      title={topicInfo.title}
      note={topicInfo.description}
      key={Math.random()}
    />
  ));

  return (
    <section className="feature_part">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xl-3 align-self-center">
            <div className="single_feature_text ">
              <h2>
                Awesome <br /> Quizs
              </h2>
              <p>
                Chose one topic you like and check how fluently you are in
                English skils. Login to save your result.
              </p>
              <Link to={`/quizs`} className="btn_1">
                Find More
              </Link>
            </div>
          </div>
          {listopics}
        </div>
      </div>
    </section>
  );
}

export default HSection2;
