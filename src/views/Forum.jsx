import React, { Component } from "react";
import { AskQuestion } from "../components/ForumQ/AskQuestion";
import { QuestionElement } from "../components/ForumQ/Question-Element";
import Pagination from "../components/Pagination";
class Forum extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  } */

  constructor(props) {
    super(props);
    this.state = {      
      isOpen: false,

      questionList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 6,

      //pagination
      lastpage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.SearchQuestion = this.SearchQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestionList({
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  getQuestionList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search
    };
    window
      .ForumQuestionList_Query(queryObj)
      .then((result) =>
        this.setState({
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

  SearchQuestion() {
    this.getQuestionList({
      Search: document.getElementById("searchField").value,
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        this.getGramList({ PageNo: pageNo + 1, PageSize: this.state.pageSize });
        break;
      case "pre":
        this.getGramList({ PageNo: pageNo - 1, PageSize: this.state.pageSize });
        break;
      case "number":
        this.getGramList({ PageNo: pageNo, PageSize: this.state.pageSize });
        break;
      default:
        break;
    }
  };
  render() { 
    let addModalClose = () => this.setState({ isOpen: false });
    let lisquestions = this.state.questionList.map(element => 
      <QuestionElement 
      profile = {element.profile}
      question = {element.question}

      key={Math.random()}/>
      )

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
                    onClick={() => this.setState({ isOpen: true })}
                  >
                    Ask Question
                  </a>
                </div>
              </div>
              <div className="minigrid subtitle">
                <div className="count">{this.state.totalitems} questions</div>
                <div className="sort">
                  {/*   <a
                    aria-current="page"
                    className="active"
                    href="/view/discussions?sort=newest"
                  >
                    Newest
                  </a>
                  <a
                    aria-current="page"
                    className="selected active"
                    href="/view/discussions?sort=active"
                  >
                    Active
                  </a> */}
                </div>
              </div>
              <div className="blog_right_sidebar" style={{ marginTop: 20 }}>
                <aside className="single_sidebar_widget search_widget">
                  <div className="input-group mb-3">
                    <input
                      id="searchField"
                      type="text"
                      className="form-control"
                      placeholder="Search Keyword"
                    />
                    <div className="input-group-append">
                      <button className="btn" type="button">
                        <i className="ti-search" 
          onClick={this.SearchQuestion}/>
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
              handlePageChange={this.handlePageChange}
              pageinfo={this.state}
            />
                  {/* <div className="page">
                    <span className="selected">1</span>
                    <a
                      aria-current="page"
                      className="active"
                      title="go to page 2"
                      href="/view/discussions?sort=active&page=2"
                    >
                      2
                    </a>
                    <a
                      aria-current="page"
                      className="active"
                      title="go to page 3"
                      href="/view/discussions?sort=active&page=3"
                    >
                      3
                    </a>
                    <a
                      aria-current="page"
                      className="active"
                      title="go to page 2"
                      href="/view/discussions?sort=active&page=2"
                    >
                      next
                    </a>
                  </div>
                  <div className="page">
                    <a
                      aria-current="page"
                      className="active"
                      title="show 15 items per page"
                      href="/view/discussions?pagesize=15"
                    >
                      15
                    </a>
                    <a
                      aria-current="page"
                      className="active"
                      title="show 30 items per page"
                      href="/view/discussions?pagesize=30"
                    >
                      30
                    </a>
                    <a
                      aria-current="page"
                      className="selected active"
                      title="show 50 items per page"
                      href="/view/discussions?pagesize=50"
                    >
                      50
                    </a>
                    <span className="dots">per page</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AskQuestion isOpen={this.state.isOpen} onHide={addModalClose} />
      </section>
    );
  }
}

export default Forum;
