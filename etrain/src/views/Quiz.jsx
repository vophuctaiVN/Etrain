import React from "react";
import Pagination from "../components/Pagination";
import QuizList from "../components/Quiz/QuizList";
export class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gramList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 7,

      //pagination
      lastpage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getGramList = this.getGramList.bind(this);
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
      .QuizAPIsService_Query(queryObj)
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
      PageSize: 7,
    });
  }

  render() {
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
            <QuizList gramList={this.state.gramList}></QuizList>
          </div>

          <Pagination
            handlePageChange={this.handlePageChange}
            pageinfo={this.state}
          />
          <br />
          <br />
        </div>
      </section>
    );
  }
}

export default QuizPage;
