import React, { Component } from "react";
import getWord from "../utils/helpers.js";
import Video from "../components/Dictionary/Video";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

class Dictionary extends Component {
  state = { Sentences: [], wordtitle: false, youtubeinfo: null };
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params.word)
      this.DicSearchClick(this.props.match.params.word);
  }

  async DicSearchClick(keyword) {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    if (data.sentences) {
      const listword = sentences.map((sentence, index) => (
        <div className="col-sm-6 col-xl-3">
          <div className="single_feature">
            <div className="single_feature_part">
              <div key={index}>
                <p
                  style={{ color: "#0033cc", fontSize: "18px" }}
                  dangerouslySetInnerHTML={{ __html: sentence.fields.en }}
                />
                <p
                  style={{ color: "#99b3ff" }}
                  dangerouslySetInnerHTML={{ __html: sentence.fields.vi }}
                />
                <hr />
              </div>
            </div>
          </div>
        </div>
      ));
      this.setState({
        Sentences: listword,
        wordtitle: keyword,
        youtubeinfo: data.youtubeinfo,
      });
    }
  }

  handleSearch(e) {
    e.preventDefault();
    let wordInput = document.getElementById("SearchInput").value;
    this.DicSearchClick(wordInput);
  }

  handleChange(e) {
    e.preventDefault();
    let wordInput = document.getElementById("SearchInput").value;
    if (wordInput === "") {
      this.setState({ Sentences: [], wordtitle: false, youtubeinfo: null });
    }
  }

  render() {
    const array = this.state.Sentences;
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-5">
                  <div className="section_tittle text-center">
                    <div className="blog_right_sidebar">
                      <aside className="single_sidebar_widget search_widget">
                        <form action="#">
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <input
                                id="SearchInput"
                                type="text"
                                className="form-control"
                                placeholder={
                                  this.props.match.params.word ||
                                  "Search Keyword"
                                }
                                onChange={this.handleChange}
                              />
                              <div className="input-group-append">
                                <button className="btn" type="button">
                                  <i className="ti-search" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            className="button rounded-0 primary-bg text-white w-100 btn_1"
                            type="submit"
                            onClick={this.handleSearch}
                          >
                            Search
                          </button>
                        </form>
                      </aside>{" "}
                    </div>
                    <h2> </h2>
                  </div>
                </div>
              </div>
              {this.state.youtubeinfo ? (
                <>
                  <div className="row justify-content-center">
                    <div className="col-xl-7">
                      <h1>{this.state.wordtitle}</h1>
                      <Video
                        key={this.state.youtubeinfo.youtube_id}
                        second={this.state.youtubeinfo.start}
                        videoid={this.state.youtubeinfo.youtube_id}
                      />
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className="row">{array}</div>{" "}
                </>
              ) : this.state.wordtitle ? (
                <div className="container">
                  <div className="row justify-content-center my-5">
                    <div className="col-md-7 heading-section text-center">
                      <span className="subheading">Sorry</span>
                      <h2 className="mb-4">Our Bad</h2>
                      <p>
                        Sorry that we don't have any result about this word. You
                        can check your spelling again!
                      </p>
                      <img src="img/icon/not_find.png" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Dictionary;
