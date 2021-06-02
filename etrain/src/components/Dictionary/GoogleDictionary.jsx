import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sound from "./Sound.jsx";

class GoogleDictionary extends Component {
  state = {};
  componentDidMount() {
    window
      .GoogleWordsQuery({ word: this.props.word })
      .then((result) => {
        this.setState({
          item: result.json[0],
          isLoad: true,
          image: `https://source.unsplash.com/featured/?${this.props.word}`,
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    let item = this.state.item;
    let meanings;
    if (item !== undefined) {
      meanings = item.meanings.map((mean, meanI) => (
        <div key={meanI}>
          <h4>{mean.partOfSpeech}</h4>
          {mean.definitions.map((defi, defiI) => (
            <div key={defiI}>
              <p>definition: {defi.definition}</p>
              {defi.example !== undefined ? (
                <p>example: {defi.example}</p>
              ) : null}
              {defi.synonyms !== undefined ? (
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
              ) : null}
            </div>
          ))}
        </div>
      ));
    }

    return (
      <>
        <div className="container">
          {item !== undefined ? (
            <>
              <h1>{item.word}</h1>
              {item.phonetics[0].text} <Sound url={item.phonetics[0].audio} />
              {meanings}
            </>
          ) : this.props.word !== "" && this.state.isLoad ? (
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
          ) : null}
        </div>
        <img src={this.state.image}></img>
      </>
    );
  }
}

export default GoogleDictionary;
