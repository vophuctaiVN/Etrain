import React, { Component } from "react";
import { getCookiesValue } from "../../utils/helpers";
import Word from "./Word";
import { Link } from "react-router-dom";
class MyWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      rememberWords: [],
    };
  }

  componentDidMount() {
    this.getMyVocab();
  }

  getMyVocab = () => {
    window
      .MyVocabularyQuery({
        accountID: getCookiesValue("userID"),
        showDetail: true,
      })
      .then((rememberwords) =>
        this.setState({
          items: rememberwords.json.result.items,
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.state);
    let allItems = [...this.state.items];
    let listvocab;
    if (allItems)
      listvocab = allItems.map((vocab) => (
        <Word key={Math.random()} vocab={vocab} lightStar={false} />
      ));
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5 mb-lg-0">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">
                      My Vocabulary ({this.state.items.length} words)
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

export default MyWords;
