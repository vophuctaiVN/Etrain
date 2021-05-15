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
      .MyVocabularyQuery({ accountID: getCookiesValue("userID") })
      .then((rememberwords) =>
        this.setState({
          items: rememberwords.json.result.items,
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
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
                    <h3 className="widget_title">My Vocabulary</h3>
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
                    style={{ float: "right" }}
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
                    style={{ float: "right" }}
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
                    style={{ float: "right" }}
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
