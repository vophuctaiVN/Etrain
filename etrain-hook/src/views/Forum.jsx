import React, { useState, useEffect } from "react";
import { AskQuestion } from "../components/ForumQ/AskQuestion";
import { QuestionElement } from "../components/ForumQ/Question-Element";
import Pagination from "../components/Pagination";

function Forum() {
  const [forum, setForum] = useState({
    isOpen: false,

    questionList: [],
    totalitems: 0,
    pageNo: 1,
    pageSize: 6,

    //pagination
    lastpage: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getQuestionList({
      PageNo: forum.pageNo,
      PageSize: forum.pageSize,
    });
  }, []);

  const getQuestionList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search,
    };
    window
      .ForumQuestionList_Query(queryObj)
      .then((result) =>
        setForum({
          questionList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
          //pagination
          lastpage: Math.ceil(result.json.result.totalRows / PageSize),
        })
      )
      .catch((error) => console.log(error));
  };

  const SearchQuestion = () => {
    getQuestionList({
      Search: document.getElementById("searchField").value,
      PageNo: 1,
      PageSize: forum.pageSize,
    });
  };

  const handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        getQuestionList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo + 1,
          PageSize: forum.pageSize,
        });
        break;
      case "pre":
        getQuestionList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo - 1,
          PageSize: forum.pageSize,
        });
        break;
      case "number":
        getQuestionList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo,
          PageSize: forum.pageSize,
        });
        break;
      default:
        break;
    }
  };

  let addModalClose = () => setForum({ ...forum, isOpen: false });
  let lisquestions = forum.questionList.map((element) => (
    <QuestionElement
      profile={element.profile}
      question={element.question}
      key={Math.random()}
    />
  ));

  return (
    <section className="special_cource padding_top">
      <div className="container">
        <div className="column-text closed">
          <div className="header">
            <div className="minigrid">
              <h1>All Questions</h1>
              <div className="link">
                <a
                  className="linkbutton"
                  href="avascript:void(0)"
                  onClick={() => setForum({ ...forum, isOpen: true })}
                >
                  Ask Question
                </a>
              </div>
            </div>
            <div className="minigrid subtitle">
              <div className="count">{forum.totalitems} questions</div>
              <div className="sort"></div>
            </div>
            <div className="blog_right_sidebar" style={{ marginTop: 20 }}>
              <aside className="single_sidebar_widget search_widget">
                <div className="input-group mb-3">
                  <input
                    id="searchField"
                    type="text"
                    className="form-control"
                    placeholder="Search Keyword"
                    onChange={SearchQuestion}
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <i className="ti-search" onClick={SearchQuestion} />
                    </button>
                  </div>
                </div>
              </aside>{" "}
            </div>
          </div>
          <div className="content">
            {lisquestions}

            <div className="element">
              <div className="minigrid footer">
                <Pagination
                  handlePageChange={handlePageChange}
                  pageinfo={forum}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AskQuestion isOpen={forum.isOpen} onHide={addModalClose} />
    </section>
  );
}

export default Forum;
