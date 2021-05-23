import React from "react";
import Speech from "react-speech";
import { Link } from "react-router-dom";

class FrontCard extends React.Component {
  render() {
    let item = this.props.item;
    var divStyle = {
      height: "400px",
      width: "400px",
    };
    var synonyms = require("synonyms");
    const related = synonyms(item.en, "n");
    let lisRelated;
    if (related !== undefined) {
      lisRelated = related.map((word, index) => (
        <Link
          to={`/dictionary-${word}`}
          style={{ marginRight: "30px" }}
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
            <p>{item.en}</p>
          </a>
        </div>
        <div className="blog_details fullWidth">
          <h2>
            /{item.ipa}/
            <Speech
              text={item.en}
              pitch="1"
              rate="1"
              volume="1"
              lang="en-GB"
              voice="Google UK English Male"
            />
          </h2>
          <h3>{item.type}</h3>
          <p>
            {item.example1}{" "}
            <Speech
              text={item.example1}
              pitch="1"
              rate="1"
              volume="1"
              lang="en-GB"
              voice="Google UK English Male"
            />
          </p>
          <p>
            {item.example2}{" "}
            <Speech
              text={item.example2}
              pitch="1"
              rate="1"
              volume="1"
              lang="en-GB"
              voice="Google UK English Male"
            />
          </p>
          {related !== undefined ? (
            <>
              <h3>Related Word</h3>
              {lisRelated}
            </>
          ) : null}
        </div>
      </article>
    );
  }
}

export default FrontCard;
