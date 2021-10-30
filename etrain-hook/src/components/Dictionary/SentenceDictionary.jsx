import React, { Component, useEffect, useState } from "react";
import getWord from "../../utils/helpers";
import Video from "./Video";
import Speech from "react-speech";

function SentenceDictionary(props) {
  const [Sentences, setSentences] = useState({
    Sentences: [],
    wordtitle: false,
    youtubeinfo: null,
  });

  useEffect(() => {
    if (props.word) DicSearchClick(props.word);
  }, []);

  const DicSearchClick = async (keyword) => {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    if (data.sentences) {
      const listword = sentences.map((sentence, index) => {
        const english = sentence.fields.en
          .replaceAll("<em>", "")
          .replaceAll("</em>", "");

        return (
          <div className="col-sm-6 col-xl-3 listExample" key={index}>
            <div className="single_feature">
              <div className="single_feature_part">
                <p style={{ color: "#0033cc", fontSize: "18px" }}>
                  {english}
                  <Speech
                    text={english}
                    pitch="1"
                    rate="1"
                    volume="1"
                    lang="en-GB"
                    voice="Google UK English Male"
                  />
                </p>
                <p
                  style={{ color: "#99b3ff" }}
                  dangerouslySetInnerHTML={{ __html: sentence.fields.vi }}
                />
              </div>
            </div>
          </div>
        );
      });

      setSentences({
        Sentences: listword,
        wordtitle: keyword,
        youtubeinfo: data.youtubeinfo,
      });
    }
  };

  const array = Sentences.Sentences;
  return (
    <section className="blog_area " style={{ marginTop: "30px" }}>
      <div className="container">
        {Sentences.youtubeinfo ? (
          <>
            <div className="row justify-content-center">
              <div className="col-xl-7">
                <Video
                  key={Sentences.youtubeinfo.youtube_id}
                  second={Sentences.youtubeinfo.start}
                  videoid={Sentences.youtubeinfo.youtube_id}
                />
                <br />
                <br />
                <br />
              </div>
            </div>
            <div className="row listExample-boder">{array}</div>
          </>
        ) : Sentences.youtubeinfo === null ? (
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
    </section>
  );
}

export default SentenceDictionary;
