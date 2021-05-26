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
    this.getVocabByTopic(this.props.match.params.lessonid);
  }

  getVocabByTopic = (fatherID) => {
    const queryObj = {
      fatherID,
    };

    window
      .VocabularyAPIsService_Query({ ID: fatherID })
      .then((topic) => {
        window
          .VocabularyByTopicAPIsService_Query(queryObj)
          .then((wordsList) =>
            window
              .MyVocabularyQuery({ accountID: getCookiesValue("userID") })
              .then(async (rememberwords) => {
                const x = await isLogin();
                this.setState({
                  topics: topic.json.result.items,
                  items: wordsList.json.result.items,
                  rememberWords: rememberwords.json.result.items,
                  islogin: x,
                });
              })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

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
                {this.state.topics ? (
                  <img
                    className="card-img rounded-0 vocab-background-image"
                    src={this.state.topics[0].imageURL}
                    alt=""
                  />
                ) : null}
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
                          <Link
                            to={`/flashcard-${this.props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            FlashCard{" "}
                          </Link>
                          <Link
                            to={`/matchingword-${this.props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            Matching Game{" "}
                          </Link>
                          <Link
                            to={`/tortoise-${this.props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            Tortoise Game{" "}
                          </Link>
                        </div>
                      </li>
                    </h3>
                    {listvocab}
                  </aside>
                  <Link
                    to={`/flashcard-${this.props.match.params.lessonid}`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    FlashCard
                  </Link>
                  <Link
                    to={`/matchingword-${this.props.match.params.lessonid}`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    Matching Game
                  </Link>

                  <Link
                    to={`/tortoise-${this.props.match.params.lessonid}`}
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
