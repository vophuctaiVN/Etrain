import React, { useState, useEffect } from "react";
import { getRndInteger } from "../../utils/helpers";
import { Link } from "react-router-dom";

function HSection6() {
  const [suggest, setSuggest] = useState([]);

  useEffect(
    () =>
      getVocabList({
        PageNo: getRndInteger(1, 6),
        PageSize: 3,
      }),
    []
  );

  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  const getVocabList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .VocabularyAPIsService_Query(queryObj)
      .then((result) =>
        setSuggest(
          result.json.result.items.map((topicInfo) => {
            return {
              ...topicInfo,
              description: truncate(topicInfo.description),
            };
          })
        )
      )
      .catch((error) => console.log(error));
  };

  let suggestUI =
    suggest.length > 0 &&
    suggest.map((vocab, index) => (
      <div className="col-sm-6 col-lg-4 col-xl-4" key={index}>
        <div className="single-home-blog">
          <div className="card">
            <img src={vocab.imageURL} className="card-img-top" alt="blog" />
            <div className="card-body">
              <a href="# " className="btn_4">
                {vocab.level}
              </a>

              <Link to={`/vocabulary-${vocab.id}`}>
                {" "}
                <h5 className="card-title">{vocab.title}</h5>{" "}
              </Link>
              <p>{vocab.description}</p>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <section className="blog_part section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="section_tittle text-center">
              <p>Our Posts</p>
              <h2>Vocabulary Topics</h2>
            </div>
          </div>
        </div>
        <div className="row">{suggestUI}</div>
      </div>
    </section>
  );
}

export default HSection6;
