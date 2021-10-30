import React, { useEffect, useState } from "react";
import { getCookiesValue } from "../../utils/helpers";
import Word from "./Word";
import { Link } from "react-router-dom";

function MyWords() {
  const [myWords, setMyWords] = useState({
    items: [],
    rememberWords: [],
    numberOfWords: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getMyVocab();
  }, []);

  const getMyVocab = () => {
    window
      .MyVocabularyQuery({
        accountID: getCookiesValue("userID"),
        showDetail: true,
      })
      .then((rememberwords) =>
        setMyWords({
          ...myWords,
          items: rememberwords.json.result.items,
          numberOfWords: rememberwords.json.result.items.length,
        })
      )
      .catch((error) => console.log(error));
  };

  const updateNumberOfWords = (forgetID) => {
    let cloneWords = [...myWords.items];
    cloneWords = cloneWords.filter((item) => item.id !== forgetID);
    setMyWords({
      ...myWords,
      numberOfWords: myWords.numberOfWords - 1,
      items: cloneWords,
    });
  };

  let allItems = [...myWords.items];
  let listvocab;
  if (allItems)
    listvocab = allItems.map((vocab) => (
      <Word
        key={Math.random()}
        vocab={vocab}
        lightStar={false}
        crossIcon={true}
        updateNumberOfWords={updateNumberOfWords}
      />
    ));

  return (
    <>
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5 mb-lg-0">
              {myWords.numberOfWords !== 0 ? (
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">
                      My Vocabulary ({myWords.numberOfWords} words)
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
                            to={`/flashcard-mine`}
                            className="dropdown-item"
                          >
                            {" "}
                            FlashCard{" "}
                          </Link>
                          <Link
                            to={`/matchingword-mine`}
                            className="dropdown-item"
                          >
                            {" "}
                            Matching Game{" "}
                          </Link>
                          <Link to={`/tortoise-mine`} className="dropdown-item">
                            {" "}
                            Tortoise Game{" "}
                          </Link>
                        </div>
                      </li>
                    </h3>
                    {listvocab}
                  </aside>
                  <Link
                    to={`/flashcard-mine`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    FlashCard
                  </Link>
                  <Link
                    to={`/matchingword-mine`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    Matching Game
                  </Link>

                  <Link
                    to={`/tortoise-mine`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginLeft: "10px" }}
                  >
                    Tortoise Game
                  </Link>
                </div>
              ) : (
                <div className="row justify-content-center my-5">
                  <div className="col-md-7 heading-section text-center">
                    <span className="subheading">EMPTY</span>
                    <h2 className="mb-4">WORD LIST</h2>
                    <img src="img/icon/searchingData.jpg" />
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyWords;
