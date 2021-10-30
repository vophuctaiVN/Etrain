import React, { useEffect, useState } from "react";
import Speech from "react-speech";
import getWord from "../../../utils/helpers";
import { Link } from "react-router-dom";

function BackCard(props) {
  const [backCard, setBackCard] = useState({
    Sentences: [],
    wordtitle: false,
    youtubeinfo: null,
  });

  useEffect(() => DicSearchClick(props.item.en), []);

  const DicSearchClick = async (keyword) => {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    let examples = chose5examples(sentences);
    const listword = examples.map((sentence, index) => {
      return (
        <p key={index}>
          {sentence}{" "}
          <Speech
            text={sentence}
            pitch="1"
            rate="1"
            volume="1"
            lang="en-GB"
            voice="Google UK English Male"
          />
        </p>
      );
    });

    setBackCard({ ...backCard, Sentences: listword });
  };

  const chose5examples = (sentences) => {
    var i;
    let newArray = [];
    for (i = 3; i > 0 && newArray.length === 0; i--) {
      newArray = [];
      sentences.forEach((sentence) => {
        const english = sentence.fields.en
          .replaceAll("<em>", "")
          .replaceAll("</em>", "");
        if (english.match(/\w+/g).length > i) newArray.push(english);
      });
    }
    return newArray.slice(0, 3);
  };

  let item = props.item;
  var divStyle = {
    height: "400px",
    width: "400px",
  };
  const array = backCard.Sentences;

  var synonyms = require("synonyms");
  const array1 = synonyms(item.en, "n") || [];
  const array2 = synonyms(item.en, "v") || [];
  let related = [...array1, ...array2];
  related = related.filter(function (word, pos) {
    return (
      word !== item.en.toLowerCase() &&
      word !== "v" &&
      word !== "n" &&
      related.indexOf(word) === pos
    );
  });
  let lisRelated;
  if (related !== undefined) {
    lisRelated = related.map((word, index) => (
      <Link
        to={`/dictionary-${word}`}
        style={{ marginRight: "30px", display: "inline" }}
        key={index}
      >
        {word}
      </Link>
    ));
  }

  return (
    <article className="blog_item flashcard">
      <div className="blog_item_img">
        <img
          className="card-img rounded-0"
          src={item.imageURL}
          alt=""
          style={divStyle}
        />
        <a className="blog_item_date" href="# ">
          <p>{item.vn}</p>
        </a>
      </div>
      <div className="blog_details fullWidth">
        {array}
        {related.length > 0 ? (
          <>
            <h3>Related Word</h3>
            <div className="relatedWord">{lisRelated}</div>
          </>
        ) : null}
      </div>
    </article>
  );
}

export default BackCard;
