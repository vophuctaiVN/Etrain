import React from "react";
import SpeakerSound from "../Sound";

class FrontCard extends React.Component {
  render() {
    let item = this.props.item;
    var divStyle = {
      height: "400px",
      width: "400px",
    };
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
          <h2>/{item.ipa}/</h2>
          <h3>
            <SpeakerSound url={item.soundURL} />
          </h3>
          <p>{item.example1}</p>
        </div>
      </article>
    );
  }
}

export default FrontCard;
