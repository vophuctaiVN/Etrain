import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sound from "./Sound.jsx";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import getWord from "../../utils/helpers";
import { BiStar } from "react-icons/bi";

class GoogleDictionary extends Component {
  state = {};
  componentDidMount() {
    window
      .GoogleWordsQuery({ word: this.props.word })
      .then(async (result) => {
        const x = await isLogin();
        let showStar = false;
        if (x) {
          await window
            .MyVocabularyQuery({
              accountID: getCookiesValue("userID"),
              showDetail: true,
            })
            .then((rememberwords) => {
              rememberwords.json.result.items.forEach((element) => {
                if (element.en.toLowerCase() === this.props.word.toLowerCase())
                  showStar = true;
              });
            })
            .catch((error) => console.log(error));
        }
        this.setState({
          item: result.json[0],
          isLoad: true,
          image: `https://source.unsplash.com/featured/?${this.props.word}`,
          isLogin: x,
          starColor: showStar,
        });
      })
      .catch((error) => console.log(error));
  }

  MemberForgetWord(saveWord) {
    window
      .VocabularyByTopicAPIsService_Query({ fatherID: 0 })
      .then(async (wordsList) => {
        let filter = wordsList.json.result.items.filter(
          (word) => word.en.toLowerCase() === this.props.word.toLowerCase()
        );
        if (filter.length == 0) {
          //call API add new word if it is not include in database
          var data = await getWord(this.props.word);
          window
            .AddDicWordAPI(
              {
                accountID: getCookiesValue("userID"),
              },
              {
                En: this.props.word,
                IPA: saveWord.IPA.replaceAll("/", ""),
                Type: saveWord.Type.join(),
                Vn: data.sentences[0].fields.vi,
                Example1: saveWord.Example[0],
                Example2: saveWord.Example[1],
                ImageURL: `https://source.unsplash.com/featured/?${this.props.word}`,
              }
            )
            .then(
              this.setState({
                starColor: !this.state.starColor,
              })
            );
        } else {
          window
            .RememberForgetWordAPI({
              accountID: getCookiesValue("userID"),
              wordID: filter[0].id,
            })
            .then(
              this.setState({
                starColor: !this.state.starColor,
              })
            );
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    let item = this.state.item;
    let meanings;

    let saveWordInfo;
    if (item !== undefined) {
      saveWordInfo = {
        IPA: item.phonetics[0].text,
        Type: [],
        Vn: null,
        Example: [],
      };
    }

    if (item !== undefined) {
      meanings = item.meanings.map((mean, meanI) => {
        saveWordInfo.Type.push(mean.partOfSpeech);
        return (
          <div key={meanI}>
            <h4>{mean.partOfSpeech}</h4>
            {mean.definitions.map((defi, defiI) => {
              if (defi.example !== undefined)
                saveWordInfo.Example.push(defi.example);
              return (
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
              );
            })}
          </div>
        );
      });
    }

    return (
      <>
        <div className="container">
          {item !== undefined ? (
            <>
              <h1>
                {item.word}{" "}
                {this.state.isLogin ? (
                  <BiStar
                    size={20}
                    color={this.state.starColor ? "#f9b700" : null}
                    style={{
                      float: "right",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.MemberForgetWord(saveWordInfo)}
                  />
                ) : null}
              </h1>
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
