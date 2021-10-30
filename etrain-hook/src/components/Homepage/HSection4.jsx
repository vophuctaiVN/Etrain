import React, { Component, useEffect, useState } from "react";
import { GramList } from "../Grammar/GramList";
import { getRndInteger } from "../../utils/helpers";

function HSection4() {
  const [suggest, setSuggest] = useState([]);

  useEffect(
    () =>
      getRandGramList({
        PageNo: getRndInteger(1, 3),
        PageSize: 3,
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

  return (
    <section className="special_cource padding_top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="section_tittle text-center">
              <p>popular courses</p>
              <h2>Grammar Courses</h2>
            </div>
          </div>
        </div>
        <GramList gramList={suggest} />
      </div>
    </section>
  );
}

export default HSection4;
