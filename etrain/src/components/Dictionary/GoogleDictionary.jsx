import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sound from "./Sound.jsx";

class GoogleDictionary extends Component {
  state = {
    item: { meanings: [] },
  };
  componentDidMount() {
    window
      .GoogleWordsQuery({ word: this.props.word })
      .then((result) => {
        this.setState({
          item: result.json[0],
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    let item = this.state.item;

    console.log(item);
    const meanings = item.meanings.map((mean) => (
      <>
        <h4>{mean.partOfSpeech}</h4>
        {mean.definitions.map((defi) => (
          <>
            <p>definition: {defi.definition}</p>
            <p>example: {defi.example}</p>
            <p>
              synonyms:{" "}
              {defi.synonyms.map((syno, synoI) => (
                <Link
                  to={`/dictionary-${syno}`}
                  key={synoI}
                  style={{ marginRight: "30px", display: "inline" }}
                >
                  {syno}
                </Link>
              ))}
            </p>
          </>
        ))}
      </>
    ));

    return (
      <>
        <div className="container">
          {item.word ? (
            <>
              <h1>{item.word}</h1>
              {item.phonetics[0].text} <Sound url={item.phonetics[0].audio} />
              {meanings}
            </>
          ) : this.state.wordtitle ? (
            <div className="container">
              <div className="row justify-content-center my-5">
                <div className="col-md-7 heading-section text-center">
                  <span className="subheading">Sorry</span>
                  <h2 className="mb-4">Our Bad</h2>
                  <p>
                    Sorry that we don't have any result about this word. You can
                    check your spelling again!
                  </p>
                  <img src="img/icon/not_find.png" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default GoogleDictionary;
