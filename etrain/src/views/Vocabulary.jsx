import React, { Component } from "react";
import TopicsList from "../components/Vocabulary/TopicsList";
import Pagination from "../components/Pagination";
import { getRandomProducts, isLogin } from "../utils/helpers";
import { Link } from "react-router-dom";
class Vocabulary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VocabList: [],
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
    this.getVocabList({
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  getVocabList = (object) => {
    const { PageNo, PageSize, Search } = object;
    const queryObj = {
      PageNo,
      PageSize,
      Search,
    };
    window
      .VocabularyAPIsService_Query(queryObj)
      .then(async (result) =>
        this.setState({
          VocabList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
          //pagination
          lastpage: Math.ceil(result.json.result.totalRows / PageSize),
          login: await isLogin(),
        })
      )
      .catch((error) => console.log(error));
  };

  handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        this.getVocabList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo + 1,
          PageSize: this.state.pageSize,
        });
        break;
      case "pre":
        this.getVocabList({
          Search: document.getElementById("searchField").value,
          PageNo: pageNo - 1,
          PageSize: this.state.pageSize,
        });
        break;
      case "number":
        this.getVocabList({
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
    this.getVocabList({
      Search: document.getElementById("searchField").value,
      PageNo: 1,
      PageSize: this.state.pageSize,
    });
  }

  render() {
    let rand_items;
    if (this.state.VocabList.length >= 6)
      rand_items = getRandomProducts(this.state.VocabList);
    else rand_items = this.state.VocabList;

    let suggest = rand_items.map((vocab, key) => (
      <div className="media post_item" key={key}>
        <img
          className="suggested_vocab_topic"
          src={vocab.imageURL}
          alt="post"
        />
        <div className="media-body">
          <Link to={`/vocabulary-${vocab.id}`}>
            {" "}
            <h3>{vocab.title}</h3>{" "}
          </Link>
          <p>{vocab.level}</p>
        </div>
      </div>
    ));
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                <div className="blog_left_sidebar">
                  <TopicsList VocabList={this.state.VocabList} />
                  <Pagination
                    handlePageChange={this.handlePageChange}
                    pageinfo={this.state}
                  />
                </div>
              </div>
              <div className="col-lg-4">
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
                  <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Category</h4>
                    <ul className="list cat-list">
                      <li>
                        <Link to={`/vocabulary`} className="d-flex">
                          <p>Vocabulary by Topic</p>
                          <p style={{ marginLeft: "5px" }}>
                            ({this.state.totalitems})
                          </p>
                        </Link>
                      </li>
                      {this.state.login ? (
                        <li>
                          <Link to={`/mywords`} className="d-flex">
                            My Words
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </aside>
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">Posts List</h3>
                    {suggest}
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Vocabulary;
