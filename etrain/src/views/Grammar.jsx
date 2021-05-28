import React, { Component } from "react";
import GramList from "../components/Grammar/GramList";
import Pagination from "../components/Pagination";
class Grammar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gramList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 6,

      //pagination
      lastpage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.SearchTopic = this.SearchTopic.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getGramList({
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  getGramList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search,
    };
    window
      .GrammarAPIsService_Query(queryObj)
      .then((result) =>
        this.setState({
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

  handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        this.getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo + 1,
          PageSize: this.state.pageSize,
        });
        break;
      case "pre":
        this.getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo - 1,
          PageSize: this.state.pageSize,
        });
        break;
      case "number":
        this.getGramList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo,
          PageSize: this.state.pageSize,
        });
        break;
      default:
        break;
    }
  };

  SearchTopic() {
    this.getGramList({
      Search: document.getElementById("searchField").value,
      PageNo: 1,
      PageSize: this.state.pageSize,
    });
  }

  render() {
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
                              onChange={this.SearchTopic}
                            />
                            <div className="input-group-append">
                              <button className="btn" type="button">
                                <i
                                  className="ti-search"
                                  onClick={this.SearchTopic}
                                />
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

            <GramList gramList={this.state.gramList} />
            <Pagination
              handlePageChange={this.handlePageChange}
              pageinfo={this.state}
            />
            <br />
            <br />
          </div>
        </section>
      </>
    );
  }
}

export default Grammar;
