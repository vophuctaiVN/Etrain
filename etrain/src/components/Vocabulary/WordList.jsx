import React, { Component } from "react";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import Word from "./Word";
import { Link } from "react-router-dom";
class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      rememberWords: [],
    };
  }

  componentDidMount() {
    if (this.props.location.query && this.props.location.query.topic_Image)
      localStorage.setItem("tempimg", this.props.location.query.topic_Image);
    this.getVocabByTopic(this.props.match.params.lessonid);
  }

  getVocabByTopic = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .VocabularyByTopicAPIsService_Query(queryObj)
      .then((wordsList) =>
        window
          .MyVocabularyQuery({ accountID: getCookiesValue("userID") })
          .then(async (rememberwords) => {
            const x = await isLogin();
            this.setState({
              items: wordsList.json.result.items,
              rememberWords: rememberwords.json.result.items,
              islogin: x,
            });
          })
      )
      .catch((error) => console.log(error));
  };

  componentWillUnmount() {
    localStorage.removeItem("tempimg");
  }

  render() {
    let allItems = [...this.state.items];
    let listvocab;
    if (allItems)
      listvocab = allItems.map((vocab) =>
        this.state.rememberWords.includes(vocab.id) ? (
          <Word
            key={Math.random()}
            vocab={vocab}
            lightStar={true}
            isShow={this.state.islogin}
          />
        ) : (
          <Word
            key={Math.random()}
            vocab={vocab}
            lightStar={false}
            isShow={this.state.islogin}
          />
        )
      );
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5 mb-lg-0">
                <img
                  className="card-img rounded-0 vocab-background-image"
                  src={localStorage.getItem("tempimg")}
                  alt=""
                />

                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">
                      List Vocabulary
                      <li
                        className="nav-item dropdown"
                        style={{ float: "right" }}
                      >
                        <a>Review</a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link to={`/flashcard`} className="dropdown-item">
                            {" "}
                            FlashCard{" "}
                          </Link>
                          <Link to={`/matchingword`} className="dropdown-item">
                            {" "}
                            Matching Game{" "}
                          </Link>
                          <Link to={`/tortoise`} className="dropdown-item">
                            {" "}
                            Tortoise Game{" "}
                          </Link>
                        </div>
                      </li>
                    </h3>
                    {listvocab}
                  </aside>
                  <Link
                    to={{
                      pathname: `/flashcard`,
                      query: {
                        items: this.state.items,
                      },
                    }}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    FlashCard
                  </Link>
                  <Link
                    to={{
                      pathname: `/matchingword`,
                      query: {
                        items: this.state.items,
                      },
                    }}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    Matching Game
                  </Link>

                  <Link
                    to={{
                      pathname: `/tortoise`,
                      query: {
                        items: this.state.items,
                      },
                    }}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    Tortoise Game
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default WordList;
