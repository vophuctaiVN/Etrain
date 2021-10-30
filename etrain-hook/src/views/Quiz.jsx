import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import QuizList from "../components/Quiz/QuizList";

export function QuizPage() {
  const [quizPage, setQuizPage] = useState({
    gramList: [],
    totalitems: 0,
    pageNo: 1,
    pageSize: 7,

    //pagination
    lastpage: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getGramList({
      PageNo: quizPage.pageNo,
      PageSize: quizPage.pageSize,
    });
  }, []);

  const getGramList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search,
    };
    window
      .QuizAPIsService_Query(queryObj)
      .then((result) =>
        setQuizPage({
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

  const handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo + 1,
          PageSize: quizPage.pageSize,
        });
        break;
      case "pre":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo - 1,
          PageSize: quizPage.pageSize,
        });
        break;
      case "number":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo,
          PageSize: quizPage.pageSize,
        });
        break;
      default:
        break;
    }
  };

  const SearchTopic = () => {
    getGramList({
      Search: document.getElementById("searchField").value,
      PageNo: 1,
      PageSize: 7,
    });
  };

  return (
    <section className="feature_part" style={{ marginTop: 100 }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xl-3 align-self-center">
            <div className="single_feature_text ">
              <h2>
                Awesome <br /> Quizs
              </h2>
              <p>
                Chose one topic you like and check how fluently you are in
                English skils.
              </p>
            </div>
            <div className="blog_right_sidebar">
              <aside className="single_sidebar_widget search_widget">
                <form action="#">
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <input
                        id="searchField"
                        type="text"
                        className="form-control"
                        placeholder="Search Keyword"
                        onChange={SearchTopic}
                      />
                      <div className="input-group-append">
                        <button className="btn" type="button">
                          <i className="ti-search" onClick={SearchTopic} />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </aside>
            </div>
          </div>
          <QuizList gramList={quizPage.gramList}></QuizList>
        </div>

        <Pagination handlePageChange={handlePageChange} pageinfo={quizPage} />
        <br />
        <br />
      </div>
    </section>
  );
}

export default QuizPage;
