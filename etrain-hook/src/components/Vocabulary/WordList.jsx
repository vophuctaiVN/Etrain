import React, { useEffect, useState } from "react";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import Word from "./Word";
import { Link } from "react-router-dom";

function WordList(props) {
  const [wordList, setWordList] = useState({
    items: [],
    rememberWords: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getVocabByTopic(props.match.params.lessonid);
  }, []);

  const getVocabByTopic = (fatherID) => {
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
                setWordList({
                  ...wordList,
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

  let allItems = [...wordList.items];
  let listvocab;
  if (allItems)
    listvocab = allItems.map((vocab) =>
      wordList.rememberWords.includes(vocab.id) ? (
        <Word
          key={Math.random()}
          vocab={vocab}
          lightStar={true}
          isShow={wordList.islogin}
        />
      ) : (
        <Word
          key={Math.random()}
          vocab={vocab}
          lightStar={false}
          isShow={wordList.islogin}
        />
      )
    );

  return (
    <>
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5 mb-lg-0">
              {wordList.topics ? (
                <img
                  className="card-img rounded-0 vocab-background-image"
                  src={wordList.topics[0].imageURL}
                  alt=""
                />
              ) : null}
              <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget popular_post_widget">
                  <h3 className="widget_title">
                    List Vocabulary
                    {wordList.islogin ? (
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
                            to={`/flashcard-${props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            FlashCard{" "}
                          </Link>
                          <Link
                            to={`/matchingword-${props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            Matching Game{" "}
                          </Link>
                          <Link
                            to={`/tortoise-${props.match.params.lessonid}`}
                            className="dropdown-item"
                          >
                            {" "}
                            Tortoise Game{" "}
                          </Link>
                        </div>
                      </li>
                    ) : null}
                  </h3>
                  {listvocab}
                </aside>
                {wordList.islogin ? (
                  <>
                    <Link
                      to={`/flashcard-${props.match.params.lessonid}`}
                      className="genric-btn success-border circle"
                      style={{ float: "right", marginLeft: "10px" }}
                    >
                      FlashCard
                    </Link>
                    <Link
                      to={`/matchingword-${props.match.params.lessonid}`}
                      className="genric-btn success-border circle"
                      style={{ float: "right", marginLeft: "10px" }}
                    >
                      Matching Game
                    </Link>

                    <Link
                      to={`/tortoise-${props.match.params.lessonid}`}
                      className="genric-btn success-border circle"
                      style={{ float: "right", marginLeft: "10px" }}
                    >
                      Tortoise Game
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WordList;
