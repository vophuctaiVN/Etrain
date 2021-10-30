import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sound from "./Sound.jsx";
import { getCookiesValue, isLogin } from "../../utils/helpers";
import getWord from "../../utils/helpers";
import { BiStar } from "react-icons/bi";

function GoogleDictionary(props) {
  const [ggDic, setGgDic] = useState();
  useEffect(() => {
    window
      .GoogleWordsQuery({ word: props.word })
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
                if (element.en.toLowerCase() === props.word.toLowerCase())
                  showStar = true;
              });
            })
            .catch((error) => console.log(error));
        }
        setGgDic({
          item: result.json[0],
          isLoad: true,
          image: `https://source.unsplash.com/featured/?${props.word}`,
          isLogin: x,
          starColor: showStar,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const MemberForgetWord = (saveWord) => {
    window
      .VocabularyByTopicAPIsService_Query({ fatherID: 0 })
      .then(async (wordsList) => {
        let filter = wordsList.json.result.items.filter(
          (word) => word.en.toLowerCase() === props.word.toLowerCase()
        );
        if (filter.length == 0) {
          //call API add new word if it is not include in database
          var data = await getWord(props.word);
          window
            .AddDicWordAPI(
              {
                accountID: getCookiesValue("userID"),
              },
              {
                En: props.word,
                IPA: saveWord.IPA.replaceAll("/", ""),
                Type: saveWord.Type.join(),
                Vn: data.sentences[0].fields.vi,
                Example1: saveWord.Example[0],
                Example2: saveWord.Example[1],
                ImageURL: `https://source.unsplash.com/featured/?${props.word}`,
              }
            )
            .then(
              setGgDic({
                starColor: !ggDic.starColor,
              })
            );
        } else {
          window
            .RememberForgetWordAPI({
              accountID: getCookiesValue("userID"),
              wordID: filter[0].id,
            })
            .then(
              setGgDic({
                starColor: !ggDic.starColor,
              })
            );
        }
      })
      .catch((error) => console.log(error));
  };

  let item = ggDic.item;
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
          <h4 style={{ marginTop: "20px" }}>{mean.partOfSpeech}</h4>
          {mean.definitions.map((defi, defiI) => {
            if (defi.example !== undefined)
              saveWordInfo.Example.push(defi.example);
            return (
              <div key={defiI}>
                <hr />
                <p className="gg-definition">Definition: {defi.definition}</p>
                {defi.example !== undefined ? (
                  <p style={{ padding: "20px" }}>
                    <span className="badge badge-pill badge-warning">
                      Example
                    </span>{" "}
                    {defi.example}
                  </p>
                ) : null}
                {defi.synonyms !== undefined ? (
                  <div className="gg-synonym-border">
                    <h6>synonyms</h6>
                    <p className="relatedWord">
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
                  </div>
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
      <div className="container" style={{ marginTop: "30px" }}>
        {item !== undefined ? (
          <>
            <h1>
              {item.word}{" "}
              {ggDic.isLogin ? (
                <BiStar
                  size={20}
                  color={ggDic.starColor ? "#f9b700" : null}
                  style={{
                    float: "right",
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => MemberForgetWord(saveWordInfo)}
                />
              ) : null}
            </h1>
            {item.phonetics[0].text} <Sound url={item.phonetics[0].audio} />
            {meanings}
            <div>
              <img src={ggDic.image} className="gg-image"></img>
            </div>
          </>
        ) : props.word !== "" && ggDic.isLoad ? (
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
        ) : (
          <div className="row justify-content-center my-5">
            <div className="col-md-7 heading-section text-center">
              <span className="subheading">Sorry</span>
              <h2 className="mb-4">Our Bad</h2>
              <p>We are still searching data!</p>
              <img src="img/icon/searchingData.jpg" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GoogleDictionary;
