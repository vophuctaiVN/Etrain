import React, { Component } from "react";
import Word from "./Word";
import { Link } from "react-router-dom";
class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalitems: 0,
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
      .then((result) =>
        this.setState({
          items: result.json.result.items,
          totalitems: result.json.result.totalRows,
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
      listvocab = allItems.map((vocab) => (
        <Word key={Math.random()} vocab={vocab} />
      ));
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5 mb-lg-0">
                <img
                  className="card-img rounded-0"
                  src={localStorage.getItem("tempimg")}
                  alt=""
                />

                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">List Vocabulary</h3>
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

export default WordList;
