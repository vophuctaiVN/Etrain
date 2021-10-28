import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRndInteger } from "../../utils/helpers";

function MoreLesson() {
  const [suggest, setSuggest] = useState([]);

  useEffect(
    () =>
      getRandGramList({
        PageNo: getRndInteger(1, 3),
        PageSize: 4,
      }),
    []
  );

  const getRandGramList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .GrammarAPIsService_Query(queryObj)
      .then((result) => setSuggest(result.json.result.items))
      .catch((error) => console.log(error));
  };

  let suggested = suggest.map((suggest, index) => (
    <li key={index}>
      <div className="justify-content-between d-flex">
        <p>{suggest.title}</p>
        <span>
          <Link className="btn_2 text-uppercase" to={`/grammar-${suggest.id}`}>
            View Details
          </Link>
        </span>
      </div>
    </li>
  ));
  return (
    <div className="sidebar_top">
      <ul>{suggested}</ul>
      <Link to={`/grammar`} className="btn_1 d-block">
        View all grammar Posts
      </Link>
    </div>
  );
}

export default MoreLesson;
