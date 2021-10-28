import React, { useState, useEffect } from "react";
import GramList from "../components/Grammar/GramList";
import Pagination from "../components/Pagination";

function Grammar() {
  const [allValues, setAllValues] = useState({
    gramList: [],
    totalitems: 0,
    pageNo: 1,
    pageSize: 6,

    //pagination
    lastpage: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getGramList({
      PageNo: allValues.pageNo,
      PageSize: allValues.pageSize,
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
      .GrammarAPIsService_Query(queryObj)
      .then((result) => {
        setAllValues({
          gramList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
          //pagination
          lastpage: Math.ceil(result.json.result.totalRows / PageSize),
        });
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo + 1,
          PageSize: allValues.pageSize,
        });
        break;
      case "pre":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo - 1,
          PageSize: allValues.pageSize,
        });
        break;
      case "number":
        getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo,
          PageSize: allValues.pageSize,
        });
        break;
      default:
        break;
    }
  };

  const SearchTopic = () => {
    this.getGramList({
      Search: document.getElementById("searchField").value,
      PageNo: 1,
      PageSize: this.allValues.pageSize,
    });
  };

  return (
    <>
      <section className="special_cource padding_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="section_tittle text-center">
                <p>popular courses</p>
                <h2>Special Courses</h2>
                <div
                  className="blog_right_sidebar"
                  style={{ marginTop: "10px" }}
                >
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
            </div>
          </div>

          <GramList gramList={allValues.gramList} />
          <Pagination
            handlePageChange={handlePageChange}
            pageinfo={allValues}
          />
          <br />
          <br />
        </div>
      </section>
    </>
  );
}

export default Grammar;
